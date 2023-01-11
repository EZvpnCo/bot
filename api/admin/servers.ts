import { Bot, InlineKeyboard, } from "grammy";
import { Admins as admins } from "../config";
import moment from "moment";
import { MyBot, MyContext } from "../bot";


const serversList = [
    {
        id: 1,
        name: "Bahrain-01",
        description: "description",
        created: moment("2022-12-28 12:45:44").toDate(),
        country: "Bahrain",
        flag: "bh",
        ip: "38.54.2.172",
        username: "ubuntu",
        password: "(C[3Sz{WB8",
        domain: "bh01.ezvpn.co",
        deleted: false,
    }
]

const AdminServers = (bot: MyBot) => {



    const genKeyboard = (ctx: MyContext) => {
        const keyboard = new InlineKeyboard()

        serversList.forEach((v, i) => {
            keyboard
                .text(ctx.emoji`Welcome! ${"smiling_face_with_sunglasses"}`, "hello")
                .row()
        })

        keyboard
            .text("برگشت ↪️", "management")
            .text("صفحه اصلی 🏠", "mainMenu")

        return keyboard;
    }





    bot.callbackQuery("management:servers", async (ctx) => {
        let _text, _keyboard
        if (!admins.includes(ctx?.from?.id!)) {
            _text = `شما دسترسی های لازم رو نداری 🚫`
        }
        else {
            _text = `به بخش مدیریت خوش اومدی\nچیکار میتونم انجام بدم برات؟`
            _keyboard = genKeyboard(ctx)
        }
        await ctx.editMessageText(_text, { reply_markup: _keyboard });
        await ctx.answerCallbackQuery();
    });


};

export default AdminServers;
