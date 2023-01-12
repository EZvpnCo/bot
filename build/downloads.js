"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const Downloads = (bot) => {
    // text
    const text = "پلتفورم مدنظر را انتخاب کنید:";
    // keyboard
    const keyboard = new grammy_1.InlineKeyboard()
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
    bot.callbackQuery("downloads", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        yield ctx.editMessageText(text, { reply_markup: keyboard });
        yield ctx.answerCallbackQuery();
    }));
    // ========> sub menu
    AndroidDownload(bot);
    IOSDownload(bot);
    WindowsDownload(bot);
    MacOSDownload(bot);
};
exports.default = Downloads;
const AndroidDownload = (bot) => {
    const text = "اپلیکیشن مدنظر را انتخاب کنید:";
    // ===> android
    const keyboard = new grammy_1.InlineKeyboard()
        .text("Surfboard", "downloads:android:surfboard")
        .text("OneClick", "downloads:android:oneclick")
        .row()
        .text("OpenVPN", "downloads:android:openvpn")
        .row()
        .text("برگشت ↪️", "downloads")
        .text("صفحه اصلی 🏠", "mainMenu");
    bot.callbackQuery("downloads:android", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        yield ctx.editMessageText(text, { reply_markup: keyboard });
        yield ctx.answerCallbackQuery();
    }));
    // ===> android:surfboard
    const android_surfboard_file = new grammy_1.InputFile({ url: "http://dl.ezvpn.co/downloads/android/Surfboard.apk" });
    const android_surfboard_keyboard = new grammy_1.InlineKeyboard()
        .url('دانلود از Play Store', 'https://play.google.com/store/apps/details?id=com.getsurfboard')
        .row()
        .url('دانلود از EZvpn', 'http://dl.ezvpn.co/downloads/android/Surfboard.apk');
    bot.callbackQuery("downloads:android:surfboard", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const text = `🎲 نام برنامه: Surfboard`;
        yield ctx.replyWithDocument(android_surfboard_file, { caption: text, reply_markup: android_surfboard_keyboard });
        yield ctx.answerCallbackQuery();
    }));
    // ===> android:oneclick
    const android_oneclick_file = new grammy_1.InputFile({ url: "http://dl.ezvpn.co/downloads/android/OneClick.apk" });
    const android_oneclick_keyboard = new grammy_1.InlineKeyboard()
        .url('دانلود از Play Store', 'https://play.google.com/store/apps/details?id=earth.oneclick')
        .row()
        .url('دانلود از EZvpn', 'http://dl.ezvpn.co/downloads/android/OneClick.apk');
    bot.callbackQuery("downloads:android:oneclick", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const text = `🎲 نام برنامه: One Click`;
        yield ctx.replyWithDocument(android_oneclick_file, { caption: text, reply_markup: android_oneclick_keyboard });
        yield ctx.answerCallbackQuery();
    }));
    // ===> android:openvpn
    const android_openvpn_file = new grammy_1.InputFile({ url: "http://dl.ezvpn.co/downloads/android/OpenVPN.apk" });
    const android_openvpn_keyboard = new grammy_1.InlineKeyboard()
        .url('دانلود از Play Store', 'https://play.google.com/store/apps/details?id=net.openvpn.openvpn')
        .row()
        .url('دانلود از EZvpn', 'http://dl.ezvpn.co/downloads/android/OpenVPN.apk');
    bot.callbackQuery("downloads:android:openvpn", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const text = `🎲 نام برنامه: One Click`;
        yield ctx.replyWithDocument(android_openvpn_file, { caption: text, reply_markup: android_openvpn_keyboard });
        yield ctx.answerCallbackQuery();
    }));
};
const IOSDownload = (bot) => {
    const text = "اپلیکیشن مدنظر را انتخاب کنید:";
    // ===> ios
    const keyboard = new grammy_1.InlineKeyboard()
        .text("OneClick", "downloads:ios:oneclick")
        .row()
        .text("برگشت ↪️", "downloads")
        .text("صفحه اصلی 🏠", "mainMenu");
    bot.callbackQuery("downloads:ios", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        yield ctx.editMessageText(text, { reply_markup: keyboard });
        yield ctx.answerCallbackQuery();
    }));
    // ===> ios:oneclick
    const ios_oneclick_keyboard = new grammy_1.InlineKeyboard()
        .url('دانلود از App Store', 'https://apps.apple.com/us/app/oneclick-safe-easy-fast/id1545555197');
    bot.callbackQuery("downloads:ios:oneclick", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const text = `🎲 نام برنامه: One Click`;
        yield ctx.reply(text, { reply_markup: ios_oneclick_keyboard });
        yield ctx.answerCallbackQuery();
    }));
};
const WindowsDownload = (bot) => {
    const text = "اپلیکیشن مدنظر را انتخاب کنید:";
    // ===> windows
    const keyboard = new grammy_1.InlineKeyboard()
        .text("EZvpn", "downloads:windows:ezvpn")
        .text("v2rayN", "downloads:windows:v2rayn")
        .row()
        .text("برگشت ↪️", "downloads")
        .text("صفحه اصلی 🏠", "mainMenu");
    bot.callbackQuery("downloads:windows", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        yield ctx.editMessageText(text, { reply_markup: keyboard });
        yield ctx.answerCallbackQuery();
    }));
    // ===> windows:ezvpn
    const windows_ezvpn_keyboard = new grammy_1.InlineKeyboard()
        .url('دانلود از EZvpn', 'http://dl.ezvpn.co/downloads/windows/EZvpn.exe');
    bot.callbackQuery("downloads:windows:ezvpn", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const text = `🎲 نام برنامه: EZvpn`;
        yield ctx.reply(text, { reply_markup: windows_ezvpn_keyboard });
        yield ctx.answerCallbackQuery();
    }));
    // ===> windows:v2rayn
    const windows_v2rayn_keyboard = new grammy_1.InlineKeyboard()
        .url('دانلود از EZvpn', 'http://dl.ezvpn.co/downloads/windows/v2rayN.zip');
    bot.callbackQuery("downloads:windows:v2rayn", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const text = `🎲 نام برنامه: v2rayN`;
        yield ctx.reply(text, { reply_markup: windows_v2rayn_keyboard });
        yield ctx.answerCallbackQuery();
    }));
};
const MacOSDownload = (bot) => {
    const text = "اپلیکیشن مدنظر را انتخاب کنید:";
    // ===> macos
    const keyboard = new grammy_1.InlineKeyboard()
        .text("برگشت ↪️", "downloads")
        .text("صفحه اصلی 🏠", "mainMenu");
    bot.callbackQuery("downloads:macos", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        yield ctx.editMessageText(text, { reply_markup: keyboard });
        yield ctx.answerCallbackQuery();
    }));
};
