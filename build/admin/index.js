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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const config_1 = require("../config");
const servers_1 = __importDefault(require("./servers"));
const Admin = (bot) => {
    const keyboard = new grammy_1.InlineKeyboard()
        .text("📟 نودها", "management:nodes")
        .text("📡 سرورها", "management:servers")
        .row()
        .text("👥 کاربران", "management:users")
        .row()
        .text("صفحه اصلی 🏠", "mainMenu");
    bot.callbackQuery(/(management.*)/g, (ctx, _next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (!config_1.Admins.includes((_a = ctx === null || ctx === void 0 ? void 0 : ctx.from) === null || _a === void 0 ? void 0 : _a.id)) {
            const _text = `شما دسترسی های لازم رو نداری 🚫`;
            yield ctx.answerCallbackQuery(_text);
        }
        else {
            return _next();
        }
    }));
    bot.inlineQuery(/(management.*)/g, (ctx, _next) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        if (!config_1.Admins.includes((_b = ctx === null || ctx === void 0 ? void 0 : ctx.from) === null || _b === void 0 ? void 0 : _b.id)) {
            yield ctx.answerInlineQuery([]);
        }
        else {
            return _next();
        }
    }));
    bot.callbackQuery("management", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        let _text, _keyboard;
        _text = `به بخش مدیریت خوش اومدی\nچیکار میتونم انجام بدم برات؟`;
        _keyboard = keyboard;
        yield ctx.editMessageText(_text, { reply_markup: _keyboard });
        yield ctx.answerCallbackQuery();
    }));
    (0, servers_1.default)(bot);
};
exports.default = Admin;
