import { response } from "express";
import { Bot, } from "grammy";
import { MyContext } from "../..";
import AccountCreateService from "./account/create";
import MenuService from "./menu";

class PrivateService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.command("start", async (ctx) => {
            // ==== #
            const refCode = ctx.match;
            const hasAccount = !!ctx.session.account
            if (!hasAccount && refCode) {
                // save ref code to db
                ctx.session.user!.referral_code = refCode.replace("ref-", "")
                await ctx.session.user!.save()
                // send register form
                new AccountCreateService(this.bot).response(ctx);
            }
            else {
                const isNew = ctx.session.isNew
                const text = isNew ? ctx.t("welcome") : ctx.t("welcome-back");
                ctx.reply(text, { parse_mode: 'MarkdownV2' }).catch(e => console.log(e));
            }

            // 
        });
        new MenuService(this.bot).run()
    }

}


export default PrivateService