import { Bot, InlineKeyboard, NextFunction } from "grammy";
import moment from "moment";
import { MyContext } from "../../..";
import AgencyService from "../agency";
import * as apiService from "../../../api"
import AccountChargeService from "./charge";
import AccountConnectService from "./connect";
import AccountCreateService from "./create";
import AccountLogoutService from "./logout";
import AccountPurchaseService from "./purchase";
import AccountSubscriptionService from "./subscription";
import { backKeyboards } from "../../../utils/backKeyboards";
import AccountReferralService from "./referral";


class AccountService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        new AccountConnectService(this.bot).run()
        new AccountCreateService(this.bot).run()

        this.bot.callbackQuery(/^account(.*)$/, this.checkAccount)
        this.bot.callbackQuery(["account", /^account:agency:users:detail:([0-9]+)$/], this.response)
        this.bot.hears(/^ShowAccount:([0-9]+)$/, this.response)


        new AccountLogoutService(this.bot).run()
        new AccountPurchaseService(this.bot).run()
        new AccountSubscriptionService(this.bot).run()
        new AccountChargeService(this.bot).run()
        new AccountReferralService(this.bot).run()
        new AgencyService(this.bot).run()
    }


    private text = async (ctx: MyContext) => {

        let a = ctx.session.account
        let isSelf = true
        if (Array.isArray(ctx.match) && (/^account:agency:users:detail:([0-9]+)$/.test(ctx.match[0]) || /^ShowAccount:([0-9]+)$/.test(ctx.match[0]))) {
            // get user
            if (/^ShowAccount:([0-9]+)$/.test(ctx.match[0])) {
                await ctx.deleteMessage()
            }
            isSelf = false
            try {
                const response = await apiService.GET()("account?user=" + ctx.session.account.id + "&account=" + ctx.match[1])
                a = {
                    remaining_days: moment(response.data.account.class_expire).diff(moment(), "days"),
                    ...response.data.account
                }
            } catch (error) {
                return "ErrorGettingData"
            }
        } else if (!a && !ctx.session.user?.account_id) {
            isSelf = true
            return "ErrorGettingData"
        }
        else if (!a) {
            isSelf = true
            try {
                const response = await apiService.GET()("account?user=" + ctx.session.user!.account_id)
                a = {
                    remaining_days: moment(response.data.account.class_expire).diff(moment(), "days"),
                    ...response.data.account
                }
            } catch (error) {
                return "ErrorGettingData"
            }
        }



        return `${isSelf ? "" : "🔻 <b>اطلاعات کاربر:</b>\n\n"}👤 <b>${a.user_name}</b>
📧 <pre>${a.email}</pre>
🧩 ${a.node_group}
⭐️ ${a.class}

⌛️ Expire: ${a.class_expire} (${a.remaining_days} Day)
📤 Traffic: ${a.used_traffic} / ${a.total_traffic_gb > 5000 ? "Unlimited" : a.total_traffic}
🖥 Device: ${(a.node_connector > 0 ? "~" + " / " + a.node_connector : "Unlimited")}
💰 Wallet: ${a.money}$

<b>🧲 Invitation:</b> <pre>${a.referral_code ?? "-"}</pre>
`


    }



    private keyboard = async (ctx: MyContext) => {
        const keyboard = new InlineKeyboard()



        if (Array.isArray(ctx.match) && (/^account:agency:users:detail:([0-9]+)$/.test(ctx.match[0]) || /^ShowAccount:([0-9]+)$/.test(ctx.match[0]))) {
            keyboard.text("🎲 اطلاعات اشتراک", `account:agency:users:detail:${ctx.match[1]}:subscription`)
            keyboard.text("⚡️ خرید اشتراک", `account:agency:users:detail:${ctx.match[1]}:purchase`)
            keyboard.row()
            keyboard.text(ctx.t("back-btn"), "account:agency:users")
            keyboard.text(ctx.t("back-to-home-btn"), "menu")
        } else {
            keyboard.text("🎲 اطلاعات اشتراک", "account:subscription")
            keyboard.text("⚡️ خرید اشتراک", "account:purchase")
            keyboard.row()
            keyboard.text("💵 شارژ حساب", "account:charge")
            keyboard.text("🔗 لینک من", "account:referral")
            keyboard.row()
            keyboard.text("💰 پنل فروش", "account:agency")
            keyboard.row()

            keyboard.text(ctx.t("back-to-home-btn"), "menu")
            keyboard.text("🔐 خروج از حساب", "account:logout")
        }

        return keyboard
    }






    public response = async (ctx: MyContext) => {
        ctx.session.inputState = null
        let _keys = await this.keyboard(ctx)
        let _text = await this.text(ctx)
        if (_text === "ErrorGettingData") {
            _keys = backKeyboards(ctx, new InlineKeyboard(), "account:agency")
        }
        if (ctx.callbackQuery) {
            await ctx.editMessageText(
                _text,
                {
                    parse_mode: "HTML",
                    reply_markup: _keys
                }
            );
            await ctx.answerCallbackQuery();
            return
        }
        await ctx.reply(
            _text,
            {
                parse_mode: "HTML",
                reply_markup: _keys
            }
        );
    }





    public checkAccount = async (ctx: MyContext, _next: NextFunction) => {
        const uid = ctx.session.user?.account_id
        if (uid) {
            try {
                const response = await apiService.GET()("account?user=" + uid)
                ctx.session.account = {
                    remaining_days: moment(response.data.account.class_expire).diff(moment(), "days"),
                    ...response.data.account
                }
                return await _next()
            } catch (error) { }
        }
        await ctx.answerCallbackQuery({ show_alert: true, text: "هنوز ثبت نام نکرده اید یا اکانت خود را وارد نکرده اید ❌", });
        await ctx.editMessageText(
            await this.loginORcreateText(ctx),
            { parse_mode: "HTML", reply_markup: await this.loginORcreateKeyboard(ctx) }
        );
    }



    // login or create
    private loginORcreateText = async (ctx: MyContext) => {
        return `🔻 در صورتی که از قبل اکانت دارید و مایل هستید آن را به ربات متصل کنید بر روی اتصال اکانت کلیک کنید در غیر اینصورت بر روی ثبت نام کلیک کنید:`
    }

    private loginORcreateKeyboard = async (ctx: MyContext) => {
        const keyboard = new InlineKeyboard()

        keyboard.text(ctx.t("connect-account-btn"), "account:connect")
        keyboard.text(ctx.t("create-account-btn"), "account:create")
        keyboard.row()

        keyboard.text(ctx.t("back-to-home-btn"), "menu");
        return keyboard
    }

}


export default AccountService