import { Bot, InlineKeyboard } from "grammy";
import { MyContext } from "../..";
import * as apiService from "../api"

class AccountCreateService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.callbackQuery("account:create", this.response)
    }

    private data = {}
    private text = async (ctx: MyContext) => {
        return `Hello Agent ${JSON.stringify(this.data)}`
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
            const response = await apiService.GET()("account")
            this.data = response.data
            if (ctx.callbackQuery) {
                await ctx.editMessageText(
                    await this.text(ctx),
                    { parse_mode: "HTML", reply_markup: await this.keyboard(ctx) }
                );
                await ctx.answerCallbackQuery();
                return
            }
            await ctx.reply(
                await this.text(ctx),
                { parse_mode: "HTML", reply_markup: await this.keyboard(ctx) }
            );
        } catch (error) {
            await ctx.reply("Error => " + error);
        }
    }

}


export default AccountCreateService