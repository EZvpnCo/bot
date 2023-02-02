import { Api, Bot, InlineKeyboard } from "grammy";
import { MyContext } from "../..";
import * as apiService from "../api"


interface ServerType {
    name: string,
    online: number,
    online_user: number,
    traffic_limit: number,
    traffic_used: number,
    class: string,
    sort: string
}
class ServersService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }


    private data: ServerType[] = []
    private page = 0
    private perPage = 15
    public run() {
        this.bot.command("servers", this.response)
        this.bot.callbackQuery(["servers", /^servers:([0-9]+)$/], this.response)
    }


    private keyboard = async (ctx: MyContext) => {
        const keyboard = new InlineKeyboard()

        if (this.page >= 1) keyboard.text("◀️", "servers:" + (this.page - 1))
        else keyboard.text("🚫", "servers:prev")
        if (this.page < Math.ceil(this.data.length / this.perPage)) keyboard.text("▶️", "servers:" + (this.page + 1))
        else keyboard.text("🚫", "servers:next")
        keyboard.row()


        keyboard.text(ctx.t("back-to-home-btn"), "menu");
        return keyboard
    }

    private text = async (ctx: MyContext) => {
        let _ser = ''
        const m = ((this.page + 1) * this.perPage) < this.data.length ? ((this.page + 1) * this.perPage) : this.data.length
        for (let i = (this.page * this.perPage); i < m; i++) {
            const { name, online, online_user, traffic_limit, traffic_used, class: node_class, sort } = this.data[i]
            let emj = "⚪️"
            if (traffic_limit != 0 && traffic_used >= traffic_limit) emj = "🟡"
            else if (online === 1) emj = "🟢"
            else if (online === 0) emj = "🟠"
            else emj = "🔴"
            _ser += `${emj} <b>${name}</b>\n👥 ${online_user}\n🎲 ${sort}\n🌟 ${node_class}\n\n`
        }
        return `🔻 <b>لیست سرورها (${this.data.length}):</b>\n\n${_ser}`
    }

    private response = async (ctx: MyContext) => {
        if (ctx.match && ctx.match[1]) {
            this.page = parseInt(ctx.match[1])
        }
        if (!this.page) this.page = 0
        try {
            const response = await apiService.GET()("servers")
            this.data = response.data.servers
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
            await ctx.reply("Error => " + error)
        }
    }

}


export default ServersService