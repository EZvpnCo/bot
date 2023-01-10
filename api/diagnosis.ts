import { Bot, InlineKeyboard } from "grammy";

const Diagnosis = (bot: Bot) => {
    // text
    const text = "🔻 از منوی زیر انتخاب کنید:";

    const diagnosisList = [
        [
            "سرور ها ایمپورت نمیشن (iOS)",
            `راه حل 1: مطمئن باشید که گزینه مربوط به سابزکریپشن رو انتخاب کردین
راه حل 2: مطمئن باشین که لینک رو درست کپی کردین و هیچ کارکتر یا جای خالی اضافی رو کپی نکرده باشین.
راه حل 3: مطمئن باشین که آخر لینک اشتراک شما با sub=3 به اتمام رسیده باشه.
راه حل 4: مطمئن باشین که vpn روشن نداشته باشین.`,
        ],
        [
            "وصل میشه ولی کار نمیکنه (iOS)",
            `راه حل 1: سرور هایی که TJ دارن داخل اسمشون رو تست کنید .
راه حل 2: برنامه های دیگه ای رو تست کنید. از قسمت اموزش و دانلود میتونید برنامه های دیگه ای رو ببینید`,
        ],
        [
            "سرورها پینگ نمیدن (iOS)",
            `راه حل 1: با اینترنت دیگه ای تست بفرمایید
راه حل 2: لینک اشتراک رو پاک کنید و مجدد اضافه کنید.
راه حل 3: زمان و حجم باقی مانده حسابتون رو چک بفرمایید.
راه حل 4: مطمعن باشین که با دستگاه دیگه ای به اشتراکتون وصل نیستید.`,
        ],
        [
            "سرور ها ایمپورت نمیشن (Android)",
            `راه حل 1: مطمئن باشید که گزینه مربوط به سابزکریپشن رو انتخاب کردین
راه حل 2: مطمئن باشین که لینک رو درست کپی کردین و هیچ کارکتر یا جای خالی اضافی رو کپی نکرده باشین.
راه حل 3: برای برنامه surfboard مطمئن باشید که آخر لینک اشتراکتون با surfboard=1 و برای بقیه برنامه ها و دستگاه ها با sub=3 به اتمام رسیده باشه.
راه حل 4: مطمئن باشین که vpn روشن نداشته باشین.`,
        ],
        [
            "وصل میشه ولی کار نمیکنه (Android)",
            `راه حل 1: سرور هایی که TJ دارن داخل اسمشون رو تست کنید .
راه حل 2: برنامه های دیگه ای رو تست کنید. از قسمت اموزش و دانلود میتونید برنامه های دیگه ای رو ببینید
راه حل 3: نوع کانکشن رو روی global یا سراسری قرار بدین و چک کنید.
راه حل 4: پروفایل خودتون رو یک بار آپدیت کنید.`,
        ],
        [
            "سرورها پینگ نمیدن (Android)",
            `راه حل 1: با اینترنت دیگه ای تست بفرمایید
راه حل 2: لینک اشتراک رو پاک کنید و مجدد اضافه کنید.
راه حل 3: زمان و حجم باقی مانده حسابتون رو چک بفرمایید.
راه حل 4: مطمئن باشین که با دستگاه دیگه ای به اشتراکتون وصل نیستید.`,
        ],
        [
            "پروتکل L2tp تند تند قطع میشه (Android)",
            `راه حل 1: مطمعن باشید که به vpn  دیگه ای وصل نباشید
راه حل 2: برنامه های دیگه ای رو تست بفرمایید . از قسمت اموزش و دانلود میتونید برنامه های دیگه ای رو ببینید.
راه حل 3: از پشتیبانی درخواست فایل سرتیفیکیت کنین.`,
        ],
        [
            "سرور ها ایمپورت نمیشن (Windows)",
            `راه حل 1: مطمئن باشید که گزینه مربوط به سابزکریپشن رو انتخاب کردین
راه حل 2: مطمئن باشین که لینک رو درست کپی کردین و هیچ کارکتر یا جای خالی اضافی رو کپی نکرده باشین.
راه حل 3: مطمئن باشید که آخر لینک اشتراکتون با sub=3 به اتمام رسیده باشه.
راه حل 4: مطمئن باشین که vpn روشن نداشته باشین.`,
        ],
        [
            "وصل میشه ولی کار نمیکنه (Windows)",
            `راه حل 1: سرور هایی که TJ دارن داخل اسمشون رو تست کنید .
راه حل 2: برنامه های دیگه ای رو تست کنید. از قسمت اموزش و دانلود میتونید برنامه های دیگه ای رو ببینید
راه حل 3: نوع کانکشن رو روی global یا سراسری قرار بدین و چک کنید.
راه حل 4: پروفایل خودتون رو یک بار آپدیت کنید.`,
        ],
        [
            "سرورها پینگ نمیدن (Windows)",
            `راه حل 1: با اینترنت دیگه ای تست بفرمایید
راه حل 2: لینک اشتراک رو پاک کنید و مجدد اضافه کنید.
راه حل 3: زمان و حجم باقی مانده حسابتون رو چک بفرمایید.
راه حل 4: مطمئن باشین که با دستگاه دیگه ای به اشتراکتون وصل نیستید.`,
        ],
        [
            "پروتکل L2tp تند تند قطع میشه (Windows)",
            `راه حل 1: مطمئن باشید که به vpn  دیگه ای وصل نباشید
راه حل 2: برنامه های دیگه ای رو تست بفرمایید . از قسمت اموزش و دانلود میتونید برنامه های دیگه ای رو ببینید.
راه حل 3: از پشتیبانی درخواست فایل سرتیفیکیت کنین.`,
        ],
    ];

    // keyboard
    const keyboard = new InlineKeyboard()
    diagnosisList.map((v, index) => {
        keyboard.text(v[0], "diagnosis:" + (index + 1)).row();
    });
    keyboard.text("صفحه اصلی", "mainMenu");

    // Handle the /diagnosis command.
    bot.command("diagnosis", (ctx) => {
        ctx.reply(text, { reply_markup: keyboard });
    });

    bot.callbackQuery("diagnosis", async (ctx) => {
        await ctx.answerCallbackQuery();
        await ctx.editMessageText(text, { reply_markup: keyboard });
    });

    // diagnosis answer
    bot.callbackQuery(/(diagnosis:)\d{1,3}/g, async (ctx) => {
        await ctx.answerCallbackQuery();
        const q = parseInt(ctx.match.toString().replace("diagnosis:", "")) - 1;
        await ctx.reply(`🛠 ${diagnosisList[q][0]}\n\n💭 ${diagnosisList[q][1]}`);
    });
};

export default Diagnosis;
