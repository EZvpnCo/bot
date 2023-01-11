import { EmojiFlavor } from "@grammyjs/emoji";
import { Bot, Context, InlineKeyboard, } from "grammy";
import { MyBot } from "../bot";
import { Admins as admins } from "../config";
import AdminServers from "./servers";

const Admin = (bot: MyBot) => {

    const keyboard = new InlineKeyboard()
        .text("📟 نودها", "management:nodes")
        .text("📡 سرورها", "management:servers")
        .row()
        .text("👥 کاربران", "management:users")
        .row()
        .text("صفحه اصلی 🏠", "mainMenu")


    bot.callbackQuery("management", async (ctx) => {
        let _text, _keyboard
        if (!admins.includes(ctx?.from?.id!)) {
            _text = `شما دسترسی های لازم رو نداری 🚫`
        }
        else {
            _text = `به بخش مدیریت خوش اومدی\nچیکار میتونم انجام بدم برات؟`
            _keyboard = keyboard
        }
        await ctx.editMessageText(_text, { reply_markup: _keyboard });
        await ctx.answerCallbackQuery();
    });

    AdminServers(bot);


};

export default Admin;
