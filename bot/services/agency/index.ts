import { Bot } from "grammy";
import { MyContext } from "../..";
import * as apiService from "../api"

class AgencyService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.command("agency", this.response)
        this.bot.callbackQuery("agency", this.response)
    }

    private data = {}
    private text = async (ctx: MyContext) => {
        return `Hello Agent ${JSON.stringify(this.data)}`
    }

    private response = async (ctx: MyContext) => {
        try {
            const response = await apiService.GET()("me")
            this.data = response.data
            await ctx.reply(
                await this.text(ctx),
                { parse_mode: "HTML" }
            );
        } catch (error) {
            await ctx.reply(JSON.stringify(error));
        }
    }

}


export default AgencyService