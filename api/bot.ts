import { Bot, InlineKeyboard, InputFile } from "grammy";
import Diagnosis from "./diagnosis";
import Downloads from "./downloads";
import Faq from "./faq";
import MainMenu from "./mainMenu";
import Prices from "./prices";
import Tutorials from "./tutorials";

const bot = new Bot("5817494017:AAE--FH-fCndLpZzrBDg_quJxuRa29SVVzc");

MainMenu(bot);
Prices(bot);
Downloads(bot);
Tutorials(bot);
Faq(bot);
Diagnosis(bot);
// Define keyboards


const androidTutorialsKeyboard = new InlineKeyboard().text("Surfboard", "AndroidTutorials-Surfboard").row().text("OneClick", "AndroidTutorials-OneClick").row().text("L2tp", "AndroidTutorials-L2tp").row().text("OpenVPN", "AndroidTutorials-OpenVPN").row().text("صفحه اصلی", "mainMenu");

const iOSTutorialsKeyboard = new InlineKeyboard().text("OneClick", "iOSTutorials-OneClick").row().text("L2tp", "iOSTutorials-L2tp").row().text("صفحه اصلی", "mainMenu");

const windowsTutorialsKeyboard = new InlineKeyboard().text("EZvpn", "WindowsTutorials-EZvpn").row().text("v2rayN", "WindowsTutorials-v2rayN").row().text("L2tp", "WindowsTutorials-L2tp").row().text("صفحه اصلی", "mainMenu");

const macOSTutorialsKeyboard = new InlineKeyboard().text("صفحه اصلی", "mainMenu");







// **********************************************************************************

// ===> files
const androidSurfboardTut = new InputFile({ url: "http://dl.ezvpn.co/tutorials/android/Surfboard.mp4" });
const androidOneClickTut = new InputFile({ url: "http://dl.ezvpn.co/tutorials/android/OneClick.mp4" });
const androidL2tpTut = new InputFile({ url: "http://dl.ezvpn.co/tutorials/android/L2tp.mp4" });
const androidOpenVPNTut = new InputFile({ url: "http://dl.ezvpn.co/tutorials/android/OpenVPN.mp4" });

const iOSOneClickTut = new InputFile({ url: "http://dl.ezvpn.co/tutorials/ios/OneClick.mp4" });
const iOSL2tpTut = new InputFile({ url: "http://dl.ezvpn.co/tutorials/ios/L2tp.mp4" });

const windowsEZvpnTut = new InputFile({ url: "http://dl.ezvpn.co/tutorials/windows/EZvpn.mp4" });
const windowsV2rayNTut = new InputFile({ url: "http://dl.ezvpn.co/tutorials/windows/v2rayN.mp4" });
const windowsL2tpTut = new InputFile({ url: "http://dl.ezvpn.co/tutorials/windows/L2tp.mp4" });

// Handle the /start command.
bot.command("start", (ctx) => {
  const text = `سلام به *EZvpn* خوش اومدید :)
جهت استفاده از ربات بر روی /menu کلیک کنید`;
  ctx.reply(text);
});



// =================> tutorials
bot.callbackQuery("AndroidTutorials-Surfboard", async (ctx) => {
  try {
    await ctx.replyWithVideo(androidSurfboardTut, { caption: "Android - Surfboard" });
  } catch (e) {
    console.log(e);
  }
  await ctx.answerCallbackQuery();
});
bot.callbackQuery("AndroidTutorials-OneClick", async (ctx) => {
  try {
    await ctx.replyWithVideo(androidOneClickTut, { caption: "Android - OneClick" });
  } catch (e) {
    console.log(e);
  }
  await ctx.answerCallbackQuery();
});
bot.callbackQuery("AndroidTutorials-L2tp", async (ctx) => {
  try {
    await ctx.replyWithVideo(androidL2tpTut, { caption: "Android - L2tp" });
  } catch (e) {
    console.log(e);
  }
  await ctx.answerCallbackQuery();
});
bot.callbackQuery("AndroidTutorials-OpenVPN", async (ctx) => {
  try {
    await ctx.replyWithVideo(androidOpenVPNTut, { caption: "Android - OpenVPN" });
  } catch (e) {
    console.log(e);
  }
  await ctx.answerCallbackQuery();
});
// iOSTutorials
bot.callbackQuery("iOSTutorials-OneClick", async (ctx) => {
  try {
    await ctx.replyWithVideo(iOSOneClickTut, { caption: "iOS - OneClick" });
  } catch (e) {
    console.log(e);
  }
  await ctx.answerCallbackQuery();
});
bot.callbackQuery("iOSTutorials-L2tp", async (ctx) => {
  try {
    await ctx.replyWithVideo(iOSL2tpTut, { caption: "iOS - L2tp" });
  } catch (e) {
    console.log(e);
  }
  await ctx.answerCallbackQuery();
});
// WindowsTutorials
bot.callbackQuery("WindowsTutorials-EZvpn", async (ctx) => {
  try {
    await ctx.replyWithVideo(windowsEZvpnTut, { caption: "Windows - EZvpn" });
  } catch (e) {
    console.log(e);
  }
  await ctx.answerCallbackQuery();
});
bot.callbackQuery("WindowsTutorials-v2rayN", async (ctx) => {
  try {
    await ctx.replyWithVideo(windowsV2rayNTut, { caption: "Windows - v2rayN" });
  } catch (e) {
    console.log(e);
  }
  await ctx.answerCallbackQuery();
});
bot.callbackQuery("WindowsTutorials-L2tp", async (ctx) => {
  try {
    await ctx.replyWithVideo(windowsL2tpTut, { caption: "Windows - L2tp" });
  } catch (e) {
    console.log(e);
  }
  await ctx.answerCallbackQuery();
});

// =================> tutorials



// =================> servers
// servers
bot.callbackQuery("servers", async (ctx) => {
  await ctx.answerCallbackQuery({
    text: "You can see Servers list :)",
  });
});
// =================> servers

// Handle other messages.
bot.on("message", (ctx) => ctx.reply("میفهمم اما متوجه نمیشم :("));

// Start the bot.
bot.start();
