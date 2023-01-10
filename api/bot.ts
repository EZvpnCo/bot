import { Bot, InlineKeyboard, InputFile } from "grammy";

const bot = new Bot("5817494017:AAE--FH-fCndLpZzrBDg_quJxuRa29SVVzc");

// Define keyboards
const mainMenuKeyboard = new InlineKeyboard()
        .text("تعرفه ها", "prices")
        .row()
        .text("دانلود", "downloads")
        .text("آموزش ها", "tutorials")
        .row()
        .text("عیب یابی", "diagnosis")
        .text("سوالات متداول", "faq")
        .row()
        .text("لیست سرورها", "servers")
        .row()
        .url("پشتیبانی", "EZvpnAdmin.t.me")

const pricesKeyboard = new InlineKeyboard()
        .text("وب گردی", "dailyPrices")
        .row()
        .text("ترید", "tradePrices")
        .row()
        .text("گیم", "gamePrices")
        .row()
        .text("صفحه اصلی", "mainMenu")

const downloadsKeyboard = new InlineKeyboard()
        .text("Android", "AndroidDownloads")
        .row()
        .text("iOS", "iOSDownloads")
        .row()
        .text("Windows", "WindowsDownloads")
        .row()
        .text("macOS", "macOSDownloads")
        .row()
        .text("صفحه اصلی", "mainMenu")

const androidDownloadsKeyboard = new InlineKeyboard()
        .text("Surfboard", "AndroidDownloads-Surfboard")
        .row()
        .text("OneClick", "AndroidDownloads-OneClick")
        .row()
        .text("OpenVPN", "AndroidDownloads-OpenVPN")
        .row()
        .text("صفحه اصلی", "mainMenu")

const iOSDownloadsKeyboard = new InlineKeyboard()
        .text("OneClick", "iOSDownloads-OneClick")
        .row()
        .text("صفحه اصلی", "mainMenu")

const windowsDownloadsKeyboard = new InlineKeyboard()
        .text("EZvpn", "WindowsDownloads-EZvpn")
        .row()
        .text("v2rayN", "WindowsDownloads-v2rayN")
        .row()
        .text("صفحه اصلی", "mainMenu")

const macOSDownloadsKeyboard = new InlineKeyboard()
        .text("صفحه اصلی", "mainMenu")

const tutorialsKeyboard = new InlineKeyboard()
        .text("Agent Panel", "AgentPanelTutorials")
        .row()
        .text("Android", "AndroidTutorials")
        .row()
        .text("iOS", "iOSTutorials")
        .row()
        .text("Windows", "WindowsTutorials")
        .row()
        .text("macOS", "macOSTutorials")
        .row()
        .text("صفحه اصلی", "mainMenu")

const androidTutorialsKeyboard = new InlineKeyboard()
        .text("Surfboard", "AndroidTutorials-Surfboard")
        .row()
        .text("OneClick", "AndroidTutorials-OneClick")
        .row()
        .text("L2tp", "AndroidTutorials-L2tp")
        .row()
        .text("OpenVPN", "AndroidTutorials-OpenVPN")
        .row()
        .text("صفحه اصلی", "mainMenu")

const iOSTutorialsKeyboard = new InlineKeyboard()
        .text("OneClick", "iOSTutorials-OneClick")
        .row()
        .text("L2tp", "iOSTutorials-L2tp")
        .row()
        .text("صفحه اصلی", "mainMenu")

const windowsTutorialsKeyboard = new InlineKeyboard()
        .text("EZvpn", "WindowsTutorials-EZvpn")
        .row()
        .text("v2rayN", "WindowsTutorials-v2rayN")
        .row()
        .text("L2tp", "WindowsTutorials-L2tp")
        .row()
        .text("صفحه اصلی", "mainMenu")

const macOSTutorialsKeyboard = new InlineKeyboard()
        .text("صفحه اصلی", "mainMenu")

const diagnosisList = [
    [
        "عیب یابی اول",
        "متن عیب یابی اول",
    ],
    [
        "عیب یابی دوم",
        "متن عیب یابی دوم",
    ]
]

const faqList = [
    [
        "سوالات متداول اول",
        "متن سوالات متداول اول",
    ],
    [
        "سوالات متداول دوم",
        "متن سوالات متداول دوم",
    ]
]

// Define texts
const mainMenuText = 'از منوی زیر انتخاب کنید:';
const pricesText = "نوع استفاده خود را انتخاب کنید:"
const dailyPricesText = `🔻 تعرفه های پکیج Daily:

سرویس Daily:
یک کاربر، یک ماهه = 1$
پنج کاربر، یک ماهه = 4.5$
یک کاربر، سه ماهه = 3$
پنج کاربر، سه ماهه = 13.5$

سرویس +Daily:
یک کاربر، یک ماهه = 2$
پنج کاربر، یک ماهه = 9$
یک کاربر، سه ماهه = 6$
پنج کاربر، سه ماهه = 27$`
const tradePricesText = `🔻 تعرفه های پکیج Trade:

سرویس Trade:
یک کاربر، یک ماهه = 2$
پنج کاربر، یک ماهه = 9$
یک کاربر، سه ماهه = 6$
پنج کاربر، سه ماهه = 27$

سرویس +Trade:
کمپانی، یک ماهه = 65$
کمپانی (vip)، یک ماهه = 105$`
const gamePricesText = `🔻 تعرفه های پکیج Game:

سرویس Game:
یک کاربر، یک ماهه = 2$
پنج کاربر، یک ماهه = 9$
یک کاربر، سه ماهه = 6$
پنج کاربر، سه ماهه = 27$

سرویس +Game:
کلاب، یک ماهه = 65$
کلاب (vip)، یک ماهه = 105$`

