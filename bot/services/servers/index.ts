import { Api, Bot } from "grammy";
import { MyContext } from "../..";
import * as apiService from "../api"



class ServersService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    private data = []
    public run() {
        this.bot.command("servers", this.response)
        this.bot.callbackQuery("servers", this.response)
    }

    private text = async (ctx: MyContext) => {

        console.log(this.data)
        return `*Pong\\!*
*ChatID:* ${ctx.chat!.id}
*ChatType:* ${ctx.chat!.type}
*UserID:* ${ctx?.from?.id}`

    }

    private response = async (ctx: MyContext) => {
        this.data = await (await apiService.GET()("servers")).data.servers
        for (let i = 0; i < this.data.length; i++) {
            await ctx.reply(JSON.stringify(this.data[i]))
        }
        // await ctx.reply(
        //     await this.text(ctx),
        //     { parse_mode: "MarkdownV2" }
        // );
    }

}


export default ServersService