import { Bot, InlineKeyboard } from "grammy";
import { Op } from "sequelize";
import { MyContext } from "../..";
import DiagnosisService from "../diagnosis";
import DownloadsService from "../downloads";
import FaqService from "../faq";
import PingPongService from "../pingpong";
import PricesService from "../prices";
import ServersService from "../servers";
import TutorialsService from "../tutorials";

class MenuService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.command("menu", this.response)
        this.bot.callbackQuery("menu", this.response)

        new PingPongService(this.bot).run()
        new FaqService(this.bot).run()
        new DiagnosisService(this.bot).run()
        new PricesService(this.bot).run()
        new DownloadsService(this.bot).run()
        new TutorialsService(this.bot).run()
        new ServersService(this.bot).run()
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

            .text(ctx.t("menu.account-btn"), "account")
            .text(ctx.t("menu.agency-btn"), "agency")
            .row()



            .url(ctx.t("menu.support-btn"), "EZvpnAdmin.t.me")
            .row()
        // .url(ctx.t("menu.support-btn"), "clash://install-config?url=https://panel.ezvpn.co/sub/3d925f710b3d65b7/clash&name=EZvpn%20Panel")
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