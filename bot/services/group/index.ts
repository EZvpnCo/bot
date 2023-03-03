import { Bot, NextFunction } from "grammy";
import { MyContext } from "../..";

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