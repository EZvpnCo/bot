import { Bot, InlineKeyboard, NextFunction } from "grammy";
import { MyContext } from "../../..";
import * as apiService from "../../../api"
import MenuService from "../menu";

class AccountReferralService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.callbackQuery("account:referral", this.response)
    }


    private response = async (ctx: MyContext) => {
        ctx.session.inputState = null
        const response = await apiService.GET()("account?user=" + ctx.session.user!.account_id)

        await ctx.reply("ایزی وی پی ان یک وی پی ان پر سرعت و قوی با قیمت خیلی مناسب میتونی از لینک زیر تهیه کنی:\n\n" + "https://t.me/EZvpnCo_Bot?start=ref-" + response.data.account.referral_code)
        await ctx.answerCallbackQuery({ show_alert: true, text: "با عضویت کاربران با لینک مخصوصت هم حجم هدیه میگیری و در صورت هربار خرید پورسانت میگیری!" });
    }

}


export default AccountReferralService