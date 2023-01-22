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
        this.bot.callbackQuery(/^downloads:(android|ios|windows|macos)$/g, this.getContent)
        this.bot.callbackQuery(/^downloads:([0-9]+)$/g, this.getItem)
    }

    // ############################
    private keyboard = async (ctx: MyContext) => {
        const keyboard = new InlineKeyboard()

        keyboard
            .text("Android", "downloads:android")
            .text("iOS", "downloads:ios")
            .row()
            .text("Windows", "downloads:windows")
            .text("macOS", "downloads:macos")

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
        const cat = ctx.match![1];
        const query = await Downloads.findAndCountAll({ where: { category: cat } })

        const keyboard = new InlineKeyboard()

        query.rows.forEach(ssx => {
            keyboard.text(ssx.title, "downloads:" + ssx.id).row()
        });

        const _keyboard = backKeyboards(ctx, keyboard, "downloads")

        await ctx.editMessageText(ctx.t("downloads"), { reply_markup: _keyboard });
        await ctx.answerCallbackQuery();
    }


    private getItem = async (ctx: MyContext) => {
        const q = parseInt(ctx.match![1]);
        const query = await Downloads.findByPk(q)

        const keyboard = new InlineKeyboard()
        const _keyboard = backKeyboards(ctx, keyboard, "downloads")

        await ctx.editMessageText(ctx.t("downloads"), { reply_markup: _keyboard });
        await ctx.answerCallbackQuery();
    }
}


export default DownloadsService