import { Bot, InlineKeyboard, InputFile } from "grammy";
import Downloads from "./downloads";
import MainMenu from "./mainMenu";
import Prices from "./prices";

const bot = new Bot("5817494017:AAE--FH-fCndLpZzrBDg_quJxuRa29SVVzc");

MainMenu(bot);
Prices(bot);
Downloads(bot);
// Define keyboards


const iOSDownloadsKeyboard = new InlineKeyboard().text("OneClick", "iOSDownloads-OneClick").row().text("صفحه اصلی", "mainMenu");

const windowsDownloadsKeyboard = new InlineKeyboard().text("EZvpn", "WindowsDownloads-EZvpn").row().text("v2rayN", "WindowsDownloads-v2rayN").row().text("صفحه اصلی", "mainMenu");

const macOSDownloadsKeyboard = new InlineKeyboard().text("صفحه اصلی", "mainMenu");




const tutorialsKeyboard = new InlineKeyboard().text("Agent Panel", "AgentPanelTutorials").row().text("Android", "AndroidTutorials").row().text("iOS", "iOSTutorials").row().text("Windows", "WindowsTutorials").row().text("macOS", "macOSTutorials").row().text("صفحه اصلی", "mainMenu");

const androidTutorialsKeyboard = new InlineKeyboard().text("Surfboard", "AndroidTutorials-Surfboard").row().text("OneClick", "AndroidTutorials-OneClick").row().text("L2tp", "AndroidTutorials-L2tp").row().text("OpenVPN", "AndroidTutorials-OpenVPN").row().text("صفحه اصلی", "mainMenu");

const iOSTutorialsKeyboard = new InlineKeyboard().text("OneClick", "iOSTutorials-OneClick").row().text("L2tp", "iOSTutorials-L2tp").row().text("صفحه اصلی", "mainMenu");

const windowsTutorialsKeyboard = new InlineKeyboard().text("EZvpn", "WindowsTutorials-EZvpn").row().text("v2rayN", "WindowsTutorials-v2rayN").row().text("L2tp", "WindowsTutorials-L2tp").row().text("صفحه اصلی", "mainMenu");

const macOSTutorialsKeyboard = new InlineKeyboard().text("صفحه اصلی", "mainMenu");

const faqList = [
  ["آیا امکان تست قبل خرید وجود دارد؟",
    "بله با ارسال ایمیل به ادمین میتونید درخواست یه اکانت تست بدین . اکانت تست 1 روزه 1 کاربره و با حجم 1 گیگ میباشد و شامل تمام سرویس های معمولی و پلاس هست."],
  ["فرق سرویس پلاس و معمولی چیه؟", "سرویس های پلاس موقع نت ملی هم کار میکنه و دارای تعداد بیشتری سرور هستن نسبت به سرویس معمولی"],
  ["سرویس ها چند کاربره هستن؟", "سرویس ها تک کاربره و 5 کاربره هستن در دوره های ماهانه و سه ماهه"],
  ["چطوری درامد دلاری داشته باشیم؟", "شما با فروش سرویس های ما میتونید 20 درصد رو به عنوان پورسانت مستقیما به کیف پول خودتون منتقل کنید. برای اینکار نیازه که حساب کاربری خودتون رو از یوزر به ایجنت تغییر بدین. برای اینکار با ادمین در ارتباط باشین."],
  ["بر روی چه دستگاه هایی کار میکنه؟", "بر روی تمامی دستگاه ها قابلیت نصب و فعالسازی وجود داره"],
  ["بر روی چه اینترنتی کار میکنه؟", "روی تمامی اینترنت ها تست شده و کار میکنه ولی با توجه به اختلالات موجود قبل از خرید حتما اکانت تست دریافت کنید و تست کنید."],
  ["تعرفه ها چند ماهه هستن؟", "سرویس ها در بازه های زمانی یک ماهه و سه ماهه ارائه میشه"],
  ["از کدوم کشورا سرور دارین؟", "فعلا از کشور های آلمان هلند فرانسه آمریکا ترکیه بحرین آذربایجان و ... موجوده"],
  [
    "با چه نرم افزاری کار میکنه؟",
    `برای اندروید: surfboard – v2rayng – one click
برای آیفون: one click – fair -rocket tool – shadowlink
برای ویندوز: ezvpn – v2rayn – qv2ray`,
  ],
  ["برای گیم سرویس موجوده؟", "بله برای گیم در لوکیشن های ترکیه آلمان و بحرین موجوده"],
  ["برای ترید سرویس موجوده؟", "بله برای ترید سرور های ترکیه موجود هستن بدون LEAK DNS"],
];

