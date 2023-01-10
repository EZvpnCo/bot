import { Bot, InlineKeyboard, InputFile } from "grammy";

const Downloads = (bot: Bot) => {
    // text
    const text = "پلتفورم مدنظر را انتخاب کنید:";

    // keyboard
    const keyboard = new InlineKeyboard()
        .text("Android", "downloads:android")
        .text("iOS", "downloads:ios")
        .row()
        .text("Windows", "downloads:windows")
        .text("macOS", "downloads:mac")
        .row()
        .text("صفحه اصلی", "mainMenu");

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
    const subText = "اپلیکیشن مدنظر را انتخاب کنید:";

    // ===> android
    const android_keyboard = new InlineKeyboard()
        .text("Surfboard", "downloads:android:surfboard")
        .text("OneClick", "downloads:android:oneclick")
        .row()
        .text("OpenVPN", "downloads:android:openvpn")
        .row()
        .text("برگشت", "downloads")
        .text("صفحه اصلی", "mainMenu");
    bot.callbackQuery("downloads:android", async (ctx) => {
        await ctx.editMessageText(subText, { reply_markup: android_keyboard });
        await ctx.answerCallbackQuery();
    });

    // ===> android:surfboard
    const android_surfboard_keyboard = new InlineKeyboard()
        .url('دانلود از Play Store', 'https://play.google.com/store/apps/details?id=com.getsurfboard')
        .row()
        .url('دانلود از EZvpn', 'http://dl.ezvpn.co/downloads/android/Surfboard.apk')
    const android_surfboard_file = new InputFile({ url: "http://dl.ezvpn.co/downloads/android/Surfboard.apk" });
    bot.callbackQuery("downloads:android:surfboard", async (ctx) => {
        const text = `🎲 نام برنامه: Surfboard`
        await ctx.replyWithDocument(android_surfboard_file, { caption: text, reply_markup: android_surfboard_keyboard });
        await ctx.answerCallbackQuery();
    });
    // ===> android:oneclick
    const android_oneclick_keyboard = new InlineKeyboard()
        .url('دانلود از Play Store', 'https://play.google.com/store/apps/details?id=earth.oneclick')
        .row()
        .url('دانلود از EZvpn', 'http://dl.ezvpn.co/downloads/android/OneClick.apk')
    const android_oneclick_file = new InputFile({ url: "http://dl.ezvpn.co/downloads/android/OneClick.apk" });
    bot.callbackQuery("downloads:android:oneclick", async (ctx) => {
        const text = `🎲 نام برنامه: One Click`
        await ctx.replyWithDocument(android_oneclick_file, { caption: text, reply_markup: android_oneclick_keyboard });
        await ctx.answerCallbackQuery();
    });
    // ===> android:openvpn
    const android_openvpn_keyboard = new InlineKeyboard()
        .url('دانلود از Play Store', 'https://play.google.com/store/apps/details?id=net.openvpn.openvpn')
        .row()
        .url('دانلود از EZvpn', 'http://dl.ezvpn.co/downloads/android/OpenVPN.apk')
    const android_openvpn_file = new InputFile({ url: "http://dl.ezvpn.co/downloads/android/OpenVPN.apk" });
    bot.callbackQuery("downloads:android:openvpn", async (ctx) => {
        const text = `🎲 نام برنامه: One Click`
        await ctx.replyWithDocument(android_openvpn_file, { caption: text, reply_markup: android_openvpn_keyboard });
        await ctx.answerCallbackQuery();
    });


};

export default Downloads;
