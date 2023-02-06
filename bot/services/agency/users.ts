import axios from "axios";
import { Bot, InlineKeyboard, NextFunction } from "grammy";
import AgencyService from ".";
import { MyContext } from "../..";
import * as apiService from "../api"


interface DataType {
    data: UserType[],
    current_page: number,
    total: number,
    per_page: number,
}

interface UserType {
    id: number,
    user_name: string,
    email: string,
}

class AgencyUsersService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.callbackQuery("account:agency:users", this.response)
    }


    private data: DataType | null = null

    private keyboard = async (ctx: MyContext) => {
        const keyboard = new InlineKeyboard()

        const d = this.data!

        for (let i = 0; i < d.data.length; i++) {
            keyboard.text(d.data[i].email, "account:agency:users:edit:" + d.data[i].id).row()
        }

        if (d.current_page > 1) keyboard.text("◀️", "account:agency:users:" + (d.current_page - 1))
        else keyboard.text("🚫", "account:agency:users:prev")
        keyboard.text((d.current_page).toString(), "account:agency:users:current")
        if (d.current_page < Math.ceil(d.total / d.per_page)) keyboard.text("▶️", "account:agency:users:" + (d.current_page + 1))
        else keyboard.text("🚫", "account:agency:users:next")
        keyboard.row()

        keyboard.text(ctx.t("back-btn"), "account:agency")
        keyboard.text(ctx.t("back-to-home-btn"), "menu")
        return keyboard
    }

    private text = async (ctx: MyContext) => {
        return `🔻 <b>مدیریت اکانت ها:</b>

<b>👥 تعداد:</b> ${this.data!.total}`
    }

    private response = async (ctx: MyContext) => {
        ctx.session.inputState = null

        let page = 1
        if (ctx.match && ctx.match[1]) page = parseInt(ctx.match[1])
        if (!page) page = 1

        try {
            const uid = ctx.session.user?.account_id
            const response = await apiService.GET()(`account/agency/users?user=${uid}&page=${page}&pageCount=1`)
            this.data = response.data.accounts
            await ctx.editMessageText(
                await this.text(ctx),
                { parse_mode: "HTML", reply_markup: await this.keyboard(ctx) }
            );
            await ctx.answerCallbackQuery();
            return
        } catch (error) {
            if (axios.isAxiosError(error)) {
                await ctx.reply("Error: SystemError")
            } else {
                const ee = error as { data: { msg: string } }
                await ctx.reply("Error: " + ee.data.msg)
            }
            setTimeout(async () => {
                new AgencyService(this.bot).response(ctx)
            }, 500)
        }
    }

}


export default AgencyUsersService