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

        await ctx.reply("Hi")
        if (ctx.msg?.forward_from) {
            await ctx.reply("پیام شما به کاربر ارسال شد")
            return
        }

        if (ctx.msg?.reply_to_message) {
            await ctx.reply("YYYYپیام شما به کاربر ارسال شد")
            return
        }

        if (ctx.msg?.reply_to_message && ctx.msg?.reply_to_message.forward_from) {
            await ctx.reply("YYYYپیام شما به کBBBBBBاربر ارسال شد")
            return
        }


        return await _next()
    }

}


export default GroupService