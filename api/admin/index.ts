import { EmojiFlavor } from "@grammyjs/emoji";
import { Bot, Context, InlineKeyboard, } from "grammy";
import { MyBot } from "../bot";
import { Admins as admins } from "../config";
import ManagementServers from "./servers";

const Admin = (bot: MyBot) => {

    const keyboard = new InlineKeyboard()
        .text("📟 نودها", "management:nodes")
        .text("📡 سرورها", "management:servers")
        .row()
        .text("👥 کاربران", "management:users")
        .row()
        .text("صفحه اصلی 🏠", "mainMenu")


    bot.callbackQuery(/(management.*)/g, async (ctx, _next) => {
        if (!admins.includes(ctx?.from?.id!)) {
            const _text = `شما دسترسی های لازم رو نداری 🚫`
            await ctx.answerCallbackQuery(_text);
        }
        else {
            return _next();
        }
    })

    bot.inlineQuery(/(management.*)/g, async (ctx, _next) => {
        if (!admins.includes(ctx?.from?.id!)) {
            await ctx.answerInlineQuery([])
        }
        else {
            return _next();
        }
    })

    bot.hears(/(management.*)/g, async (ctx, _next) => {
        if (!admins.includes(ctx?.from?.id!)) {
            const _text = `شما دسترسی های لازم رو نداری 🚫`
            await ctx.reply(_text, { reply_to_message_id: ctx.message?.message_id })
        }
        else {
            return _next();
        }
    })

    bot.callbackQuery("management", async (ctx) => {
        let _text, _keyboard

        _text = `به بخش مدیریت خوش اومدی\nچیکار میتونم انجام بدم برات؟`
        _keyboard = keyboard

        await ctx.editMessageText(_text, { reply_markup: _keyboard });
        await ctx.answerCallbackQuery();
    })


    ManagementServers(bot);
};

export default Admin;
