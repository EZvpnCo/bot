import { Bot, InlineKeyboard } from "grammy";
import { backKeyboards, MyContext } from "../..";
import Tutorials from "../../database/models/bot_tutorials.model";

class TutorialsService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.command("tutorials", this.response)
        this.bot.callbackQuery("tutorials", this.response)
        this.bot.callbackQuery(/^tutorials:(agent panel|android|ios|windows|macos)$/, this.getContent)
        this.bot.callbackQuery(/^tutorials:([0-9]+)$/, this.getItem)
    }

    // ############################
    private keyboard = async (ctx: MyContext) => {
        const keyboard = new InlineKeyboard()

        const groups = await Tutorials.findAll({ group: "category" })

        groups.forEach(({ category }) => {
            keyboard
                .text(category.toUpperCase(), "tutorials:" + category).row()
        })

        keyboard.text(ctx.t("back-to-home-btn"), "menu")
        return keyboard
    }

    private text = async (ctx: MyContext) => {
        return ctx.t("tutorials")
    }

    private response = async (ctx: MyContext) => {
        ctx.session.inputState = null

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
        ctx.session.inputState = null

        const cat = ctx.match![1];

        const keyboard = new InlineKeyboard()

        const query = await Tutorials.findAndCountAll({ where: { category: cat } })
        query.rows.forEach(ssx => {
            keyboard.text(ssx.title, "tutorials:" + ssx.id).row()
        });

        const _keyboard = backKeyboards(ctx, keyboard, "tutorials")

        await ctx.editMessageText(ctx.t("tutorials"), { reply_markup: _keyboard });
        await ctx.answerCallbackQuery();
    }


    private getItem = async (ctx: MyContext) => {
        const q = parseInt(ctx.match![1]);
        const query = await Tutorials.findByPk(q)

        if (!query) return await ctx.answerCallbackQuery("❌");

        const _keyboard = new InlineKeyboard()
        let _text = `${query.category.toUpperCase()} - ${query.title}`
        if (query.video) {
            await ctx.replyWithVideo(query.video, { caption: _text, reply_markup: _keyboard });
        }
        else {
            _text += `\n\n${query.url}`
            const keyboard = backKeyboards(ctx, _keyboard, "tutorials:" + query.category)
            await ctx.reply(_text, { reply_markup: keyboard })
        }
        await ctx.answerCallbackQuery();
    }
}


export default TutorialsService