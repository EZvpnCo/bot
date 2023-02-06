import axios from "axios";
import { Bot, InlineKeyboard, NextFunction } from "grammy";
import { MyContext } from "../..";
import * as apiService from "../api"


class AgencyNewUserService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.callbackQuery("account:agency:new_user", this.response)
        this.bot.on("message", this.enterInputs)
    }

    private text = async (ctx: MyContext) => {
        return `🔻 لطفا ایمیل کاربر را وارد کنید:`
    }

    private response = async (ctx: MyContext) => {
        ctx.session.inputState = {
            category: "account:agency:new_user",
            parameter: "email",
            subID: null,
            messageID: ctx.message?.message_id!,
            data: `{}`,
        }

        await ctx.reply(await this.text(ctx));
        if (ctx.callbackQuery) await ctx.answerCallbackQuery();
        return
    }



    private enterInputs = async (ctx: MyContext, _next: NextFunction) => {
        if (ctx.session.inputState?.category !== "account:agency:new_user") {
            return await _next()
        }

        const text = ctx.message?.text
        const u = JSON.parse(ctx.session.inputState.data!)

        if (ctx.session.inputState?.parameter === "email") {
            const randomPassword = Math.random().toString(36).slice(-8)
            u.password = randomPassword
            u.code = ctx.session.agency.code
            u.name = text?.split("@")[0]
            u.email = text
            ctx.session.inputState.data = JSON.stringify(u)

            await ctx.reply("Hallo")
            // create
            // try {
            //     const data = JSON.parse(ctx.session.inputState.data)
            //     const response = await apiService.POST()("register", data)
            //     ctx.session.user!.account_id = response.data.account_id
            //     await ctx.session.user?.save()
            //     await ctx.reply("☑️ ثبت نام با موفقیت انجام شد" + `\nEmail: <pre>${u.email}</pre>\nPassword: <pre>${u.password}</pre>`, { parse_mode: "HTML" });
            //     new MenuService(this.bot).response(ctx)
            // } catch (error) {
            //     if (axios.isAxiosError(error)) {
            //         await ctx.reply("Error: SystemError")
            //     } else {
            //         const ee = error as { data: { msg: string } }
            //         await ctx.reply("Error: " + ee.data.msg)
            //     }
            //     setTimeout(async () => {
            //         await this.response(ctx)
            //     }, 500)
            // }
            // return
        }
        return await _next()
    }

}


export default AgencyNewUserService