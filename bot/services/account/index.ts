import { Bot, InlineKeyboard } from "grammy";
import { MyContext } from "../..";
import * as apiService from "../api"

class AccountService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.command("account", this.response)
        this.bot.callbackQuery("account", this.response)
    }

    private account = {}
    private text = async (ctx: MyContext) => {
        return `Hello ${JSON.stringify(this.account)}`
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