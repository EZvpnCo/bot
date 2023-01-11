import { Bot, Context, InlineKeyboard } from "grammy";
import { MyBot } from "./bot";
import { Admins as admins } from "./config";

const MainMenu = (bot: MyBot) => {
    // text
    const text = "🔻 از منوی زیر انتخاب کنید:";

    // keyboard
    const genKeyboard = (ctx: Context) => {
        const keyboard = new InlineKeyboard()
            .text("💰 تعرفه‌ها", "prices")
            .row()
            .text("📥 مرکز دانلود", "downloads")
            .text("📚 بخش آموزش", "tutorials")
            .row()
            .text("⚙️ عیب‌یابی", "diagnosis")
            .text("❓سوالات متداول", "faq")
            .row()
            .text("🖥 سرورها", "servers")
            .row()
            .url("💬 پشتیبانی", "EZvpnAdmin.t.me")
            .row()
            .text("🕹 حساب من", "myaccount")


        keyboard.text("🎛 مدیریت", "management")
        return keyboard
    }



    // Handle the /menu command.
    bot.command("menu", async (ctx) => {
        await ctx.reply(text, { reply_markup: genKeyboard(ctx) });
    });

    // mainMenu
    bot.callbackQuery("mainMenu", async (ctx) => {
        await ctx.editMessageText(text, { reply_markup: genKeyboard(ctx) });
        await ctx.answerCallbackQuery();
    });
};

export default MainMenu;