const downloadsText = "پلتفورم مدنظر را انتخاب کنید:"
const tutorialsText = "پلتفورم مدنظر را انتخاب کنید:"

const diagnosisText = "از منو انتخاب کنید:"
const faqText = "از منو انتخاب کنید:"

const selectTutorialType = 'نوع آموزش مد نظر را انتخاب کنید:';
const selectDownloadType = 'نوع را انتخاب کنید:';
// **********************************************************************************


// Handle the /start command.
bot.command("start", (ctx) => {
    let text = 'سلام به *EZvpn* خوش اومدید :)';
    text += '\nجهت استفاده از ربات بر روی /menu کلیک کنید';
    ctx.reply(text)
});

// Handle the /menu command.
bot.command("menu", (ctx) => {
    ctx.reply(mainMenuText, { reply_markup: mainMenuKeyboard })
});

// mainMenu
bot.callbackQuery("mainMenu", async (ctx) => {
  await ctx.editMessageText(mainMenuText, { reply_markup: mainMenuKeyboard });
});


// =================> prices
// prices
bot.callbackQuery("prices", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(pricesText, { reply_markup: pricesKeyboard });
});
// dailyPrices
bot.callbackQuery("dailyPrices", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply(dailyPricesText);
});
// tradePrices
bot.callbackQuery("tradePrices", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply(tradePricesText);
});
// gamePrices
bot.callbackQuery("gamePrices", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply(gamePricesText);
});
// =================> prices

// =================> downloads
// downloads
bot.callbackQuery("downloads", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(downloadsText, { reply_markup: downloadsKeyboard });
});
// AndroidDownloads
bot.callbackQuery("AndroidDownloads", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(selectDownloadType, { reply_markup: androidDownloadsKeyboard });
});
bot.callbackQuery("AndroidDownloads-Surfboard", async (ctx) => {
    const caption = `نام برنامه: Surfboard
لینک دانلود برنامه(پلی استور):
https://play.google.com/store/apps/details?id=com.getsurfboard&hl=en&gl=US`
  try {
    await ctx.replyWithDocument(
      "http://dl.ezvpn.co/downloads/android/Surfboard.apk",
      { caption }
    );
  } catch(e) {
    console.log(e)
  }
  await ctx.answerCallbackQuery();
});
bot.callbackQuery("AndroidDownloads-OneClick", async (ctx) => {
  const caption = `نام برنامه: One Click
لینک دانلود برنامه(پلی استور):
https://play.google.com/store/apps/details?id=earth.oneclick&hl=en&gl=US`
  try {
    await ctx.replyWithDocument(
      "http://dl.ezvpn.co/downloads/android/OneClick.apk",
      { caption }
    );
  } catch(e) {
    console.log(e)
  }
  await ctx.answerCallbackQuery();
});
bot.callbackQuery("AndroidDownloads-OpenVPN", async (ctx) => {
    const caption = `نام برنامه: OpenVPN
لینک دانلود برنامه(پلی استور):
https://play.google.com/store/apps/details?id=net.openvpn.openvpn`
  try {
    await ctx.replyWithDocument(
      new InputFile("http://dl.ezvpn.co/downloads/android/OpenVPN.apk", "OpenVPN"),
      { caption }
    );
  } catch(e) {
    console.log(e)
  }
  await ctx.answerCallbackQuery();
});
// iOSDownloads
bot.callbackQuery("iOSDownloads", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(selectDownloadType, { reply_markup: iOSDownloadsKeyboard });
});
bot.callbackQuery("iOSDownloads-OneClick", async (ctx) => {
  await ctx.reply(`نام برنامه: One Click
لینک دانلود برنامه(اپ استور):
https://apps.apple.com/us/app/oneclick-safe-easy-fast/id1545555197`
, { disable_web_page_preview: true });
  await ctx.answerCallbackQuery();
});
// WindowsDownloads
bot.callbackQuery("WindowsDownloads", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(selectDownloadType, { reply_markup: windowsDownloadsKeyboard });
});
bot.callbackQuery("WindowsDownloads-EZvpn", async (ctx) => {
  try {
    await ctx.replyWithDocument(
      "http://dl.ezvpn.co/downloads/windows/EZvpn.exe",
      { caption: `نام برنامه: EZvpn` }
    );
  } catch(e) {
    console.log(e)
  }
  await ctx.answerCallbackQuery();
});
bot.callbackQuery("WindowsDownloads-v2rayN", async (ctx) => {
  try {
    await ctx.replyWithDocument(
      "http://dl.ezvpn.co/downloads/windows/v2rayN.zip",
      { caption: `نام برنامه: v2rayN` }
    );
  } catch(e) {
    console.log(e)
  }
  await ctx.answerCallbackQuery();
});
// macOSDownloads
bot.callbackQuery("macOSDownloads", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(selectDownloadType, { reply_markup: macOSDownloadsKeyboard });
});
// =================> downloads

