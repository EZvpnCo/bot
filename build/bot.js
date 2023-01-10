"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const bot = new grammy_1.Bot("5817494017:AAE--FH-fCndLpZzrBDg_quJxuRa29SVVzc");
// Handle the /start command.
bot.command("start", (ctx) => {
    let text = 'سلام به <b>EZvpn</b> خوش اومدید :)';
    text += '<br> جهت استفاده از ربات بر روی /menu کلیک کنید';
    ctx.reply(text, { parse_mode: "HTML" });
});
// Handle the /start command.
bot.command("menu", (ctx) => {
    const inlineKeyboard = new grammy_1.InlineKeyboard()
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
        .url("پشتیبانی", "EZvpnAdmin.t.me");
    let text = 'از منوی زیر انتخاب کنید:';
    ctx.reply(text, { reply_markup: inlineKeyboard, parse_mode: "HTML" });
});
// Handle other messages.
bot.on("message", (ctx) => ctx.reply("میفهمم اما متوجه نمیشم :("));
// Start the bot.
bot.start();
