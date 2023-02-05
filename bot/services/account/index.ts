import { Bot, InlineKeyboard } from "grammy";
import moment from "moment";
import { MyContext } from "../..";
import * as apiService from "../api"
import AccountConnectService from "./connect";
import AccountCreateService from "./create";


interface AccountType {
    user_name: string,
    email: string,
    node_group: string,
    class: string,
    class_expire: string,
    money: number,
    node_iplimit: number,
    used_traffic: string,
    unused_traffic: string,
    total_traffic: string,
    remaining_days: number,
}

class AccountService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.command("account", this.response)
        this.bot.callbackQuery("account", this.response)

        new AccountConnectService(this.bot).run()
        new AccountCreateService(this.bot).run()
    }

    private account: AccountType | null = null
    private text = async (ctx: MyContext) => {

        const a = this.account!
        return `👤 <b>${a.user_name}</b>
📧 <pre>${a.email}</pre>
🧩 ${a.node_group}
⭐️ ${a.class}

⌛️ Expire: ${a.class_expire} (${a.remaining_days} Day)
📤 Traffic: ${a.used_traffic} / ${a.total_traffic}
🖥 Device: ${(a.node_iplimit > 0 ? "~" + " / " + a.node_iplimit : "Unlimited")}
💰 Wallet: ${a.money}$`
    }



    private keyboard = async (ctx: MyContext) => {
        const keyboard = new InlineKeyboard()

        // keyboard.text("🚫", "servers:next")
        // keyboard.row()


        keyboard.text(ctx.t("back-to-home-btn"), "menu");
        return keyboard
    }






    private response = async (ctx: MyContext) => {
        try {
            const uid = ctx.session.user?.account_id
            const response = await apiService.GET()("account?user=" + uid)
            this.account = {
                remaining_days: moment(response.data.account.class_expire).diff(moment(), "days"),
                ...response.data.account
            }
            await ctx.editMessageText(
                await this.text(ctx),
                { parse_mode: "HTML", reply_markup: await this.keyboard(ctx) }
            );
            await ctx.answerCallbackQuery();
        } catch (error) {
            await ctx.answerCallbackQuery({ show_alert: true, text: "هنوز ثبت نام نکرده اید یا اکانت خود را وارد نکرده اید ❌", });
            await ctx.editMessageText(
                await this.loginORcreateText(ctx),
                { parse_mode: "HTML", reply_markup: await this.loginORcreateKeyboard(ctx) }
            );
        }
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