import { Bot, GrammyError, session, HttpError, Context, SessionFlavor, InlineKeyboard } from "grammy";
import { UserFromGetMe } from "grammy/out/types";
import { I18n, I18nFlavor } from "@grammyjs/i18n";
import { BotToken, SuperAdmin } from "./config"
import sequelize from "./database";
import Authentication from "./middleware/authentication";
import User from "./database/models/bot_user.model";
import MenuService from "./services/menu";




interface InputState {
  category: string | null;
  subID: number | null;
  parameter: string;
  messageID: number | null;
  data: string | null;
}

// Define the shape of our session.
interface SessionData {
  __language_code?: string;
  user: User | null;
  account: any;
  agency: any;
  isNew: boolean;
  inputState: InputState | null;
}

export type MyContext = Context & SessionFlavor<SessionData> & I18nFlavor;



// Install session middleware, and define the initial session value.
function initial(): SessionData {
  return {
    __language_code: "fa",
    account: null,
    user: null,
    agency: null,
    isNew: true,
    inputState: null,
  };
}


const bot = new Bot<MyContext>(BotToken);


// Create an `I18n` instance.
// Continue reading to find out how to configure the instance.
const i18n = new I18n<MyContext>({
  defaultLocale: "fa",
  directory: "locales",
  useSession: true,
  globalTranslationContext(ctx) {
    return {
      name: ctx.from?.first_name ?? "",
    };
  },
});



bot.use(i18n);



// #############################################


// Handle the /update command.
bot
  .filter(ctx => ctx.from?.id === SuperAdmin)
  .command("update", async (ctx) => {
    const info = ctx.me;
    let _text = `<b>${info.first_name}(@${info.username}):</b> Updated and lunched\n`
    try {
      await sequelize.authenticate()
      await sequelize.sync()
      _text += `<b>Database:</b> Connected and synced`
    } catch (error) {
      _text += `<b>Database:</b>\nUnable to connect (${error})`
    }
    await ctx.reply(_text, { parse_mode: 'HTML' })
  });


bot.use(session({ initial }));
bot
  .filter((ctx) => ctx.message !== undefined || ctx.callbackQuery !== undefined)
  .use(Authentication);



// Handle the /start command.
bot.command("start", (ctx) => {
  const isNew = ctx.session.isNew
  const text = isNew ? ctx.t("welcome") : ctx.t("welcome-back");
  ctx.reply(text, { parse_mode: 'MarkdownV2' }).catch(e => console.log(e));
});


export const backKeyboards = (ctx: MyContext, keyboard: InlineKeyboard, backLevel: string) => {
  keyboard
    .text(ctx.t("back-btn"), backLevel)
    .text(ctx.t("back-to-home-btn"), "menu")
  return keyboard
}




new MenuService(bot).run()





// Handle language
bot.command("language", async (ctx) => {
  if (ctx.match === "") {
    return await ctx.reply(ctx.t("language.specify-a-locale"));
  }

  // `i18n.locales` contains all the locales that have been registered
  if (!i18n.locales.includes(ctx.match)) {
    return await ctx.reply(ctx.t("language.invalid-locale"));
  }

  // `ctx.i18n.getLocale` returns the locale currently using.
  if ((await ctx.i18n.getLocale()) === ctx.match) {
    return await ctx.reply(ctx.t("language.already-set"));
  }

  await ctx.i18n.setLocale(ctx.match);
  await ctx.reply(ctx.t("language.language-set"));
});




// Handle other messages.
bot.on("message", (ctx) => ctx.reply("🙄 اشتباه میکنیا. اینجا جاش نیست"));
bot.on("inline_query", (ctx) => ctx.answerInlineQuery([]));
bot.on("callback_query", (ctx) => ctx.answerCallbackQuery());



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
