import axios from "axios";
import { Bot, InlineKeyboard, NextFunction } from "grammy";
import AccountService from ".";
import { MyContext } from "../..";
import * as apiService from "../api"
import MenuService from "../menu";


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
    "status": number,
    className: string
}


class AccountPurchaseService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.callbackQuery("account:purchase", this.response)
        this.bot.callbackQuery(/^account:purchase:([0-9]+)$/, this.purchase)
        this.bot.callbackQuery(/^account:purchase:([0-9]+):confirm$/, this.purchaseConfirm)
    }



    private plans: PlanType[] = []
    private keyboard = async (ctx: MyContext) => {
        const keyboard = new InlineKeyboard()

        for (let i = 0; i < this.plans.length; i++) {
            const { id, name, price } = this.plans[i]
            keyboard.text(`${name} 💰 ${price}$`, "account:purchase:" + id).row()
        }

        keyboard.text(ctx.t("back-btn"), "account")
        keyboard.text(ctx.t("back-to-home-btn"), "menu")
        return keyboard
    }

    private text = async (ctx: MyContext) => {
        let _data = ''
        for (let i = 0; i < this.plans.length; i++) {
            const { id, name, price, content, className } = this.plans[i]
            _data += `🎯 <b>${name}</b>\n<pre>💰 ${price}$</pre>\n⌛️ ${content.class_expire} Day  🧮 ${content.bandwidth} GB\n🌟 ${className}\n\n`
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
            if (ctx.callbackQuery) await ctx.answerCallbackQuery();
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



    private purchase = async (ctx: MyContext) => {
        ctx.session.inputState = null
        const item = parseInt(ctx.match![1]);

        const keys = new InlineKeyboard()
        keys.text("بله", "account:purchase:" + item + ":confirm")
        keys.text("خیر", "account:purchase")


        try {
            const response = await apiService.GET()("shop?plan=" + item)
            const plan = response.data.plan as PlanType
            await ctx.editMessageText(
                `💰 آیا از فعال سازی پلن <b>${plan.name}</b> با قیمت <b>${plan.price}</b> مطمئن هستید؟`,
                {
                    parse_mode: "HTML",
                    reply_markup: keys
                }
            );
            if (ctx.callbackQuery) await ctx.answerCallbackQuery();
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
    }


    private purchaseConfirm = async (ctx: MyContext) => {
        ctx.session.inputState = null
        const item = parseInt(ctx.match![1]);
        try {
            const uid = ctx.session.user?.account_id
            await apiService.POST()("account/purchase?user=" + uid, { plan: item, coupon: "" })
            await ctx.answerCallbackQuery({
                text: "✅ با موفقیت فعال شد",
                show_alert: true
            })
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


}


export default AccountPurchaseService