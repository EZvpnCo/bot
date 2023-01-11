import { Bot } from "grammy";

const Servers = (bot: Bot) => {
    bot.callbackQuery("servers", async (ctx) => {
        await ctx.answerCallbackQuery({
            text: "You can see Servers list :)",
        });
    });
};

export default Servers;