const diagnosisList = [
  [
    "(iOS) سرور ها ایمپورت نمیشن",
    `راه حل 1: مطمئن باشید که گزینه مربوط به سابزکریپشن رو انتخاب کردین
راه حل 2: مطمئن باشین که لینک رو درست کپی کردین و هیچ کارکتر یا جای خالی اضافی رو کپی نکرده باشین.
راه حل 3: مطمئن باشین که آخر لینک اشتراک شما با sub=3 به اتمام رسیده باشه.
راه حل 4: مطمئن باشین که vpn روشن نداشته باشین.`,
  ],
  [
    "(iOS) وصل میشه ولی کار نمیکنه",
    `راه حل 1: سرور هایی که TJ دارن داخل اسمشون رو تست کنید .
راه حل 2: برنامه های دیگه ای رو تست کنید. از قسمت اموزش و دانلود میتونید برنامه های دیگه ای رو ببینید`,
  ],
  [
    "(iOS) سرورها پینگ نمیدن",
    `راه حل 1: با اینترنت دیگه ای تست بفرمایید
راه حل 2: لینک اشتراک رو پاک کنید و مجدد اضافه کنید.
راه حل 3: زمان و حجم باقی مانده حسابتون رو چک بفرمایید.
راه حل 4: مطمعن باشین که با دستگاه دیگه ای به اشتراکتون وصل نیستید.`,
  ],
  [
    "(Android) سرور ها ایمپورت نمیشن",
    `راه حل 1: مطمئن باشید که گزینه مربوط به سابزکریپشن رو انتخاب کردین
راه حل 2: مطمئن باشین که لینک رو درست کپی کردین و هیچ کارکتر یا جای خالی اضافی رو کپی نکرده باشین.
راه حل 3: برای برنامه surfboard مطمئن باشید که آخر لینک اشتراکتون با surfboard=1 و برای بقیه برنامه ها و دستگاه ها با sub=3 به اتمام رسیده باشه.
راه حل 4: مطمئن باشین که vpn روشن نداشته باشین.`,
  ],
  [
    "(Android) وصل میشه ولی کار نمیکنه",
    `راه حل 1: سرور هایی که TJ دارن داخل اسمشون رو تست کنید .
راه حل 2: برنامه های دیگه ای رو تست کنید. از قسمت اموزش و دانلود میتونید برنامه های دیگه ای رو ببینید
راه حل 3: نوع کانکشن رو روی global یا سراسری قرار بدین و چک کنید.
راه حل 4: پروفایل خودتون رو یک بار آپدیت کنید.`,
  ],
  [
    "(Android) سرورها پینگ نمیدن",
    `راه حل 1: با اینترنت دیگه ای تست بفرمایید
راه حل 2: لینک اشتراک رو پاک کنید و مجدد اضافه کنید.
راه حل 3: زمان و حجم باقی مانده حسابتون رو چک بفرمایید.
راه حل 4: مطمئن باشین که با دستگاه دیگه ای به اشتراکتون وصل نیستید.`,
  ],
  [
    "(Android) L2tp تند تند قطع میشه",
    `راه حل 1: مطمعن باشید که به vpn  دیگه ای وصل نباشید
راه حل 2: برنامه های دیگه ای رو تست بفرمایید . از قسمت اموزش و دانلود میتونید برنامه های دیگه ای رو ببینید.
راه حل 3: از پشتیبانی درخواست فایل سرتیفیکیت کنین.`,
  ],
  [
    "(Windows) سرور ها ایمپورت نمیشن",
    `راه حل 1: مطمئن باشید که گزینه مربوط به سابزکریپشن رو انتخاب کردین
راه حل 2: مطمئن باشین که لینک رو درست کپی کردین و هیچ کارکتر یا جای خالی اضافی رو کپی نکرده باشین.
راه حل 3: مطمئن باشید که آخر لینک اشتراکتون با sub=3 به اتمام رسیده باشه.
راه حل 4: مطمئن باشین که vpn روشن نداشته باشین.`,
  ],
  [
    "(Windows) وصل میشه ولی کار نمیکنه",
    `راه حل 1: سرور هایی که TJ دارن داخل اسمشون رو تست کنید .
راه حل 2: برنامه های دیگه ای رو تست کنید. از قسمت اموزش و دانلود میتونید برنامه های دیگه ای رو ببینید
راه حل 3: نوع کانکشن رو روی global یا سراسری قرار بدین و چک کنید.
راه حل 4: پروفایل خودتون رو یک بار آپدیت کنید.`,
  ],
  [
    "(Windows) سرورها پینگ نمیدن",
    `راه حل 1: با اینترنت دیگه ای تست بفرمایید
راه حل 2: لینک اشتراک رو پاک کنید و مجدد اضافه کنید.
راه حل 3: زمان و حجم باقی مانده حسابتون رو چک بفرمایید.
راه حل 4: مطمئن باشین که با دستگاه دیگه ای به اشتراکتون وصل نیستید.`,
  ],
  [
    "(Windows) L2tp تند تند قطع میشه",
    `راه حل 1: مطمئن باشید که به vpn  دیگه ای وصل نباشید
راه حل 2: برنامه های دیگه ای رو تست بفرمایید . از قسمت اموزش و دانلود میتونید برنامه های دیگه ای رو ببینید.
راه حل 3: از پشتیبانی درخواست فایل سرتیفیکیت کنین.`,
  ],
];




