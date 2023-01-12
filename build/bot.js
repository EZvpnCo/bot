"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const config_1 = require("./config");
const admin_1 = __importDefault(require("./admin"));
const diagnosis_1 = __importDefault(require("./diagnosis"));
const downloads_1 = __importDefault(require("./downloads"));
const faq_1 = __importDefault(require("./faq"));
const mainMenu_1 = __importDefault(require("./mainMenu"));
const pingpong_1 = __importDefault(require("./pingpong"));
const prices_1 = __importDefault(require("./prices"));
const servers_1 = __importDefault(require("./servers"));
const tutorials_1 = __importDefault(require("./tutorials"));
const emoji_1 = require("@grammyjs/emoji");
const bot = new grammy_1.Bot(config_1.BotToken);
bot.use((0, emoji_1.emojiParser)());
(0, mainMenu_1.default)(bot);
(0, prices_1.default)(bot);
(0, downloads_1.default)(bot);
(0, tutorials_1.default)(bot);
(0, faq_1.default)(bot);
(0, diagnosis_1.default)(bot);
(0, servers_1.default)(bot);
(0, pingpong_1.default)(bot);
(0, admin_1.default)(bot);
// Handle the /start command.
bot.command("start", (ctx) => {
    var _a;
    const text = `سلام *${(_a = ctx === null || ctx === void 0 ? void 0 : ctx.from) === null || _a === void 0 ? void 0 : _a.first_name}* عزیز\\!
به *EZvpn* خوش اومدید
جهت استفاده از ربات بر روی /menu کلیک کنید`;
    ctx.reply(text, { parse_mode: 'MarkdownV2' }).catch(e => console.log(e));
});
// Handle other messages.
bot.on("message", (ctx) => ctx.reply("میفهمم اما متوجه نمیشم :("));
bot.on("inline_query", (ctx) => ctx.answerInlineQuery([]));
bot.on("callback_query", (ctx) => ctx.answerCallbackQuery("اطلاعی ندارم :("));
// Start the bot.
bot.start();
