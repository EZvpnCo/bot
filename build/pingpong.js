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
const PingPong = (bot) => {
    // Handle the /ping command.
    bot.command("ping", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const text = `*Pong\\!*
*ChatID:* ${ctx.chat.id}
*ChatType:* ${ctx.chat.type}
*UserID:* ${(_a = ctx === null || ctx === void 0 ? void 0 : ctx.from) === null || _a === void 0 ? void 0 : _a.id}`;
        yield ctx.reply(text, { parse_mode: 'MarkdownV2', reply_to_message_id: ctx.msg.message_id });
    }));
};
exports.default = PingPong;
