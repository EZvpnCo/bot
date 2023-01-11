import { Bot, Context } from "grammy";
import { BotToken } from "./config"

import Admin from "./admin";

import Diagnosis from "./diagnosis";
import Downloads from "./downloads";
import Faq from "./faq";
import MainMenu from "./mainMenu";
import PingPong from "./pingpong";
import Prices from "./prices";
import Servers from "./servers";
import Tutorials from "./tutorials";

import { EmojiFlavor, emojiParser } from "@grammyjs/emoji";

export type MyContext = EmojiFlavor<Context>;
export type MyBot = Bot<MyContext>
const bot = new Bot<MyContext>(BotToken);
bot.use(emojiParser());


// Handle the /start command.
bot.command("start", (ctx) => {
  const text = `سلام *${ctx?.from?.first_name}* عزیز\\!
به *EZvpn* خوش اومدید
جهت استفاده از ربات بر روی /menu کلیک کنید`;
  ctx.reply(text, { parse_mode: 'MarkdownV2' }).catch(e => console.log(e));
});

MainMenu(bot);
Prices(bot);
Downloads(bot);
Tutorials(bot);
Faq(bot);
Diagnosis(bot);
Servers(bot);
PingPong(bot);

Admin(bot);


// Handle other messages.
bot.on("message", (ctx) => ctx.reply("میفهمم اما متوجه نمیشم :("));

// Start the bot.
bot.start();
