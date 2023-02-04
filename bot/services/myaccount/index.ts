import { Bot } from "grammy";
import { MyContext } from "../..";
import * as apiService from "../api"

class MyAccountService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.command("myaccount", this.response)
        this.bot.callbackQuery("myaccount", this.response)
    }

    private data = {}
    private text = async (ctx: MyContext) => {
        return `Hello ${this.data}`
    }

    private response = async (ctx: MyContext) => {
        const response = await apiService.GET()("me")
        this.data = response.data.servers
        await ctx.reply(
            await this.text(ctx),
            { parse_mode: "MarkdownV2" }
        );
    }

}


export default MyAccountService