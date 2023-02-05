import axios from "axios";
import { Bot, InlineKeyboard, NextFunction } from "grammy";
import { MyContext } from "../..";
import * as apiService from "../api"
import MenuService from "../menu";

class AccountCreateService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.callbackQuery("account:create", this.response)
        this.bot.on("message", this.enterInputs)
    }


    private text = async (ctx: MyContext) => {
        return `🔻 لطفا ایمیل خود را وارد کنید (این ایمیل صرفا جهت اطلاع رسانی و همچنین ورود به پنل استفاده می شود و تمامی اطلاعات شما پیش ما محفوط می ماند):`
    }

    private response = async (ctx: MyContext) => {

        ctx.session.inputState = {
            category: "account:create",
            parameter: "email",
            subID: null,
            messageID: null,
            data: `{}`,
        }
        await ctx.reply(await this.text(ctx));
        await ctx.answerCallbackQuery();
        return
    }


    private enterInputs = async (ctx: MyContext, _next: NextFunction) => {
        if (ctx.session.inputState?.category !== "account:create") {
            return await _next()
        }

        const text = ctx.message?.text
        const u = JSON.parse(ctx.session.inputState.data!)




        if (ctx.session.inputState?.parameter === "email") {
            const randomPassword = Math.random().toString(36).slice(-8)
            u.password = randomPassword
            u.code = ""
            u.name = text?.split("@")[0]

            ctx.session.inputState.data = JSON.stringify({ ...u, email: text })
            // register
            try {
                const data = JSON.parse(ctx.session.inputState.data)
                const response = await apiService.POST()("register", data)
                ctx.session.user!.account_id = response.data.account_id
                await ctx.session.user?.save()
                await ctx.reply("☑️ ثبت نام با موفقیت انجام شد");
                new MenuService(this.bot).response(ctx)
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    await ctx.reply("Error: SystemError")
                } else {
                    const ee = error as { data: { msg: string } }
                    await ctx.reply("Error: " + ee.data.msg)
                }
                setTimeout(async () => {
                    await this.response(ctx)
                }, 1000)
            }
            return
        }
        return await _next()
    }
}


export default AccountCreateService