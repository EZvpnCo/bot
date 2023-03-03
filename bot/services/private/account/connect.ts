import axios from "axios";
import { Bot, InlineKeyboard, NextFunction } from "grammy";
import AccountService from ".";
import { MyContext } from "../../..";
import * as apiService from "../../../api"
import MenuService from "../menu";

class AccountConnectService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.callbackQuery("account:connect", this.response)
        this.bot.on("message", this.enterInputs)
    }


    private text = async (ctx: MyContext) => {
        return `🔻 برای ورود به اکانت خود ابتدا ایمیل را وارد کنید:`
    }

    private response = async (ctx: MyContext) => {
        ctx.session.inputState = {
            category: "account:connect",
            parameter: "email",
            subID: null,
            messageID: null,
            data: "{}",
        }
        await ctx.reply(await this.text(ctx));
        if (ctx.callbackQuery) await ctx.answerCallbackQuery();
        return
    }


    private enterInputs = async (ctx: MyContext, _next: NextFunction) => {
        if (ctx.session.inputState?.category !== "account:connect") {
            return await _next()
        }

        const text = ctx.message?.text
        const u = JSON.parse(ctx.session.inputState.data!)

        if (ctx.session.inputState?.parameter === "email") {
            ctx.session.inputState.data = JSON.stringify({ ...u, email: text })
            ctx.session.inputState.parameter = "password"
            await ctx.reply("🔻 حالا پسورد اکانت خود را وارد کنید:");
            return
        }
        else if (ctx.session.inputState?.parameter === "password") {
            ctx.session.inputState.data = JSON.stringify({ ...u, password: text })


            // login
            try {
                const data = JSON.parse(ctx.session.inputState.data)
                const response = await apiService.POST()("login", data)
                ctx.session.user!.account_id = response.data.account_id
                await ctx.session.user?.save()
                await ctx.reply("☑️ با موفقیت وارد شدید");
                ctx.session.account = null
                new AccountService(this.bot).response(ctx)
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    await ctx.reply("Error: SystemError")
                } else {
                    const ee = error as { data: { msg: string } }
                    await ctx.reply("Error: " + ee.data.msg)
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


export default AccountConnectService