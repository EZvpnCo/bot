import { Bot, GrammyError, session, HttpError, Context, SessionFlavor } from "grammy";
import { UserFromGetMe } from "grammy/out/types";
import { I18n, I18nFlavor } from "@grammyjs/i18n";

import { BotToken, SuperAdmin } from "./config"
import Authentication from "./middleware/authentication";

// import Admin from "./admin";

// import Diagnosis from "./service/diagnosis/diagnosis";
// import Downloads from "./service/downloads/downloads";
// import Faq from "./service/faq/faq";
// import MainMenu from "./service/menu/mainMenu";
// import PingPong from "./service/pingpong/pingpong";
// import Prices from "./service/prices/prices";
// import Servers from "./service/servers/servers";
// import Tutorials from "./service/prices/tutorials";

interface InputState {
  category: string;
  subID: number,
  parameter: string;
  messageID: number | null;
  data: string | null;
}

// Define the shape of our session.
interface SessionData {
  __language_code?: string;
  // user: User | null;
  isNew: boolean;
  inputState: InputState | null;
}

export type MyContext = Context & SessionFlavor<SessionData> & I18nFlavor;



// Install session middleware, and define the initial session value.
function initial(): SessionData {
  return {
    __language_code: "fa",
    // user: null,
    isNew: true,
    inputState: null,

  };
}


const bot = new Bot<MyContext>(BotToken);

bot.use(session({ initial }));
// bot
//   .filter((ctx) => ctx.message !== undefined || ctx.callbackQuery !== undefined)
//   .use(Authentication);



// Create an `I18n` instance.
// Continue reading to find out how to configure the instance.
const i18n = new I18n<MyContext>({
  defaultLocale: "fa",
  directory: "locales",
  useSession: true,
  globalTranslationContext(ctx) {
    return { name: ctx.from?.first_name ?? "" };
  },
});



bot.use(i18n);

// MainMenu(bot);
// Prices(bot);
// Downloads(bot);
// Tutorials(bot);
// Faq(bot);
// Diagnosis(bot);
// Servers(bot);
// PingPong(bot);

// Admin(bot);


// Handle the /start command.
bot.command("start", (ctx) => {
  const text = ctx.t("welcome", {
    value: 123.456,
    applesCount: 1,
  });
  ctx.reply(text, { parse_mode: 'MarkdownV2' }).catch(e => console.log(e));
});


bot.command("language", async (ctx) => {
  if (ctx.match === "") {
    return await ctx.reply(ctx.t("language-specify-a-locale"));
  }

  // `i18n.locales` contains all the locales that have been registered
  if (!i18n.locales.includes(ctx.match)) {
    return await ctx.reply(ctx.t("language-invalid-locale"));
  }

  // `ctx.i18n.getLocale` returns the locale currently using.
  if ((await ctx.i18n.getLocale()) === ctx.match) {
    return await ctx.reply(ctx.t("language-already-set"));
  }

  await ctx.i18n.setLocale(ctx.match);
  await ctx.reply(ctx.t("language-language-set"));
});

// Handle other messages.
bot.on("message", (ctx) => ctx.reply("Hi5"));
bot.on("inline_query", (ctx) => ctx.answerInlineQuery([]));
bot.on("callback_query", (ctx) => ctx.answerCallbackQuery("Sorry, data:" + ctx.callbackQuery.data));



// Catch
bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});



// Start the bot.
bot.start({
  onStart: async (info: UserFromGetMe) => {
    console.log("Starting ...")
    let _text = `<b>${info.first_name}(@${info.username})</b> is running ...\n`
    bot.api.sendMessage(SuperAdmin, _text, { parse_mode: 'HTML' })
  }
});
