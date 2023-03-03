import { InlineKeyboard } from "grammy"
import { MyContext } from ".."

export const backKeyboards = (ctx: MyContext, keyboard: InlineKeyboard, backLevel: string) => {
    keyboard
        .text(ctx.t("back-btn"), backLevel)
        .text(ctx.t("back-to-home-btn"), "menu")
    return keyboard
}
