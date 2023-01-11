import { Bot, InlineKeyboard } from "grammy";

const Prices = (bot: Bot) => {
    // text
    const text = "نوع کاربری خود را انتخاب کنید:";

    // keyboard
    const keyboard = new InlineKeyboard()
        .text("Daily", "prices:daily")
        .text("Trade", "prices:trade")
        .text("Game", "prices:game")
        .row()
        .text("صفحه اصلی 🏠", "mainMenu");

    // Handle the /prices command.
    bot.command("prices", (ctx) => {
        ctx.reply(text, { reply_markup: keyboard });
    });

    // prices
    bot.callbackQuery("prices", async (ctx) => {
        await ctx.editMessageText(text, { reply_markup: keyboard });
        await ctx.answerCallbackQuery();
    });


    // ========> sub menu
    const back_keyboard = new InlineKeyboard()
        .text("برگشت ↪️", "prices")
        .text("صفحه اصلی 🏠", "mainMenu");

    // ===> daily
    const dailyText = `
🔻 پکیج Daily مناسب برای وب گردی، شبکه های اجتماعی، دانلود و آپلود و سایر کارهای روزمره عادی استفاده می شود.
🔻 این پکیج دارای دو نوع سرویس می باشد: دیلی و دیلی پلاس
🔻 تفاوت سرویس دیلی پلاس در تعداد سرورها، کیفیت سرورها و همچنین توانایی استفاده در مواقع حساس می باشد.

💰 تعرفه های پکیج Daily:

🔸سرویس Daily:
یک کاربره | یک ماهه | 1$
پنج کاربره | یک ماهه | 4.5$
یک کاربره | سه ماهه | 3$
پنج کاربره | سه ماهه | 13.5$

🔸سرویس +Daily:
یک کاربره | یک ماهه | 2$
پنج کاربره | یک ماهه | 9$
یک کاربره | سه ماهه | 6$
پنج کاربره | سه ماهه | 27$
`
    bot.callbackQuery("prices:daily", async (ctx) => {
        await ctx.editMessageText(dailyText, { reply_markup: back_keyboard });
        await ctx.answerCallbackQuery();
    });
    // Handle the /prices@daily command.
    bot.command("prices@daily", (ctx) => {
        ctx.reply(dailyText, { reply_markup: back_keyboard });
    });


    // ===> trade
    const tradeText = `
🔻 پکیج Trade مناسب برای تریدرها می باشد.
🔻 این پکیج برای وبگردی، دانلود و شبکه های اجتماعی مناسب نیست.
🔻 این پکیج دارای آیپی ثابت و بدون هرگونه نشتی ip و dns می باشد.
🔻 سرویس Trade+ مناسب برای گروه ها، دفاتر و شرکت های ترید می باشد که توانایی پاسخگویی حداقل ۵۰ دیوایس را دارد.

💰 تعرفه های پکیج Trade:

🔸سرویس Trade:
یک کاربره | یک ماهه | 2$
پنج کاربره | یک ماهه | 9$
یک کاربره | سه ماهه | 6$
پنج کاربره | سه ماهه | 27$

🔸سرویس +Trade:
یک ماهه (معمولی) | 65$
یک ماهه (ویژه) | 105$
`
    bot.callbackQuery("prices:trade", async (ctx) => {
        await ctx.editMessageText(tradeText, { reply_markup: back_keyboard });
        await ctx.answerCallbackQuery();
    });
    // Handle the /prices@trade command.
    bot.command("prices@trade", (ctx) => {
        ctx.reply(tradeText, { reply_markup: back_keyboard });
    });

    // ===> game
    const gameText = `
🔻 پکیج Game مناسب برای گیمرها می باشد.
🔻 این پکیج برای وبگردی، دانلود و شبکه های اجتماعی مناسب نیست.
🔻 این پکیج دارای پینگ عالی برای اتصال کامل در بازی های مختلف می باشد.
🔻 سرویس Game+ مناسب برای گروه ها و کلاب های بازی می باشد که توانایی پاسخگویی به حداقل ۵۰ کاربر را داراست.

💰 تعرفه های پکیج Game:

🔸سرویس Game:
یک کاربره | یک ماهه | 2$
پنج کاربره | یک ماهه | 9$
یک کاربره | سه ماهه | 6$
پنج کاربره | سه ماهه | 27$

🔸سرویس +Game:
یک ماهه (معمولی) | 65$
یک ماهه (ویژه) | 105$
`
    bot.callbackQuery("prices:game", async (ctx) => {
        await ctx.editMessageText(gameText, { reply_markup: back_keyboard });
        await ctx.answerCallbackQuery();
    });
    // Handle the /prices@game command.
    bot.command("prices@game", (ctx) => {
        ctx.reply(gameText, { reply_markup: back_keyboard });
    });
};

export default Prices;
