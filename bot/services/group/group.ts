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
        if (ctx.message?.forward_from) {
            await ctx.reply("پیام شما به کاربر ارسال شد")
            return
        }
        return await _next()
    }

}


export default GroupService