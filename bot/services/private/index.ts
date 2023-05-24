import { Bot, } from "grammy";
import { MyContext } from "../..";
import MenuService from "./menu";

class PrivateService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.command("start", (ctx) => {
            const isNew = ctx.session.isNew
            const text = isNew ? ctx.t("welcome") : ctx.t("welcome-back");
            ctx.reply(text, { parse_mode: 'MarkdownV2' }).catch(e => console.log(e));
        });
        // new MenuService(this.bot).run()
    }

}


export default PrivateService