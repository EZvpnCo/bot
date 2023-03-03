import { Bot, NextFunction } from "grammy";
import { MyContext } from "../..";
import { AdminGP } from "../../config";

class GroupService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.on("message", this.userReply)
    }

    private userReply = async (ctx: MyContext, _next: NextFunction) => {
        ctx.session.inputState = null
        if (ctx.chat?.id !== AdminGP) return await _next()
        await ctx.reply("Hilo")
        if (ctx.msg?.reply_to_message?.forward_from) {
            const toChatID = ctx.msg?.reply_to_message?.forward_from.id
            await ctx.api.copyMessage(toChatID, ctx.chat?.id!, ctx.msg.message_id)
            await ctx.reply("پیام شما به کاربر ارسال شد")
            return
        }
        return await _next()
    }

}


export default GroupService