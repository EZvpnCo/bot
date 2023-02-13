import { Bot, InlineKeyboard } from "grammy";
import { backKeyboards, MyContext } from "../..";
import Downloads from "../../database/models/bot_downloads.model";

class DownloadsService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.command("downloads", this.response)
        this.bot.callbackQuery("downloads", this.response)
        this.bot.callbackQuery(/^downloads:(android|ios|windows|macos)$/, this.getContent)
        this.bot.callbackQuery(/^downloads:([0-9]+)$/, this.getItem)
    }

    // ############################
    private keyboard = async (ctx: MyContext) => {
        const keyboard = new InlineKeyboard()

        const groups = await Downloads.findAll({ group: "category" })

        groups.forEach(({ category }) => {
            keyboard
                .text(category.toUpperCase(), "downloads:" + category).row()
        })

        keyboard.text(ctx.t("back-to-home-btn"), "menu")
        return keyboard
    }

    private text = async (ctx: MyContext) => {
        return ctx.t("downloads")
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
        ctx.session.inputState = null

        const cat = ctx.match![1];

        const keyboard = new InlineKeyboard()

        const query = await Downloads.findAndCountAll({ where: { category: cat } })
        query.rows.forEach(ssx => {
            keyboard.text(ssx.title, "downloads:" + ssx.id).row()
        });

        const _keyboard = backKeyboards(ctx, keyboard, "downloads")

        await ctx.editMessageText(ctx.t("downloads"), { reply_markup: _keyboard });
        await ctx.answerCallbackQuery();
    }


    private getItem = async (ctx: MyContext) => {
        ctx.session.inputState = null

        const q = parseInt(ctx.match![1]);
        const query = await Downloads.findByPk(q)

        if (!query) return await ctx.answerCallbackQuery("❌");

        const _keyboard = new InlineKeyboard()
        query.download.forEach(({ url, name }) => {
            _keyboard.url('دانلود از ' + name, url).row()
        });
        let _text = `${query.category.toUpperCase()} - ${query.title}`
        if (query.file) {
            await ctx.replyWithDocument(query.file, { caption: _text, reply_markup: _keyboard });
        }
        else {
            const keyboard = backKeyboards(ctx, _keyboard, "downloads:" + query.category)
            await ctx.reply(_text, { reply_markup: keyboard })
        }
        await ctx.answerCallbackQuery();
    }
}


export default DownloadsService