// =================> tutorials
// tutorials
bot.callbackQuery("tutorials", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(tutorialsText, { reply_markup: tutorialsKeyboard });
});
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
    await ctx.replyWithVideo(
      "http://dl.ezvpn.co/tutorials/android/Surfboard.mp4",
      { caption: "Android - Surfboard" }
    );
  } catch(e) {
    console.log(e)
  }
  await ctx.answerCallbackQuery();
});
bot.callbackQuery("AndroidTutorials-OneClick", async (ctx) => {
  try {
    await ctx.replyWithVideo(
      "http://dl.ezvpn.co/tutorials/android/OneClick.mp4",
      { caption: "Android - OneClick" }
    );
  } catch(e) {
    console.log(e)
  }
  await ctx.answerCallbackQuery();
});
bot.callbackQuery("AndroidTutorials-L2tp", async (ctx) => {
  try {
    await ctx.replyWithVideo(
      "http://dl.ezvpn.co/tutorials/android/L2tp.mp4",
      { caption: "Android - L2tp" }
    );
  } catch(e) {
    console.log(e)
  }
  await ctx.answerCallbackQuery();
});
bot.callbackQuery("AndroidTutorials-OpenVPN", async (ctx) => {
  try {
    await ctx.replyWithVideo(
      "http://dl.ezvpn.co/tutorials/android/OpenVPN.mp4",
      { caption: "Android - OpenVPN" }
    );
  } catch(e) {
    console.log(e)
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
    await ctx.replyWithVideo(
      "http://dl.ezvpn.co/tutorials/ios/OneClick.mp4",
      { caption: "iOS - OneClick" }
    );
  } catch(e) {
    console.log(e)
  }
  await ctx.answerCallbackQuery();
});
bot.callbackQuery("iOSTutorials-L2tp", async (ctx) => {
  try {
    await ctx.replyWithVideo(
      "http://dl.ezvpn.co/tutorials/ios/L2tp.mp4",
      { caption: "iOS - L2tp" }
    );
  } catch(e) {
    console.log(e)
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
    await ctx.replyWithVideo(
      "http://dl.ezvpn.co/tutorials/windows/EZvpn.mp4",
      { caption: "Windows - EZvpn" }
    );
  } catch(e) {
    console.log(e)
  }
  await ctx.answerCallbackQuery();
});
bot.callbackQuery("WindowsTutorials-v2rayN", async (ctx) => {
  try {
    await ctx.replyWithVideo(
      "http://dl.ezvpn.co/tutorials/windows/v2rayN.mp4",
      { caption: "Windows - v2rayN" }
    );
  } catch(e) {
    console.log(e)
  }
  await ctx.answerCallbackQuery();
});
bot.callbackQuery("WindowsTutorials-L2tp", async (ctx) => {
  try {
    await ctx.replyWithVideo(
      "http://dl.ezvpn.co/tutorials/windows/L2tp.mp4",
      { caption: "Windows - L2tp" }
    );
  } catch(e) {
    console.log(e)
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
  const diagnosisKeyboard = new InlineKeyboard()
  diagnosisList.map((v, index) => {
    diagnosisKeyboard.text(v[0], 'diagnosis-' + (index+1)).row()
  })
  diagnosisKeyboard.text("صفحه اصلی", "mainMenu")
  await ctx.editMessageText(diagnosisText, { reply_markup: diagnosisKeyboard });
});
// diagnosis answer
bot.callbackQuery(/(diagnosis-)\d{1,3}/g, async (ctx) => {
  await ctx.answerCallbackQuery();
  const q = parseInt(ctx.match.toString().replace("diagnosis-", "")) - 1
  await ctx.reply(diagnosisList[q][1]);
});
// =================> diagnosis

// =================> faq
// faq
bot.callbackQuery("faq", async (ctx) => {
  await ctx.answerCallbackQuery();
  const faqKeyboard = new InlineKeyboard()
  faqList.map((v, index) => {
    faqKeyboard.text(v[0], 'faq-' + (index+1)).row()
  })
  faqKeyboard.text("صفحه اصلی", "mainMenu")
  await ctx.editMessageText(faqText, { reply_markup: faqKeyboard });
});
// faq answer
bot.callbackQuery(/(faq-)\d{1,3}/g, async (ctx) => {
  await ctx.answerCallbackQuery();
  const q = parseInt(ctx.match.toString().replace("faq-", "")) - 1
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