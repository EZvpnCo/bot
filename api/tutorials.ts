import { Bot, InlineKeyboard, InputFile } from "grammy";

const Tutorials = (bot: Bot) => {
    // text
    const text = "محتوای مدنظر را انتخاب کنید:";

    // keyboard
    const keyboard = new InlineKeyboard()
        .text("Agent Panel", "tutorials:agent_panel")
        .row()
        .text("Android", "tutorials:android")
        .text("iOS", "tutorials:ios")
        .row()
        .text("Windows", "tutorials:windows")
        .text("macOS", "tutorials:macos")
        .row()
        .text("صفحه اصلی", "mainMenu");

    // Handle the /tutorials command.
    bot.command("tutorials", (ctx) => {
        ctx.reply(text, { reply_markup: keyboard });
    });

    // tutorials
    bot.callbackQuery("tutorials", async (ctx) => {
        await ctx.editMessageText(text, { reply_markup: keyboard });
        await ctx.answerCallbackQuery();
    });

    // ========> sub menu
    AgentPanelTutorials(bot)
    AndroidTutorials(bot)
    IOSTutorials(bot)
    WindowsTutorials(bot)
    MacOSTutorials(bot)
};

export default Tutorials;

const AgentPanelTutorials = (bot: Bot) => {
    const text = "محتوای مدنظر را انتخاب کنید:";

    // ===> macos
    const keyboard = new InlineKeyboard()
        .text("برگشت", "tutorials")
        .text("صفحه اصلی", "mainMenu");
    bot.callbackQuery("tutorials:agent_panel", async (ctx) => {
        await ctx.editMessageText(text, { reply_markup: keyboard });
        await ctx.answerCallbackQuery();
    });
}

const AndroidTutorials = (bot: Bot) => {
    const text = "محتوای مدنظر را انتخاب کنید:";

    // ===> android
    const keyboard = new InlineKeyboard()
        .text("Surfboard", "tutorials:android:surfboard")
        .text("OneClick", "tutorials:android:oneclick")
        .row()
        .text("L2tp", "tutorials:android:l2tp")
        .text("OpenVPN", "tutorials:android:openvpn")
        .row()
        .text("برگشت", "tutorials")
        .text("صفحه اصلی", "mainMenu");
    bot.callbackQuery("tutorials:android", async (ctx) => {
        await ctx.editMessageText(text, { reply_markup: keyboard });
        await ctx.answerCallbackQuery();
    });

    // ===> android:surfboard
    const android_surfboard_tutorial = "http://dl.ezvpn.co/tutorials/android/Surfboard.mp4";
    const android_surfboard_keyboard = new InlineKeyboard()
        .text("برگشت", "tutorials:android")
        .text("صفحه اصلی", "mainMenu");
    bot.callbackQuery("tutorials:android:surfboard", async (ctx) => {
        const text = `
Android - Surfboard

${android_surfboard_tutorial}
`
        await ctx.reply(text, { reply_markup: android_surfboard_keyboard });
        await ctx.answerCallbackQuery();
    });
}



const IOSTutorials = (bot: Bot) => {
    const text = "اپلیکیشن مدنظر را انتخاب کنید:";

    // ===> ios
    const keyboard = new InlineKeyboard()
        .text("OneClick", "downloads:ios:oneclick")
        .row()
        .text("برگشت", "downloads")
        .text("صفحه اصلی", "mainMenu");
    bot.callbackQuery("downloads:ios", async (ctx) => {
        await ctx.editMessageText(text, { reply_markup: keyboard });
        await ctx.answerCallbackQuery();
    });

    // ===> ios:oneclick
    const ios_oneclick_keyboard = new InlineKeyboard()
        .url('دانلود از App Store', 'https://apps.apple.com/us/app/oneclick-safe-easy-fast/id1545555197')
    bot.callbackQuery("downloads:ios:oneclick", async (ctx) => {
        const text = `🎲 نام برنامه: One Click`
        await ctx.reply(text, { reply_markup: ios_oneclick_keyboard });
        await ctx.answerCallbackQuery();
    });
}


const WindowsTutorials = (bot: Bot) => {
    const text = "اپلیکیشن مدنظر را انتخاب کنید:";

    // ===> windows
    const keyboard = new InlineKeyboard()
        .text("EZvpn", "downloads:windows:ezvpn")
        .text("v2rayN", "downloads:windows:v2rayn")
        .row()
        .text("برگشت", "downloads")
        .text("صفحه اصلی", "mainMenu");
    bot.callbackQuery("downloads:windows", async (ctx) => {
        await ctx.editMessageText(text, { reply_markup: keyboard });
        await ctx.answerCallbackQuery();
    });

    // ===> windows:ezvpn
    const windows_ezvpn_keyboard = new InlineKeyboard()
        .url('دانلود از EZvpn', 'http://dl.ezvpn.co/downloads/windows/EZvpn.exe')
    bot.callbackQuery("downloads:windows:ezvpn", async (ctx) => {
        const text = `🎲 نام برنامه: EZvpn`
        await ctx.reply(text, { reply_markup: windows_ezvpn_keyboard });
        await ctx.answerCallbackQuery();
    });
    // ===> windows:v2rayn
    const windows_v2rayn_keyboard = new InlineKeyboard()
        .url('دانلود از EZvpn', 'http://dl.ezvpn.co/downloads/windows/v2rayN.zip')
    bot.callbackQuery("downloads:windows:v2rayn", async (ctx) => {
        const text = `🎲 نام برنامه: v2rayN`
        await ctx.reply(text, { reply_markup: windows_v2rayn_keyboard });
        await ctx.answerCallbackQuery();
    });
}


const MacOSTutorials = (bot: Bot) => {
    const text = "اپلیکیشن مدنظر را انتخاب کنید:";

    // ===> macos
    const keyboard = new InlineKeyboard()
        .text("برگشت", "downloads")
        .text("صفحه اصلی", "mainMenu");
    bot.callbackQuery("downloads:macos", async (ctx) => {
        await ctx.editMessageText(text, { reply_markup: keyboard });
        await ctx.answerCallbackQuery();
    });
}