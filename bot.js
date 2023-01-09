"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const bot = new grammy_1.Bot("5817494017:AAE--FH-fCndLpZzrBDg_quJxuRa29SVVzc");
// Handle the /start command.
bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
// Handle other messages.
bot.on("message", (ctx) => ctx.reply("Got another message!"));
// Start the bot.
bot.start();
