import { Bot, InlineKeyboard, NextFunction } from "grammy";
import { MyContext } from "../..";
import * as apiService from "../api"
import MenuService from "../menu";

class AccountLogoutService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.callbackQuery("account:logout", this.response)
    }


    private response = async (ctx: MyContext) => {
        ctx.session.inputState = null
        ctx.session.user!.account_id = null
        await ctx.session.user?.save()

        await ctx.answerCallbackQuery({ show_alert: true, text: "خارج شدید!", });

        new MenuService(this.bot).response(ctx)
        await ctx.answerCallbackQuery();

        return
    }

}


export default AccountLogoutService