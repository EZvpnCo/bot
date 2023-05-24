import { Bot, InputFile, Keyboard, NextFunction } from "grammy";
import { MyContext } from "../..";
import { AdminGP, SuperAdmin } from "../../config";
import User from "../../database/models/bot_user.model";
import * as apiService from "../../api"
import mysqldump from 'mysqldump';
import { readFileSync } from "fs";
import moment from "moment";


class GroupService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.command("start", async (ctx, _next) => {
            if (ctx.chat?.id !== AdminGP) return await _next()
            const text = "اینجا گروه ادمینه";
            const keys = new Keyboard()
                .text("/backup_database").row()
                .text("/users_list").row()
                .text("/servers_list").row()
            ctx.reply(text, { parse_mode: 'MarkdownV2', reply_markup: keys }).catch(e => console.log(e));
        });
        this.bot.callbackQuery(/^superAdmin:user:profile:([0-9]+)$/, this.userProfile)
        this.bot.callbackQuery(/^superAdmin:user:message:([0-9]+)$/, this.userMessage)
        this.bot.command("backup_database", this.backup_database);
        this.bot.on("message", this.sendMessage)
    }

    private backup_database = async (ctx: MyContext, _next: NextFunction) => {
        if (ctx.chat?.id !== AdminGP) return await _next()
        const text = "Backup Started ...";
        const m = await ctx.reply(text);

        try {
            const datetime = moment().format("YYYY-MM-DD HH:mm:ss")
            const databases = ['ezvpn_dashboard', 'ezvpn_bot', 'ezshell']
            for (let iii = 0; iii < databases.length; iii++) {
                const dbname = databases[iii]
                const ff = `temp/BackupDB_${dbname}_${datetime}.sql`
                await mysqldump({
                    connection: {
                        host: '0.0.0.0',
                        user: 'root',
                        password: 'rasoul707',
                        database: dbname,
                    },
                    dumpToFile: ff,
                });
                const _file = readFileSync(ff)
                await ctx.replyWithDocument(new InputFile(_file, `BackupDB_${dbname}_${datetime}.sql`), { caption: `#Backup\n${dbname}\n${datetime}` })
            }
            await ctx.api.deleteMessage(m.chat.id, m.message_id)
        } catch (error) {
            await ctx.api.editMessageText(m.chat.id, m.message_id, "Backup Failed")
            console.log(error);
        }

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
        if (!response)
            return await ctx.reply("User or Account not found!")
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