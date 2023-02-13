import axios from "axios";
import { Bot, InlineKeyboard, NextFunction } from "grammy";
import AccountService from ".";
import { MyContext } from "../..";
import * as apiService from "../api"


class AccountChargeService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.callbackQuery("account:charge", this.response)
        this.bot.callbackQuery(/^account:charge:(code)$/, this.chargeWaySelect)
        this.bot.on("message", this.enterCode)
    }


    private keyboard = async (ctx: MyContext) => {
        const keyboard = new InlineKeyboard()

        keyboard.text('🖲 کد شارژ', "account:charge:code")
        keyboard.text('💸 درگاه کریپتو', "account:charge:crypto")
        keyboard.row()
        keyboard.text('📝 ارسال فیش واریزی', "account:charge:sendReceipt")
        keyboard.row()

        keyboard.text(ctx.t("back-btn"), "account")
        keyboard.text(ctx.t("back-to-home-btn"), "menu")
        return keyboard
    }

    private text = async (ctx: MyContext) => {
        return `🔻 در حال حاضر شما می توانید با استفاده از کریپتو و کد شارژ حساب خود را شارژ کنید.
برای دریافت کد شارژ با پشتیبانی در ارتباط باشید`
    }

    private response = async (ctx: MyContext) => {
        ctx.session.inputState = null
        await ctx.editMessageText(
            await this.text(ctx),
            { parse_mode: "HTML", reply_markup: await this.keyboard(ctx) }
        );
        await ctx.answerCallbackQuery();
        return
    }


    // ############################
    private selectedWay = "code"
    private chargeWaySelect = async (ctx: MyContext) => {
        ctx.session.inputState = null
        if (!this.selectedWay && ctx.match) {
            this.selectedWay = ctx.match[1]
        }

        if (!["code"].includes(this.selectedWay)) {
            await ctx.answerCallbackQuery({ text: "روش انتخابی وجود ندارد", show_alert: true });
        }

        if (this.selectedWay === "code") {
            ctx.session.inputState = {
                category: "account:charge",
                parameter: this.selectedWay,
                subID: null,
                messageID: null,
                data: `{}`,
            }
            await ctx.reply(`🧩 کد شارژ دریافتی را وارد کنید:`);
        }

        if (ctx.callbackQuery) await ctx.answerCallbackQuery();
        return
    }


    private enterCode = async (ctx: MyContext, _next: NextFunction) => {
        const ii = ctx.session.inputState
        if (!ii || ii.category !== "account:charge" || ii.parameter !== "code") {
            return await _next()
        }

        const text = ctx.message?.text
        try {
            const uid = ctx.session.user?.account_id
            const response = await apiService.POST()("account/chargeByCode?user=" + uid, { code: text })
            const data = response.data
            await ctx.reply(`✅ حساب شما با موفقیت شارژ شد
موجودی: ${data.money}$`, { parse_mode: "HTML" });
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
                this.selectedWay = "code"
                await this.chargeWaySelect(ctx)
            }, 500)
        }

    }

}


export default AccountChargeService