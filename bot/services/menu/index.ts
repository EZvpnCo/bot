import { Bot, InlineKeyboard } from "grammy";
import { Op } from "sequelize";
import { MyContext } from "../..";

class MenuService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.command("menu", this.response)
        this.bot.callbackQuery("menu", this.response)
    }

    // ############################

    private keyboard = async (ctx: MyContext) => {
        const keyboard = new InlineKeyboard()
            .text(ctx.t("menu.prices-btn"), "prices")
            .row()
            .text(ctx.t("menu.downloads-btn"), "downloads")
            .text(ctx.t("menu.tutorials-btn"), "tutorials")
            .row()
            .text(ctx.t("menu.diagnosis-btn"), "diagnosis")
            .text(ctx.t("menu.faq-btn"), "faq")
            .row()
            .text(ctx.t("menu.servers-btn"), "servers")
            .row()
            .url(ctx.t("menu.support-btn"), "EZvpnAdmin.t.me")
            .row()
            .text(ctx.t("menu.myaccount-btn"), "myaccount")
        // if (admins.includes(ctx?.from?.id!)) keyboard.text("🎛 مدیریت", "management")
        return keyboard
    }

    private text = async (ctx: MyContext) => {
        return ctx.t("menu")
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

}


export default MenuService