import axios from "axios";
import { Bot, InlineKeyboard, NextFunction } from "grammy";
import { MyContext } from "../..";
import * as apiService from "../api"


interface PlanType {
    "id": number,
    "name": string,
    "price": number,
    "content": {
        "bandwidth": number,
        "expire": number,
        "class": string,
        "class_expire": number,
        "reset": number,
        "reset_value": number,
        "reset_exp": number,
        "traffic_package": null,
        "speedlimit": number,
        "connector": number,
        "content_extra": string
    },
    "auto_renew": number,
    "auto_reset_bandwidth": number,
    "status": number
}


class AccountPurchaseService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.callbackQuery("account:purchase", this.response)
    }



    private plans: PlanType[] = []
    private keyboard = async (ctx: MyContext) => {
        const keyboard = new InlineKeyboard()

        for (let i = 0; i < this.plans.length; i++) {
            const { id, name, price } = this.plans[i]
            keyboard.text(`${name} 💰 ${price}$`, "menu")
        }


        keyboard.text(ctx.t("back-to-home-btn"), "menu")
        return keyboard
    }

    private text = async (ctx: MyContext) => {
        let _data = ''
        for (let i = 0; i < this.plans.length; i++) {
            const { id, name, price, content } = this.plans[i]
            _data += `🎯 <b>${name}</b>\n<pre>💰 ${price}$</pre>\n⌛️ ${content.class_expire} Day  🧮 ${content.bandwidth} GB\n🌟 ${content.class}\n\n`
        }
        return `🔻 <b>لیست پلن ها (${this.plans.length}):</b>\n\n${_data}`
    }

    private response = async (ctx: MyContext) => {
        ctx.session.inputState = null

        try {
            const response = await apiService.GET()("shop")
            this.plans = response.data.plans
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


export default AccountPurchaseService