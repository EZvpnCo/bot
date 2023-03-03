import { Bot } from "grammy";
import { MyContext } from "../../..";

class PingPongService {
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
        ctx.session.inputState = null

        await ctx.reply(
            await this.text(ctx),
            { parse_mode: "MarkdownV2" }
        );
    }

}


export default PingPongService