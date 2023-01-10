import { Bot, InlineKeyboard } from "grammy";

const MainMenu = (bot: Bot) => {
  // text
  const mainMenuText = "از منوی زیر انتخاب کنید:";

  // keyboard
  const mainMenuKeyboard = new InlineKeyboard().text("تعرفه ها", "prices").row().text("دانلود", "downloads").text("آموزش ها", "tutorials").row().text("عیب یابی", "diagnosis").text("سوالات متداول", "faq").row().text("لیست سرورها", "servers").row().url("پشتیبانی", "EZvpnAdmin.t.me");

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
