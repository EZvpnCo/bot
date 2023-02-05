import axios from "axios";
import { Bot, InlineKeyboard, NextFunction } from "grammy";
import { MyContext } from "../..";
import * as apiService from "../api"


interface SubType {
    "json": string,
    "clash": string,
    "surfboard": string,
    "ss": string,
    "v2ray": string,
    "trojan": string
}


class AccountSubscriptionService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.callbackQuery("account:subscription", this.response)
    }



    private subscriptions: SubType | null = null
    private keyboard = async (ctx: MyContext) => {
        const keyboard = new InlineKeyboard()

        keyboard.text(ctx.t("back-btn"), "account")
        keyboard.text(ctx.t("back-to-home-btn"), "menu")
        return keyboard
    }

    private text = async (ctx: MyContext) => {
        let _data = ''
        _data += '<b>JSON:</b>\n<pre>' + this.subscriptions?.json + '</pre>\n'
        _data += '<b>Clash:</b>\n<pre>' + this.subscriptions?.clash + '</pre>\n'
        _data += '<b>Surfboard:</b>\n<pre>' + this.subscriptions?.surfboard + '</pre>\n\n'

        _data += '<b>ShadowSocks:</b>\n<pre>' + this.subscriptions?.ss + '</pre>\n'
        _data += '<b>V2ray:</b>\n<pre>' + this.subscriptions?.v2ray + '</pre>\n'
        _data += '<b>Trojan:</b>\n<pre>' + this.subscriptions?.trojan + '</pre>'

        console.log("**", _data)

        return `🔻 <b>اطلاعات اشتراک:</b>\n\n${_data}`
    }

    private response = async (ctx: MyContext) => {
        ctx.session.inputState = null

        try {
            const uid = ctx.session.user?.account_id
            const response = await apiService.GET()("account/subscription?user=" + uid)
            this.subscriptions = response.data.subscription
            await ctx.editMessageText(
                await this.text(ctx),
                { parse_mode: "HTML", reply_markup: await this.keyboard(ctx) }
            );
            await ctx.answerCallbackQuery();
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

}


export default AccountSubscriptionService