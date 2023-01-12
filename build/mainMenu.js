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
const config_1 = require("./config");
const MainMenu = (bot) => {
    // text
    const text = "🔻 از منوی زیر انتخاب کنید:";
    // keyboard
    const genKeyboard = (ctx) => {
        var _a;
        const keyboard = new grammy_1.InlineKeyboard()
            .text("💰 تعرفه‌ها", "prices")
            .row()
            .text("📥 مرکز دانلود", "downloads")
            .text("📚 بخش آموزش", "tutorials")
            .row()
            .text("⚙️ عیب‌یابی", "diagnosis")
            .text("❓سوالات متداول", "faq")
            .row()
            .text("🖥 سرورها", "servers")
            .row()
            .url("💬 پشتیبانی", "EZvpnAdmin.t.me")
            .row()
            .text("🕹 حساب من", "myaccount");
        if (config_1.Admins.includes((_a = ctx === null || ctx === void 0 ? void 0 : ctx.from) === null || _a === void 0 ? void 0 : _a.id))
            keyboard.text("🎛 مدیریت", "management");
        return keyboard;
    };
    // Handle the /menu command.
    bot.command("menu", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        yield ctx.reply(text, { reply_markup: genKeyboard(ctx) });
    }));
    // mainMenu
    bot.callbackQuery("mainMenu", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        yield ctx.editMessageText(text, { reply_markup: genKeyboard(ctx) });
        yield ctx.answerCallbackQuery();
    }));
};
exports.default = MainMenu;
