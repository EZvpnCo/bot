import { Bot, InlineKeyboard } from "grammy";
import { backKeyboards, MyContext } from "../..";

class MakeMoneyService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.command("make_money", this.response)
        this.bot.callbackQuery("make_money", this.response)
    }

    // ############################
    private keyboard = async (ctx: MyContext) => {
        const keyboard = new InlineKeyboard()
        keyboard.text("💸 Let's Go", "account:agency").row()
        keyboard.text(ctx.t("back-to-home-btn"), "menu");
        return keyboard
    }

    private text = async (ctx: MyContext) => {
        return `<b>💰 طرح های کسب درآمد در ایزی 💰</b>

۱) فروش وی پی ان به کاربران
۲) حذب فروشنده`
    }

    private response = async (ctx: MyContext) => {
        ctx.session.inputState = null

        if (ctx.callbackQuery) {
            await ctx.editMessageText(
                await this.text(ctx),
                { reply_markup: await this.keyboard(ctx), parse_mode: "HTML" }
            );
            await ctx.answerCallbackQuery();
            return
        }
        await ctx.reply(
            await this.text(ctx),
            { reply_markup: await this.keyboard(ctx), parse_mode: "HTML" }
        );
    }

}


export default MakeMoneyService