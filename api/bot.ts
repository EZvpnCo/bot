import { Bot, InlineKeyboard } from "grammy";

const bot = new Bot("5817494017:AAE--FH-fCndLpZzrBDg_quJxuRa29SVVzc");

// Handle the /start command.
bot.command("start", (ctx) => {
    let text = 'سلام به *EZvpn* خوش اومدید :)';
    text += '\nجهت استفاده از ربات بر روی /menu کلیک کنید';
    ctx.reply(text, { parse_mode: "MarkdownV2" })
});

// Handle the /menu command.
bot.command("menu", (ctx) => {
    const inlineKeyboard = new InlineKeyboard()
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
        .url(
        "پشتیبانی",
        "EZvpnAdmin.t.me",
        )
    let text = 'از منوی زیر انتخاب کنید:';
    ctx.reply(text, { reply_markup: inlineKeyboard, parse_mode: "MarkdownV2" })
});

// Handle other messages.
bot.on("message", (ctx) => ctx.reply("میفهمم اما متوجه نمیشم :("));

// Start the bot.
bot.start();