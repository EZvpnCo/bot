import { Bot, InlineKeyboard, InputFile, Keyboard, NextFunction } from "grammy";
import { MyContext } from "../..";
import { AdminGP, SuperAdmin } from "../../config";
import User from "../../database/models/bot_user.model";
import * as apiService from "../../api"
import mysqldump from 'mysqldump';
import { readFileSync, unlinkSync } from "fs";
import moment from "moment";
import { BackupDB } from "../../utils/backupDB";


class GroupService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.command("start", async (ctx, _next) => {
            if (ctx.chat?.id !== AdminGP) return await _next()
            const text = "Management Group\n\nSelect action:";
            const keys = new Keyboard()
                .text("/backup_database").row()
                .text("/users_list").row()
                .text("/servers_list").row()
            ctx.reply(text, { parse_mode: 'MarkdownV2', reply_markup: keys }).catch(e => console.log(e));
        });
        this.bot.callbackQuery(/^superAdmin:user:profile:([0-9]+)$/, this.userProfile)
        // this.bot.callbackQuery(/^superAdmin:user:recharge:([0-9]+)$/, this.userRecharge)
        this.bot.callbackQuery(/^superAdmin:user:message:([0-9]+)$/, this.userMessage)
        this.bot.command("backup_database", this.backup_database);
        this.bot.on("message", this.sendMessage)
    }

    private backup_database = async (ctx: MyContext, _next: NextFunction) => {
        if (ctx.chat?.id !== AdminGP) return await _next()

        await BackupDB(this.bot)
    }


    private checkUser = async (ctx: MyContext, _next: NextFunction) => {
        const userID = ctx?.match ? parseInt(ctx.match[1]) : 0
        const _user = await User.findByPk(userID)
        if (!_user) {
            return null
        }
        const uid = _user?.account_id
        if (uid) {
            try {
                const response = await apiService.GET()("account?user=" + uid)
                return { user: _user, account: response.data.account }
            } catch (error) {
                return null
            }
        }

    }

    private userMessage = async (ctx: MyContext, _next: NextFunction) => {
        if (ctx.chat?.id !== AdminGP) return await _next()

        const response = await this.checkUser(ctx, _next)
        if (!response) return await ctx.reply("User or Account not found!")
        const { user, account } = response

        ctx.session.inputState = {
            category: "superAdmin:user",
            parameter: "message",
            subID: user.id,
            messageID: null,
            data: `{}`,
        }
        await ctx.reply(`Ok, I'm waiting for your message\n${account.email}`)
        await ctx.answerCallbackQuery();
    }


    private userProfile = async (ctx: MyContext, _next: NextFunction) => {
        if (ctx.chat?.id !== AdminGP) return await _next()
        ctx.session.inputState = null

        const response = await this.checkUser(ctx, _next)
        if (!response) return await ctx.reply("User or Account not found!")
        const { user, account } = response

        const _text = `🔻 <b>اطلاعات کاربر:</b>\n\n👤 <b>${account.user_name}</b>
📧 <pre>${account.email}</pre>
🧩 ${account.node_group}
⭐️ ${account.class}

⌛️ Expire: ${account.class_expire}
📤 Traffic: ${account.used_traffic} / ${account.total_traffic_gb > 5000 ? "Unlimited" : account.total_traffic}
🖥 Device: ${(account.node_connector > 0 ? "~" + " / " + account.node_connector : "Unlimited")}
💰 Wallet: ${account.money}$

🖥 TLG:
${user.id}
${user.first_name} ${user.last_name ? user.last_name : ""} ${user.username ? "@" + user.username : ""}
`


        const keyboard = new InlineKeyboard()
        keyboard.text("🎲 اطلاعات اشتراک", `superAdmin:user:subscription:${user?.id}`)
        keyboard.text("⚡️ خرید اشتراک", `superAdmin:user:purchase:${user?.id}`)
        keyboard.row()
        keyboard.text("💵 شارژ حساب", `superAdmin:user:charge:${user?.id}`)
        keyboard.row()
        keyboard.text('💬 ارسال پیام', `superAdmin:user:message:${user?.id}`)
        keyboard.row()

        await ctx.editMessageText(
            _text,
            {
                parse_mode: "HTML",
                reply_markup: keyboard
            }
        );
        await ctx.answerCallbackQuery();
    }


    private sendMessage = async (ctx: MyContext, _next: NextFunction) => {
        const ii = ctx.session.inputState
        if (ctx.chat?.id !== AdminGP) return await _next()
        if (!ii || ii.category !== "superAdmin:user" || ii.parameter !== "message") {
            return await _next()
        }
        const accountID = ii.subID!
        await this.bot.api.copyMessage(accountID, ctx.chat?.id!, ctx.message?.message_id!)
        await ctx.reply("Your message sent successfully")
        ctx.session.inputState = null
    }

}


export default GroupService