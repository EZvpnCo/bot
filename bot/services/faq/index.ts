import { Bot, InlineKeyboard } from "grammy";
import { backKeyboards, MyContext } from "../..";
import Faq from "../../database/models/bot_faq.model";

class FaqService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.command("faq", this.response)
        this.bot.callbackQuery("faq", this.response)
        this.bot.callbackQuery(/^faq:([0-9]+)$/, this.getContent)
    }

    // ############################
    private query: { rows: Faq[]; count: number; } | undefined;
    private keyboard = async (ctx: MyContext) => {
        const keyboard = new InlineKeyboard()

        this.query?.rows.forEach((q, i) => {
            keyboard.text(q.subject, "faq:" + q.id).row();
        });

        keyboard.text(ctx.t("back-to-home-btn"), "menu");
        return keyboard
    }

    private text = async (ctx: MyContext) => {
        return ctx.t("faq")
    }

    private response = async (ctx: MyContext) => {
        this.query = await Faq.findAndCountAll({ where: { lang: ctx.session.__language_code } })
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
        const q = parseInt(ctx.match![1]);
        const fContent = await Faq.findByPk(q)
        if (!fContent) return await ctx.answerCallbackQuery("❌");
        await ctx.editMessageText(
            `❓ ${fContent?.subject}\n\n💭 ${fContent?.content}`,
            { reply_markup: backKeyboards(ctx, new InlineKeyboard(), "faq") }
        );
        await ctx.answerCallbackQuery();
    }

}


export default FaqService