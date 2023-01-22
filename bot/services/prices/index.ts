import { Bot, InlineKeyboard } from "grammy";
import { backKeyboards, MyContext } from "../..";

class PricesService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.command("prices", this.response)
        this.bot.callbackQuery("prices", this.response)
        this.bot.callbackQuery(/^prices:(daily|trade|game)$/, this.getContent)
    }

    // ############################
    private keyboard = async (ctx: MyContext) => {
        const keyboard = new InlineKeyboard()

        keyboard
            .text("Daily", "prices:daily")
            .text("Trade", "prices:trade")
            .text("Game", "prices:game")
            .row()

        keyboard.text(ctx.t("back-to-home-btn"), "menu");
        return keyboard
    }

    private text = async (ctx: MyContext) => {
        return ctx.t("prices")
    }

    private response = async (ctx: MyContext) => {
        if (ctx.callbackQuery) {
            await ctx.editMessageText(
                await this.text(ctx),
                { reply_markup: await this.keyboard(ctx) }
            );
            await ctx.answerCallbackQuery();
            return
        }
        await ctx.reply(
            await this.text(ctx),
            { reply_markup: await this.keyboard(ctx) }
        );
    }


    private getContent = async (ctx: MyContext) => {
        const q = ctx.match![1];
        await ctx.editMessageText(ctx.t("prices." + q), { reply_markup: backKeyboards(ctx, new InlineKeyboard(), "prices") });
        await ctx.answerCallbackQuery();
    }

}


export default PricesService