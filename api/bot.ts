import { Bot } from "grammy";
import Admin from "./admin";

import Diagnosis from "./diagnosis";
import Downloads from "./downloads";
import Faq from "./faq";
import MainMenu from "./mainMenu";
import PingPong from "./pingpong";
import Prices from "./prices";
import Servers from "./servers";
import Tutorials from "./tutorials";

const bot = new Bot("5817494017:AAE--FH-fCndLpZzrBDg_quJxuRa29SVVzc");

const admins = [115025624];

// Handle the /start command.
bot.command("start", (ctx) => {
  const text = `*${ctx.msg.from?.first_name}* عزیز\\! سلام
به *EZvpn* خوش اومدید :)
جهت استفاده از ربات بر روی /menu کلیک کنید`;
  ctx.reply(text, { parse_mode: 'MarkdownV2' });
});

MainMenu(bot, admins);
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
