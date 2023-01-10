import { Bot, InlineKeyboard } from "grammy";

const bot = new Bot("5817494017:AAE--FH-fCndLpZzrBDg_quJxuRa29SVVzc");

// Define keyboards
const mainKeyboard = new InlineKeyboard()
        .text("تعرفه ها", "prices")
        .row()
        .text("دانلود", "downloads")
        .text("آموزش ها", "tutorials")
        .row()
        .text("عیب یابی", "diagnosis")
        .text("سوالات متداول", "faq")
        .row()
        .text("لیست سرورها", "servers")
        .row()
        .url("پشتیبانی", "EZvpnAdmin.t.me")


// Handle the /start command.
bot.command("start", (ctx) => {
    let text = 'سلام به *EZvpn* خوش اومدید :)';
    text += '\nجهت استفاده از ربات بر روی /menu کلیک کنید';
    ctx.reply(text)
});

// Handle the /menu command.
bot.command("menu", (ctx) => {
    let text = 'از منوی زیر انتخاب کنید:';
    ctx.reply(text, { reply_markup: mainKeyboard })
});

// Handle other messages.
bot.on("message", (ctx) => ctx.reply("میفهمم اما متوجه نمیشم :("));

// prices
bot.callbackQuery("prices", async (ctx) => {
  await ctx.answerCallbackQuery({
    text: "You were curious, indeed!",
  });
});

// downloads
bot.callbackQuery("downloads", async (ctx) => {
  await ctx.answerCallbackQuery({
    text: "You were curious, indeed!",
  });
});

// tutorials
bot.callbackQuery("tutorials", async (ctx) => {
  await ctx.answerCallbackQuery({
    text: "You were curious, indeed!",
  });
});

// diagnosis
bot.callbackQuery("diagnosis", async (ctx) => {
  await ctx.answerCallbackQuery({
    text: "You were curious, indeed!",
  });
});

// faq
bot.callbackQuery("faq", async (ctx) => {
  await ctx.answerCallbackQuery({
    text: "You were curious, indeed!",
  });
});

// servers
bot.callbackQuery("servers", async (ctx) => {
  await ctx.answerCallbackQuery({
    text: "You were curious, indeed!",
  });
});

// Start the bot.
bot.start();