const diagnosisText = "از منو انتخاب کنید:";
const faqText = "از منو انتخاب کنید:";

const selectTutorialType = "نوع آموزش مد نظر را انتخاب کنید:";
const selectDownloadType = "نوع را انتخاب کنید:";
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

// =================> downloads
// WindowsDownloads
bot.callbackQuery("WindowsDownloads", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(selectDownloadType, { reply_markup: windowsDownloadsKeyboard });
});
bot.callbackQuery("WindowsDownloads-EZvpn", async (ctx) => {
  await ctx.reply(
    `نام برنامه: EZvpn
لینک دانلود برنامه:
http://dl.ezvpn.co/downloads/windows/EZvpn.exe`
  );
  await ctx.answerCallbackQuery();
});
bot.callbackQuery("WindowsDownloads-v2rayN", async (ctx) => {
  await ctx.reply(
    `نام برنامه: v2rayN
لینک دانلود برنامه:
http://dl.ezvpn.co/downloads/windows/v2rayN.zip`
  );
  await ctx.answerCallbackQuery();
});
// macOSDownloads
bot.callbackQuery("macOSDownloads", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(selectDownloadType, { reply_markup: macOSDownloadsKeyboard });
});
// =================> downloads

// =================> tutorials
// AgentPanelTutorials
bot.callbackQuery("AgentPanelTutorials", async (ctx) => {
  await ctx.answerCallbackQuery();
});
// AndroidTutorials
bot.callbackQuery("AndroidTutorials", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(selectTutorialType, { reply_markup: androidTutorialsKeyboard });
});
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
bot.callbackQuery("iOSTutorials", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(selectTutorialType, { reply_markup: iOSTutorialsKeyboard });
});
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
bot.callbackQuery("WindowsTutorials", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(selectTutorialType, { reply_markup: windowsTutorialsKeyboard });
});
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
// macOSTutorials
bot.callbackQuery("macOSTutorials", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(selectTutorialType, { reply_markup: macOSTutorialsKeyboard });
});
// =================> tutorials

// =================> diagnosis
// diagnosis
bot.callbackQuery("diagnosis", async (ctx) => {
  await ctx.answerCallbackQuery();
  const diagnosisKeyboard = new InlineKeyboard();
  diagnosisList.map((v, index) => {
    diagnosisKeyboard.text(v[0], "diagnosis-" + (index + 1)).row();
  });
  diagnosisKeyboard.text("صفحه اصلی", "mainMenu");
  await ctx.editMessageText(diagnosisText, { reply_markup: diagnosisKeyboard });
});
// diagnosis answer
bot.callbackQuery(/(diagnosis-)\d{1,3}/g, async (ctx) => {
  await ctx.answerCallbackQuery();
  const q = parseInt(ctx.match.toString().replace("diagnosis-", "")) - 1;
  await ctx.reply(diagnosisList[q][1]);
});
// =================> diagnosis

// =================> faq
// faq
bot.callbackQuery("faq", async (ctx) => {
  await ctx.answerCallbackQuery();
  const faqKeyboard = new InlineKeyboard();
  faqList.map((v, index) => {
    faqKeyboard.text(v[0], "faq-" + (index + 1)).row();
  });
  faqKeyboard.text("صفحه اصلی", "mainMenu");
  await ctx.editMessageText(faqText, { reply_markup: faqKeyboard });
});
// faq answer
bot.callbackQuery(/(faq-)\d{1,3}/g, async (ctx) => {
  await ctx.answerCallbackQuery();
  const q = parseInt(ctx.match.toString().replace("faq-", "")) - 1;
  await ctx.reply(faqList[q][1]);
});
// =================> faq

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
