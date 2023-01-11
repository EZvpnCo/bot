import { Bot, InlineKeyboard, InputFile } from "grammy";
import { MyBot } from "./bot";

const Downloads = (bot: MyBot) => {
    // text
    const text = "پلتفورم مدنظر را انتخاب کنید:";

    // keyboard
    const keyboard = new InlineKeyboard()
        .text("Android", "downloads:android")
        .text("iOS", "downloads:ios")
        .row()
        .text("Windows", "downloads:windows")
        .text("macOS", "downloads:macos")
        .row()
        .text("صفحه اصلی 🏠", "mainMenu");

    // Handle the /downloads command.
    bot.command("downloads", (ctx) => {
        ctx.reply(text, { reply_markup: keyboard });
    });

    // downloads
    bot.callbackQuery("downloads", async (ctx) => {
        await ctx.editMessageText(text, { reply_markup: keyboard });
        await ctx.answerCallbackQuery();
    });

    // ========> sub menu
    AndroidDownload(bot)
    IOSDownload(bot)
    WindowsDownload(bot)
    MacOSDownload(bot)
};

export default Downloads;



const AndroidDownload = (bot: MyBot) => {
    const text = "اپلیکیشن مدنظر را انتخاب کنید:";

    // ===> android
    const keyboard = new InlineKeyboard()
        .text("Surfboard", "downloads:android:surfboard")
        .text("OneClick", "downloads:android:oneclick")
        .row()
        .text("OpenVPN", "downloads:android:openvpn")
        .row()
        .text("برگشت ↪️", "downloads")
        .text("صفحه اصلی 🏠", "mainMenu");
    bot.callbackQuery("downloads:android", async (ctx) => {
        await ctx.editMessageText(text, { reply_markup: keyboard });
        await ctx.answerCallbackQuery();
    });

    // ===> android:surfboard
    const android_surfboard_file = new InputFile({ url: "http://dl.ezvpn.co/downloads/android/Surfboard.apk" });
    const android_surfboard_keyboard = new InlineKeyboard()
        .url('دانلود از Play Store', 'https://play.google.com/store/apps/details?id=com.getsurfboard')
        .row()
        .url('دانلود از EZvpn', 'http://dl.ezvpn.co/downloads/android/Surfboard.apk')
    bot.callbackQuery("downloads:android:surfboard", async (ctx) => {
        const text = `🎲 نام برنامه: Surfboard`
        await ctx.replyWithDocument(android_surfboard_file, { caption: text, reply_markup: android_surfboard_keyboard });
        await ctx.answerCallbackQuery();
    });

    // ===> android:oneclick
    const android_oneclick_file = new InputFile({ url: "http://dl.ezvpn.co/downloads/android/OneClick.apk" });
    const android_oneclick_keyboard = new InlineKeyboard()
        .url('دانلود از Play Store', 'https://play.google.com/store/apps/details?id=earth.oneclick')
        .row()
        .url('دانلود از EZvpn', 'http://dl.ezvpn.co/downloads/android/OneClick.apk')
    bot.callbackQuery("downloads:android:oneclick", async (ctx) => {
        const text = `🎲 نام برنامه: One Click`
        await ctx.replyWithDocument(android_oneclick_file, { caption: text, reply_markup: android_oneclick_keyboard });
        await ctx.answerCallbackQuery();
    });

    // ===> android:openvpn
    const android_openvpn_file = new InputFile({ url: "http://dl.ezvpn.co/downloads/android/OpenVPN.apk" });
    const android_openvpn_keyboard = new InlineKeyboard()
        .url('دانلود از Play Store', 'https://play.google.com/store/apps/details?id=net.openvpn.openvpn')
        .row()
        .url('دانلود از EZvpn', 'http://dl.ezvpn.co/downloads/android/OpenVPN.apk')
    bot.callbackQuery("downloads:android:openvpn", async (ctx) => {
        const text = `🎲 نام برنامه: One Click`
        await ctx.replyWithDocument(android_openvpn_file, { caption: text, reply_markup: android_openvpn_keyboard });
        await ctx.answerCallbackQuery();
    });
}



const IOSDownload = (bot: MyBot) => {
    const text = "اپلیکیشن مدنظر را انتخاب کنید:";

    // ===> ios
    const keyboard = new InlineKeyboard()
        .text("OneClick", "downloads:ios:oneclick")
        .row()
        .text("برگشت ↪️", "downloads")
        .text("صفحه اصلی 🏠", "mainMenu");
    bot.callbackQuery("downloads:ios", async (ctx) => {
        await ctx.editMessageText(text, { reply_markup: keyboard });
        await ctx.answerCallbackQuery();
    });

    // ===> ios:oneclick
    const ios_oneclick_keyboard = new InlineKeyboard()
        .url('دانلود از App Store', 'https://apps.apple.com/us/app/oneclick-safe-easy-fast/id1545555197')
    bot.callbackQuery("downloads:ios:oneclick", async (ctx) => {
        const text = `🎲 نام برنامه: One Click`
        await ctx.reply(text, { reply_markup: ios_oneclick_keyboard });
        await ctx.answerCallbackQuery();
    });
}


const WindowsDownload = (bot: MyBot) => {
    const text = "اپلیکیشن مدنظر را انتخاب کنید:";

    // ===> windows
    const keyboard = new InlineKeyboard()
        .text("EZvpn", "downloads:windows:ezvpn")
        .text("v2rayN", "downloads:windows:v2rayn")
        .row()
        .text("برگشت ↪️", "downloads")
        .text("صفحه اصلی 🏠", "mainMenu");
    bot.callbackQuery("downloads:windows", async (ctx) => {
        await ctx.editMessageText(text, { reply_markup: keyboard });
        await ctx.answerCallbackQuery();
    });

    // ===> windows:ezvpn
    const windows_ezvpn_keyboard = new InlineKeyboard()
        .url('دانلود از EZvpn', 'http://dl.ezvpn.co/downloads/windows/EZvpn.exe')
    bot.callbackQuery("downloads:windows:ezvpn", async (ctx) => {
        const text = `🎲 نام برنامه: EZvpn`
        await ctx.reply(text, { reply_markup: windows_ezvpn_keyboard });
        await ctx.answerCallbackQuery();
    });
    // ===> windows:v2rayn
    const windows_v2rayn_keyboard = new InlineKeyboard()
        .url('دانلود از EZvpn', 'http://dl.ezvpn.co/downloads/windows/v2rayN.zip')
    bot.callbackQuery("downloads:windows:v2rayn", async (ctx) => {
        const text = `🎲 نام برنامه: v2rayN`
        await ctx.reply(text, { reply_markup: windows_v2rayn_keyboard });
        await ctx.answerCallbackQuery();
    });
}


const MacOSDownload = (bot: MyBot) => {
    const text = "اپلیکیشن مدنظر را انتخاب کنید:";

    // ===> macos
    const keyboard = new InlineKeyboard()
        .text("برگشت ↪️", "downloads")
        .text("صفحه اصلی 🏠", "mainMenu");
    bot.callbackQuery("downloads:macos", async (ctx) => {
        await ctx.editMessageText(text, { reply_markup: keyboard });
        await ctx.answerCallbackQuery();
    });
}
