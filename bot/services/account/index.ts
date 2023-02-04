import { Bot, InlineKeyboard } from "grammy";
import moment from "moment";
import { MyContext } from "../..";
import * as apiService from "../api"


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

}

class AccountService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.command("account", this.response)
        this.bot.callbackQuery("account", this.response)
    }

    private account: AccountType | null = null
    private text = async (ctx: MyContext) => {
        const a = this.account!
        return `👤 <b>${a.user_name}</b>
📧 <pre>${a.email}</pre>
🧩 ${a.node_group}
⭐️ ${a.class}

⌛️ Expire: ${a.class_expire} (${moment().diff(a.class_expire, "days")} Day)
📤 Traffic: ${a.used_traffic} / ${a.total_traffic}
🖥 Device: ${(a.node_iplimit > 0 ? "~" + " / " + a.node_iplimit : "Unlimited")}
💰 Wallet: ${a.money}$`
    }

    private keyboard = async (ctx: MyContext) => {
        const keyboard = new InlineKeyboard()

        // if (this.page >= 1) keyboard.text("◀️", "servers:" + (this.page - 1))
        // else keyboard.text("🚫", "servers:prev")
        // keyboard.text((this.page + 1).toString(), "servers:current")
        // if (this.page + 1 < Math.ceil(this.data.length / this.perPage)) keyboard.text("▶️", "servers:" + (this.page + 1))
        // else keyboard.text("🚫", "servers:next")
        // keyboard.row()


        keyboard.text(ctx.t("back-to-home-btn"), "menu");
        return keyboard
    }

    private response = async (ctx: MyContext) => {
        try {
            const uid = ctx.session.user?.account_id
            const response = await apiService.GET()("account?user=" + uid)
            this.account = response.data.account
            await ctx.editMessageText(
                await this.text(ctx),
                { parse_mode: "HTML", reply_markup: await this.keyboard(ctx) }
            );
            await ctx.answerCallbackQuery();
        } catch (error) {
            await ctx.answerCallbackQuery({ show_alert: true, text: "❌ هنوز ثبت نام نکرده اید", });
        }
    }

}


export default AccountService