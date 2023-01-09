"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const bot = new grammy_1.Bot("5817494017:AAE--FH-fCndLpZzrBDg_quJxuRa29SVVzc");
// Handle the /start command.
bot.command("start", (ctx) => {
    const inlineKeyboard = new grammy_1.InlineKeyboard()
        .text("Get random music", "random").row();
    ctx.reply("خوش آمدید :)", { reply_markup: inlineKeyboard, });
});
// Handle other messages.
bot.on("message", (ctx) => ctx.reply("Got another message!"));
// Start the bot.
bot.start();
