import axios from "axios";
import { Bot, InlineKeyboard, NextFunction } from "grammy";
import AccountService from ".";
import { MyContext } from "../../..";
import * as apiService from "../../../api"
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

    public response = async (ctx: MyContext) => {
        const uid = ctx.session.user?.account_id
        if (!!uid) {
            // await ctx.answerCallbackQuery({ show_alert: true, text: "شما عضو ربات هستید!!!", });
            new AccountService(this.bot).response(ctx)
            return
        }

        ctx.session.inputState = {
            category: "account:create",
            parameter: "email",
            subID: null,
            messageID: null,
            data: `{}`,
        }
        await ctx.reply(await this.text(ctx));
        if (ctx.callbackQuery) await ctx.answerCallbackQuery();
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
            u.code = ctx.session.user?.referral_code || ""
            u.name = text?.split("@")[0]
            u.email = text
            ctx.session.inputState.data = JSON.stringify(u)
            ctx.session.inputState.parameter = "code"

            if (!ctx.session.user?.referral_code) {
                await ctx.reply("🔻 در صورتی که کد دعوت دارید آن را وارد کنید. در غیر اینصورت بر روی /skip کلیک کنید:");
                return
            }
        }
        if (ctx.session.inputState?.parameter === "code") {
            if (ctx.session.user?.referral_code) u.code = ctx.session.user?.referral_code
            else if (text !== "/skip") u.code = text
            ctx.session.inputState.data = JSON.stringify(u)
            // register
            const data = JSON.parse(ctx.session.inputState.data)
            try {
                const response = await apiService.POST()("register", data)
                if (!response.data.account_id) {
                    throw response
                }
                ctx.session.user!.account_id = response.data.account_id
                await ctx.session.user?.save()
                await ctx.reply("☑️ ثبت نام با موفقیت انجام شد" + `\nEmail: <pre>${u.email}</pre>\nPassword: <pre>${u.password}</pre>`, { parse_mode: "HTML" });
                new AccountService(this.bot).response(ctx)

                // await ctx.api.sendMessage(1, "");
            } catch (error) {
                console.log(error);

                if (axios.isAxiosError(error)) {
                    await ctx.reply("Error: SystemError")
                } else {
                    const ee = error as { data: { msg: string } }
                    await ctx.reply("Error: " + ee.data.msg)
                    await ctx.reply(JSON.stringify(data))
                }
                setTimeout(async () => {
                    await this.response(ctx)
                }, 500)
            }
            return
        }
        return await _next()
    }
}


export default AccountCreateService