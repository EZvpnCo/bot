import axios from "axios";
import { Bot, InlineKeyboard, NextFunction } from "grammy";
import { InlineQueryResult, InlineQueryResultArticle } from "grammy/out/types";
import AgencyService from ".";
import { MyContext } from "../..";
import * as apiService from "../api"


interface DataType {
    data: UserType[],
    current_page: number,
    total: number,
    per_page: number,
    last_page: number
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
        this.bot.callbackQuery(["account:agency:users", /^account:agency:users:([0-9]+)$/], this.response)
        this.bot.inlineQuery(/^SearchUser:(.*)$/, this.searchUser)
    }


    private data: DataType | null = null

    private keyboard = async (ctx: MyContext) => {
        const keyboard = new InlineKeyboard()

        const d = this.data!

        keyboard.switchInlineCurrent("🔍 جستجو", "SearchUser:").row()

        for (let i = 0; i < d.data.length; i++) {
            keyboard.text(d.data[i].email, "account:agency:users:detail:" + d.data[i].id).row()
        }

        if (d.current_page > 1) keyboard.text("⏪", "account:agency:users:" + (1))
        else keyboard.text("🚫", "account:agency:users:first")
        if (d.current_page > 1) keyboard.text("◀️", "account:agency:users:" + (d.current_page - 1))
        else keyboard.text("🚫", "account:agency:users:prev")
        keyboard.text((d.current_page).toString(), "account:agency:users:current")
        if (d.current_page < d.last_page) keyboard.text("▶️", "account:agency:users:" + (d.current_page + 1))
        else keyboard.text("🚫", "account:agency:users:next")
        if (d.current_page < d.last_page) keyboard.text("⏩", "account:agency:users:" + (d.last_page))
        else keyboard.text("🚫", "account:agency:users:last")
        keyboard.row()

        keyboard.text(ctx.t("back-btn"), "account:agency")
        keyboard.text(ctx.t("back-to-home-btn"), "menu")
        return keyboard
    }

    private text = async (ctx: MyContext) => {
        return `🔻 <b>مدیریت اکانت ها:</b>

<b>👥 تعداد کل:</b> ${this.data!.total}`
    }

    private response = async (ctx: MyContext) => {
        ctx.session.inputState = null

        let page = 1
        if (ctx.match && ctx.match[1]) page = parseInt(ctx.match[1])
        if (!page) page = 1
        try {
            const uid = ctx.session.user?.account_id
            const response = await apiService.GET()(`account/agency/users?user=${uid}&page=${page}&pageCount=15`)

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






    // ############

    private userText = (ctx: MyContext, account: { id: number }) => {
        return "ShowAccount:" + account['id'];
    }

    private searchUser = async (ctx: MyContext) => {
        const match = ctx.match!
        console.log("Mi")
        const response = await apiService.GET()(`account/agency/users?user=${1}&search=${match}&page=${1}&pageCount=10`)
        const _query = response.data.accounts.data
        console.log(response.data)
        const _users: InlineQueryResultArticle[] = []
        for (let i = 0; i < _query.length; i++) {
            const { id, user_name, email } = _query[i]
            _users.push({
                type: "article",
                id: "user_" + id,
                title: email,
                input_message_content: {
                    message_text: this.userText(ctx, _query[i]),
                    parse_mode: "HTML",
                },
                description: `${user_name}\n${email}`,
            })
        }
        await ctx.answerInlineQuery(_users as InlineQueryResult[], { cache_time: 0, },);
    }

}


export default AgencyUsersService