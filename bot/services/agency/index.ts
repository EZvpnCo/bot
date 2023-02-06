import { Bot, InlineKeyboard, NextFunction } from "grammy";
import { MyContext } from "../..";
import * as apiService from "../api"
import MenuService from "../menu";

class AgencyService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.callbackQuery(/^account:agency(.*)$/, this.checkAgency)
        this.bot.callbackQuery("account:agency", this.response)
        this.bot.callbackQuery("account:agency:acceptTOS", this.acceptTOS)
    }


    private text = async (ctx: MyContext) => {
        const account = ctx.session.account

        return `Hello Agent ${JSON.stringify(account)}`
    }

    private keyboard = async (ctx: MyContext) => {
        const keyboard = new InlineKeyboard()

        keyboard.text(ctx.t("back-to-home-btn"), "menu");
        return keyboard
    }

    private response = async (ctx: MyContext) => {
        ctx.session.inputState = null


        await ctx.editMessageText(
            await this.text(ctx),
            { parse_mode: "HTML", reply_markup: await this.keyboard(ctx) }
        );
        await ctx.answerCallbackQuery();
    }




    // #################################

    private checkAgency = async (ctx: MyContext, _next: NextFunction) => {

        const account = ctx.session.account
        if (account.is_agent) {
            return await _next()
        }
        else {
            const agencyTos = `🔻 <b>قوانین و شرایط دریافت پنل فروش:</b>

🇮🇷 تابع قوانین جمهوری اسلامی ایران 🇮🇷
همین دیگه کافیه`
            const keys = new InlineKeyboard()
            keys.text("✅ می پذیرم", "account:agency:acceptTOS")
            keys.row()
            keys.text(ctx.t("back-to-home-btn"), "menu");
            await ctx.answerCallbackQuery("💡 لطفا قوانین و شرایط دریافت پنل فروش را با دقت مطالعه و تایید کنید");
            await ctx.editMessageText(
                agencyTos,
                { parse_mode: "HTML", reply_markup: keys }
            );
        }
    }

    private acceptTOS = async (ctx: MyContext, _next: NextFunction) => {

        // ====> check rules
        const account = ctx.session.account

        if (account.money < 25) {
            await ctx.answerCallbackQuery({
                show_alert: true,
                text: "❌ شرط داشتن حداقل موجودی را رعایت نکرده ابد. لطفا با پشتیبانی در ارتباط باشید"
            })
            new MenuService(this.bot).response(ctx)
        }

        // start
        else {
            await ctx.answerCallbackQuery({
                show_alert: true,
                text: "✅ پنل فروش با موفقیت باز گردید"
            });
            const keys = new InlineKeyboard()
            keys.text("🔓 ورود به پنل", "account:agency")
            await ctx.editMessageText(
                "🔻 برای ورود کلیک کنید:",
                { parse_mode: "HTML", reply_markup: keys }
            );
        }
    }


}


export default AgencyService