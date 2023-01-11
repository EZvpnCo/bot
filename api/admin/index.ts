import { Bot, } from "grammy";
import { Admins as admins } from "../config";

const Admin = (bot: Bot) => {

    // Handle the /ping command.
    bot.command("management", async (ctx) => {
        // if ()
        const text = `Hello Admin`
        await ctx.reply(text, { parse_mode: 'MarkdownV2', reply_to_message_id: ctx.msg.message_id });
    });
};

export default Admin;
