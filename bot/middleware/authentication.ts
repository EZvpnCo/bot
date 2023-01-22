import { NextFunction } from "grammy";
import { MyContext } from "..";
import User from "../database/models/user.model";

async function Authentication(ctx: MyContext, next: NextFunction) {
    const user = ctx.from!
    let _user = await User.findByPk(user.id)
    if (_user) {
        await _user.update({
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
        })
        if (ctx.session) ctx.session.isNew = false
    } else {
        _user = await User.create({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            is_bot: user.is_bot,
            is_premium: user.is_premium || false,
            is_active: true,
        })
        if (ctx.session) ctx.session.isNew = true
    }
    if (ctx.session) ctx.session.user = _user;
    await next();
}


export default Authentication