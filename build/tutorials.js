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
const Tutorials = (bot) => {
    // text
    const text = "محتوای مدنظر را انتخاب کنید:";
    // keyboard
    const keyboard = new grammy_1.InlineKeyboard()
        .text("Agent Panel", "tutorials:agent_panel")
        .row()
        .text("Android", "tutorials:android")
        .text("iOS", "tutorials:ios")
        .row()
        .text("Windows", "tutorials:windows")
        .text("macOS", "tutorials:macos")
        .row()
        .text("صفحه اصلی 🏠", "mainMenu");
    // Handle the /tutorials command.
    bot.command("tutorials", (ctx) => {
        ctx.reply(text, { reply_markup: keyboard });
    });
    // tutorials
    bot.callbackQuery("tutorials", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        yield ctx.editMessageText(text, { reply_markup: keyboard });
        yield ctx.answerCallbackQuery();
    }));
    // ========> sub menu
    AgentPanelTutorials(bot);
    AndroidTutorials(bot);
    IOSTutorials(bot);
    WindowsTutorials(bot);
    MacOSTutorials(bot);
};
exports.default = Tutorials;
const AgentPanelTutorials = (bot) => {
    const text = "محتوای مدنظر را انتخاب کنید:";
    // ===> macos
    const keyboard = new grammy_1.InlineKeyboard()
        .text("برگشت ↪️", "tutorials")
        .text("صفحه اصلی 🏠", "mainMenu");
    bot.callbackQuery("tutorials:agent_panel", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        yield ctx.editMessageText(text, { reply_markup: keyboard });
        yield ctx.answerCallbackQuery();
    }));
};
const AndroidTutorials = (bot) => {
    const text = "محتوای مدنظر را انتخاب کنید:";
    // ===> android
    const keyboard = new grammy_1.InlineKeyboard()
        .text("Surfboard", "tutorials:android:surfboard")
        .text("OneClick", "tutorials:android:oneclick")
        .row()
        .text("L2tp", "tutorials:android:l2tp")
        .text("OpenVPN", "tutorials:android:openvpn")
        .row()
        .text("برگشت ↪️", "tutorials")
        .text("صفحه اصلی 🏠", "mainMenu");
    bot.callbackQuery("tutorials:android", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        yield ctx.editMessageText(text, { reply_markup: keyboard });
        yield ctx.answerCallbackQuery();
    }));
    const android_back_keyboard = new grammy_1.InlineKeyboard()
        .text("برگشت ↪️", "tutorials:android")
        .text("صفحه اصلی 🏠", "mainMenu");
    // ===> android:surfboard
    const android_surfboard_tutorial = "http://dl.ezvpn.co/tutorials/android/Surfboard.mp4";
    bot.callbackQuery("tutorials:android:surfboard", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const text = `Android - Surfboard\n\n${android_surfboard_tutorial}`;
        yield ctx.editMessageText(text, { reply_markup: android_back_keyboard });
        yield ctx.answerCallbackQuery();
    }));
    // ===> android:oneclick
    const android_oneclick_tutorial = "http://dl.ezvpn.co/tutorials/android/OneClick.mp4";
    bot.callbackQuery("tutorials:android:oneclick", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const text = `Android - OneClick\n\n${android_oneclick_tutorial}`;
        yield ctx.editMessageText(text, { reply_markup: android_back_keyboard });
        yield ctx.answerCallbackQuery();
    }));
    // ===> android:l2tp
    const android_l2tp_tutorial = "http://dl.ezvpn.co/tutorials/android/L2tp.mp4";
    bot.callbackQuery("tutorials:android:l2tp", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const text = `Android - L2tp\n\n${android_l2tp_tutorial}`;
        yield ctx.editMessageText(text, { reply_markup: android_back_keyboard });
        yield ctx.answerCallbackQuery();
    }));
    // ===> android:openvpn
    const android_openvpn_tutorial = "http://dl.ezvpn.co/tutorials/android/OpenVPN.mp4";
    bot.callbackQuery("tutorials:android:openvpn", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const text = `Android - OpenVPN\n\n${android_openvpn_tutorial}`;
        yield ctx.editMessageText(text, { reply_markup: android_back_keyboard });
        yield ctx.answerCallbackQuery();
    }));
};
const IOSTutorials = (bot) => {
    const text = "محتوای مدنظر را انتخاب کنید:";
    // ===> ios
    const keyboard = new grammy_1.InlineKeyboard()
        .text("OneClick", "tutorials:ios:oneclick")
        .text("L2tp", "tutorials:ios:l2tp")
        .row()
        .text("برگشت ↪️", "tutorials")
        .text("صفحه اصلی 🏠", "mainMenu");
    bot.callbackQuery("tutorials:ios", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        yield ctx.editMessageText(text, { reply_markup: keyboard });
        yield ctx.answerCallbackQuery();
    }));
    const ios_back_keyboard = new grammy_1.InlineKeyboard()
        .text("برگشت ↪️", "tutorials:ios")
        .text("صفحه اصلی 🏠", "mainMenu");
    // ===> ios:oneclick
    const ios_oneclick_tutorial = "http://dl.ezvpn.co/tutorials/ios/OneClick.mp4";
    bot.callbackQuery("tutorials:ios:oneclick", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const text = `iOS - OneClick\n\n${ios_oneclick_tutorial}`;
        yield ctx.editMessageText(text, { reply_markup: ios_back_keyboard });
        yield ctx.answerCallbackQuery();
    }));
    // ===> ios:l2tp
    const ios_l2tp_tutorial = "http://dl.ezvpn.co/tutorials/ios/L2tp.mp4";
    bot.callbackQuery("tutorials:ios:l2tp", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const text = `iOS - L2tp\n\n${ios_l2tp_tutorial}`;
        yield ctx.editMessageText(text, { reply_markup: ios_back_keyboard });
        yield ctx.answerCallbackQuery();
    }));
};
const WindowsTutorials = (bot) => {
    const text = "محتوای مدنظر را انتخاب کنید:";
    // ===> windows
    const keyboard = new grammy_1.InlineKeyboard()
        .text("EZvpn", "tutorials:windows:ezvpn")
        .text("v2rayN", "tutorials:windows:v2rayn")
        .row()
        .text("L2tp", "tutorials:windows:l2tp")
        .row()
        .text("برگشت ↪️", "tutorials")
        .text("صفحه اصلی 🏠", "mainMenu");
    bot.callbackQuery("tutorials:windows", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        yield ctx.editMessageText(text, { reply_markup: keyboard });
        yield ctx.answerCallbackQuery();
    }));
    const windows_back_keyboard = new grammy_1.InlineKeyboard()
        .text("برگشت ↪️", "tutorials:windows")
        .text("صفحه اصلی 🏠", "mainMenu");
    // ===> windows:ezvpn
    const windows_ezvpn_tutorial = "http://dl.ezvpn.co/tutorials/windows/EZvpn.mp4";
    bot.callbackQuery("tutorials:windows:ezvpn", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const text = `Windows - EZvpn\n\n${windows_ezvpn_tutorial}`;
        yield ctx.editMessageText(text, { reply_markup: windows_back_keyboard });
        yield ctx.answerCallbackQuery();
    }));
    // ===> windows:v2rayn
    const windows_v2rayn_tutorial = "http://dl.ezvpn.co/tutorials/windows/v2rayN.mp4";
    bot.callbackQuery("tutorials:windows:v2rayn", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const text = `Windows - v2rayN\n\n${windows_v2rayn_tutorial}`;
        yield ctx.editMessageText(text, { reply_markup: windows_back_keyboard });
        yield ctx.answerCallbackQuery();
    }));
    // ===> windows:l2tp
    const windows_l2tp_tutorial = "http://dl.ezvpn.co/tutorials/windows/L2tp.mp4";
    bot.callbackQuery("tutorials:windows:l2tp", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const text = `Windows - L2tp\n\n${windows_l2tp_tutorial}`;
        yield ctx.editMessageText(text, { reply_markup: windows_back_keyboard });
        yield ctx.answerCallbackQuery();
    }));
};
const MacOSTutorials = (bot) => {
    const text = "محتوای مدنظر را انتخاب کنید:";
    // ===> macos
    const keyboard = new grammy_1.InlineKeyboard()
        .text("برگشت ↪️", "tutorials")
        .text("صفحه اصلی 🏠", "mainMenu");
    bot.callbackQuery("tutorials:macos", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        yield ctx.editMessageText(text, { reply_markup: keyboard });
        yield ctx.answerCallbackQuery();
    }));
};
