import { Bot, InlineKeyboard } from "grammy";

const bot = new Bot("5817494017:AAE--FH-fCndLpZzrBDg_quJxuRa29SVVzc");

// Handle the /start command.
bot.command("start", (ctx) => {
    const inlineKeyboard = new InlineKeyboard()
        .text("Get random music", "random").row()
    ctx.reply("خوش  :)", { reply_markup: inlineKeyboard, })
});

// Handle other messages.
bot.on("message", (ctx) => ctx.reply("Got another message!"));

// Start the bot.
bot.start();