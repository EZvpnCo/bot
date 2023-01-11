import { Bot } from "grammy";
import { MyBot } from "./bot";

const Servers = (bot: MyBot) => {
    bot.callbackQuery("servers", async (ctx) => {
        await ctx.answerCallbackQuery({
            text: "You can see Servers list :)",
        });
    });

    // Handle the /servers command.
    bot.command("servers", (ctx) => {
        ctx.reply("Servers");
    });
};

export default Servers;
