import { Bot, } from "grammy";

const PingPong = (bot: Bot) => {

    // Handle the /ping command.
    bot.command("ping", (ctx) => {
        const text = `
        *Pong!*
        *ChatID:* ${ctx.chat.id}
        *UserID:* ${ctx.message?.from.id}
        `
        ctx.reply(text, { parse_mode: 'MarkdownV2' });
    });
};

export default PingPong;
