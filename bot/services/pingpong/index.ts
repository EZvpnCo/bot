import { Bot, InlineKeyboard } from "grammy";
import { Op } from "sequelize";
import { MyContext } from "../..";

class MenuService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.command("pingpong", this.response)
    }

    private text = async (ctx: MyContext) => {
        return `*Pong\\!*
*ChatID:* ${ctx.chat!.id}
*ChatType:* ${ctx.chat!.type}
*UserID:* ${ctx?.from?.id}`
    }

    private response = async (ctx: MyContext) => {
        await ctx.reply(
            await this.text(ctx),
            { parse_mode: "MarkdownV2" }
        );
    }

}


export default MenuService