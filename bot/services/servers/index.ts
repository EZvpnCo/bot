import { Api, Bot } from "grammy";
import { MyContext } from "../..";
import * as apiService from "../api"



class ServersService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    private data = {}
    public run() {
        this.bot.command("servers", this.response)
        this.bot.callbackQuery("servers", this.response)
    }

    private text = async (ctx: MyContext) => {
        console.table(this.data)
        return `*Pong\\!*
*ChatID:* ${ctx.chat!.id}
*ChatType:* ${ctx.chat!.type}
*UserID:* ${ctx?.from?.id}`

    }

    private response = async (ctx: MyContext) => {
        this.data = await apiService.GET()("servers")

        await ctx.reply(
            await this.text(ctx),
            { parse_mode: "MarkdownV2" }
        );
    }

}


export default ServersService