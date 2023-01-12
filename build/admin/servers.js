"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const moment_1 = __importDefault(require("moment"));
const countries = __importStar(require("i18n-iso-countries"));
const getFlagEmoji = (country) => {
    return config_1.flagCountryList[country] || 'bug';
};
const tempServers = [];
const addTempServer = (server) => {
    tempServers.push(server);
    return tempServers.length - 1;
};
const getTempServer = (id) => {
    return tempServers[id];
};
const removeTempServer = (id) => {
    tempServers[id] = null;
};
const serversList = [
    {
        id: 1,
        name: "Bahrain-01",
        description: "description",
        ip: "38.54.2.172",
        username: "ubuntu",
        password: "(C[3Sz{WB8",
        port: 22,
        created: (0, moment_1.default)("2022-12-28 12:45:44").toDate(),
        country: "Bahrain",
        flag: "flag_bahrain",
        iso: "bh",
        domain: "bh01.ezvpn.co",
        deleted: false,
    }
];
const createServer = (server) => __awaiter(void 0, void 0, void 0, function* () {
    server.created = (0, moment_1.default)().toDate();
    server.id = serversList[serversList.length - 1].id + 1;
    serversList.push(server);
});
const getServer = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    return serversList.filter(({ id }) => id == _id)[0];
});
const ManagementServers = (bot) => {
    // ==================================================================================> servers list
    const genServersListKeyboard = (ctx) => {
        const keyboard = new grammy_1.InlineKeyboard();
        serversList.forEach((v, i) => {
            keyboard
                .text(v.name + ctx.emoji ` ${v.flag}`, "management:servers:" + v.id)
                .row();
        });
        keyboard
            .switchInlineCurrent("➕ افزودن سرور جدید", "management:servers:add:\nGermany-07\n38.54.2.172\nusername\npassword\nDescription")
            .row()
            .text("↪️", "management")
            .text("🔄", "management:servers")
            .text("🏠", "mainMenu");
        return keyboard;
    };
    bot.callbackQuery("management:servers", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const _text = `📡 مدیریت سرورها\nتعداد: ${serversList.length}`;
            const _keyboard = genServersListKeyboard(ctx);
            yield ctx.editMessageText(_text, { reply_markup: _keyboard });
            yield ctx.answerCallbackQuery();
        }
        catch (error) {
            console.log(error);
        }
    }));
    // ==================================================================================> manage a server
    bot.callbackQuery(/^management:servers:([0-9]+)$/, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(ctx.match[1]);
        const server = yield getServer(id);
        if (!server) {
            yield ctx.answerCallbackQuery("خطا در یافتن اطلاعات");
            return;
        }
        const _text = ctx.emoji `${server.flag}` + ` <b>${server.name}</b>
<b>IP:</b> <code>${server.ip}</code>
<b>Username:</b> <code>${server.username}</code>
<b>Password:</b> <code>${server.password}</code>
<b>Port:</b> <code>${server.port}</code>
<b>Domain:</b> <code>${server.domain}</code>
<b>Created:</b> <code>${(0, moment_1.default)(server.created).format("YYYY-MM-DD HH:mm:ss")}</code>

__ <pre>${server.description}</pre>`;
        const _keyboard = new grammy_1.InlineKeyboard()
            .text("❌ Delete", "management:servers:" + id + ":delete")
            .text("💤 Inactive", "management:servers:" + id + ":inactive")
            .row()
            .text("🕹 Connect SSH", "management:servers:" + id + ":ssh")
            .row()
            .text("✏️ ip", "management:servers:" + id + ":edit:ip")
            .text("✏️ user", "management:servers:" + id + ":edit:user")
            .text("✏️ pswd", "management:servers:" + id + ":edit:pswd")
            .row()
            .text("✏️ dmin", "management:servers:" + id + ":edit:dmin")
            .text("✏️ port", "management:servers:" + id + ":edit:port")
            .text("✏️ dscp", "management:servers:" + id + ":edit:dscp")
            .row()
            .text("Install XrayR", "management:servers:" + id + ":xrayr:install")
            .row()
            .text("Config XrayR", "management:servers:" + id + ":xrayr:config")
            .row()
            .text("Restart XrayR", "management:servers:" + id + ":xrayr:restart")
            .row()
            .text("↪️", "management:servers")
            .text("🏠", "mainMenu")
            .text("🎛", "management");
        yield ctx.editMessageText(_text, { reply_markup: _keyboard, parse_mode: "HTML", });
        yield ctx.answerCallbackQuery();
    }));
    // =========================================================================================> add server
    const extractServer = (match) => {
        const code = match[2];
        const iso = countries.getAlpha2Code(match[1], "en").toLowerCase();
        const domain = iso + code + ".ezvpn.co";
        const country = match[1];
        const name = match[1] + "-" + code;
        let flag = getFlagEmoji(country.toLowerCase());
        const server = {
            id: null,
            name,
            description: match[6],
            created: null,
            country,
            ip: match[3],
            username: match[4],
            password: match[5],
            domain,
            flag,
            iso,
            deleted: false,
            port: 22
        };
        return server;
    };
    bot.inlineQuery(/^management:servers:add:\n(.*)-(.*)\n(.*)\n(.*)\n(.*)\n(.*)$/, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const server = extractServer(ctx.match);
            const _text = ctx.emoji `${server.flag}` + ` <b>${server.name}</b>
<code>${server.username}@${server.ip} -p ${server.port}</code>
<b>Password:</b> <span class="tg-spoiler">${server.password}</span>
${server.country} | ${server.iso}
<b>Domain:</b> <code>${server.domain}</code>
<pre>${server.description}</pre>
========================
<span class="tg-spoiler">${ctx.inlineQuery.query.replace(/(\r\n|\n|\r)/gm, ";;")}</span>
`;
            yield ctx.answerInlineQuery([
                {
                    type: "article",
                    id: server.name.toLowerCase(),
                    title: server.name,
                    input_message_content: {
                        message_text: _text,
                        parse_mode: "HTML",
                    },
                    url: server.domain,
                    description: `${server.username}@${server.ip} -p ${server.port} \n` + ctx.emoji `${server.flag}` + ` ${server.country} | ${server.iso}`,
                },
            ], { cache_time: 0, });
        }
        catch (e) {
            console.log(e);
        }
    }));
    bot.hears(/management:servers:add:;;(.*)-(.*);;(.*);;(.*);;(.*);;(.*)$/, (ctx, _next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (!((_a = ctx === null || ctx === void 0 ? void 0 : ctx.message) === null || _a === void 0 ? void 0 : _a.via_bot))
            return _next();
        else {
            const server = extractServer(ctx.match);
            const tempID = addTempServer(server);
            const bellow_keyboard = new grammy_1.InlineKeyboard()
                .text("✅ تایید", "management:servers:add:confirm:" + tempID)
                .text("❌ لغو", "management:servers:add:cancel:" + tempID);
            const cttx = yield ctx.reply("تایید می کنید؟", { reply_markup: bellow_keyboard, reply_to_message_id: ctx.message.message_id });
            setTimeout(() => {
                const server = getTempServer(tempID);
                if (server) {
                    const bellow_keyboard = new grammy_1.InlineKeyboard().text("❌ لغو شد");
                    ctx.api.editMessageReplyMarkup(cttx.chat.id, cttx.message_id, { reply_markup: bellow_keyboard });
                    removeTempServer(tempID);
                }
            }, 5000);
        }
    }));
    bot.callbackQuery(/^management:servers:add:confirm:([0-9]+)$/, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("%%%", ctx.match);
        const tempID = parseInt(ctx.match[1]);
        const server = getTempServer(tempID);
        if (!server) {
            yield ctx.answerCallbackQuery("خطا در یافتن اطلاعات");
            return;
        }
        removeTempServer(tempID);
        yield createServer(server);
        const keys = new grammy_1.InlineKeyboard().text("✅ ثبت شد");
        yield ctx.editMessageReplyMarkup({ reply_markup: keys });
        yield ctx.answerCallbackQuery(server.name + " ✅ ثبت شد");
    }));
    bot.callbackQuery(/^management:servers:add:cancel:([0-9]+)$/, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const tempID = parseInt(ctx.match[1]);
        const server = getTempServer(tempID);
        if (!server) {
            yield ctx.answerCallbackQuery("خطا در یافتن اطلاعات");
            return;
        }
        removeTempServer(tempID);
        const keys = new grammy_1.InlineKeyboard().text("❌ لغو شد");
        yield ctx.editMessageReplyMarkup({ reply_markup: keys });
        yield ctx.answerCallbackQuery(server.name + " ❌ لغو شد");
    }));
};
exports.default = ManagementServers;
