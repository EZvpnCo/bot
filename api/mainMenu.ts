import { Bot, InlineKeyboard } from "grammy";

const MainMenu = (bot: Bot) => {
    // text
    const mainMenuText = "🔻 از منوی زیر انتخاب کنید:";

    // keyboard
    const mainMenuKeyboard = new InlineKeyboard()
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
        .url("💬 پشتیبانی", "EZvpnAdmin.t.me");

    // Handle the /menu command.
    bot.command("menu", (ctx) => {
        ctx.reply(mainMenuText, { reply_markup: mainMenuKeyboard });
    });

    // mainMenu
    bot.callbackQuery("mainMenu", async (ctx) => {
        await ctx.editMessageText(mainMenuText, { reply_markup: mainMenuKeyboard });
    });
};

export default MainMenu;
