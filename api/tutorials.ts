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
        .text("صفحه اصلی 🏠", "mainMenu");

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
        .text("برگشت ↪️", "tutorials")
        .text("صفحه اصلی 🏠", "mainMenu");
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
        .text("برگشت ↪️", "tutorials")
        .text("صفحه اصلی 🏠", "mainMenu");
    bot.callbackQuery("tutorials:android", async (ctx) => {
        await ctx.editMessageText(text, { reply_markup: keyboard });
        await ctx.answerCallbackQuery();
    });

    const android_back_keyboard = new InlineKeyboard()
        .text("برگشت ↪️", "tutorials:android")
        .text("صفحه اصلی 🏠", "mainMenu");

    // ===> android:surfboard
    const android_surfboard_tutorial = "http://dl.ezvpn.co/tutorials/android/Surfboard.mp4";
    bot.callbackQuery("tutorials:android:surfboard", async (ctx) => {
        const text = `Android - Surfboard\n\n${android_surfboard_tutorial}`
        await ctx.editMessageText(text, { reply_markup: android_back_keyboard });
        await ctx.answerCallbackQuery();
    });

    // ===> android:oneclick
    const android_oneclick_tutorial = "http://dl.ezvpn.co/tutorials/android/OneClick.mp4";
    bot.callbackQuery("tutorials:android:oneclick", async (ctx) => {
        const text = `Android - OneClick\n\n${android_oneclick_tutorial}`
        await ctx.editMessageText(text, { reply_markup: android_back_keyboard });
        await ctx.answerCallbackQuery();
    });

    // ===> android:l2tp
    const android_l2tp_tutorial = "http://dl.ezvpn.co/tutorials/android/L2tp.mp4";
    bot.callbackQuery("tutorials:android:l2tp", async (ctx) => {
        const text = `Android - L2tp\n\n${android_l2tp_tutorial}`
        await ctx.editMessageText(text, { reply_markup: android_back_keyboard });
        await ctx.answerCallbackQuery();
    });

    // ===> android:openvpn
    const android_openvpn_tutorial = "http://dl.ezvpn.co/tutorials/android/OpenVPN.mp4";
    bot.callbackQuery("tutorials:android:openvpn", async (ctx) => {
        const text = `Android - OpenVPN\n\n${android_openvpn_tutorial}`
        await ctx.editMessageText(text, { reply_markup: android_back_keyboard });
        await ctx.answerCallbackQuery();
    });
}



const IOSTutorials = (bot: Bot) => {
    const text = "محتوای مدنظر را انتخاب کنید:";

    // ===> ios
    const keyboard = new InlineKeyboard()
        .text("OneClick", "tutorials:ios:oneclick")
        .text("L2tp", "tutorials:ios:l2tp")
        .row()
        .text("برگشت ↪️", "tutorials")
        .text("صفحه اصلی 🏠", "mainMenu");
    bot.callbackQuery("tutorials:ios", async (ctx) => {
        await ctx.editMessageText(text, { reply_markup: keyboard });
        await ctx.answerCallbackQuery();
    });

    const ios_back_keyboard = new InlineKeyboard()
        .text("برگشت ↪️", "tutorials:ios")
        .text("صفحه اصلی 🏠", "mainMenu");

    // ===> ios:oneclick
    const ios_oneclick_tutorial = "http://dl.ezvpn.co/tutorials/ios/OneClick.mp4";
    bot.callbackQuery("tutorials:ios:oneclick", async (ctx) => {
        const text = `iOS - OneClick\n\n${ios_oneclick_tutorial}`
        await ctx.editMessageText(text, { reply_markup: ios_back_keyboard });
        await ctx.answerCallbackQuery();
    });

    // ===> ios:l2tp
    const ios_l2tp_tutorial = "http://dl.ezvpn.co/tutorials/ios/L2tp.mp4";
    bot.callbackQuery("tutorials:ios:l2tp", async (ctx) => {
        const text = `iOS - L2tp\n\n${ios_l2tp_tutorial}`
        await ctx.editMessageText(text, { reply_markup: ios_back_keyboard });
        await ctx.answerCallbackQuery();
    });
}


const WindowsTutorials = (bot: Bot) => {
    const text = "محتوای مدنظر را انتخاب کنید:";

    // ===> windows
    const keyboard = new InlineKeyboard()
        .text("EZvpn", "tutorials:windows:ezvpn")
        .text("v2rayN", "tutorials:windows:v2rayn")
        .row()
        .text("L2tp", "tutorials:windows:l2tp")
        .row()
        .text("برگشت ↪️", "tutorials")
        .text("صفحه اصلی 🏠", "mainMenu");
    bot.callbackQuery("tutorials:windows", async (ctx) => {
        await ctx.editMessageText(text, { reply_markup: keyboard });
        await ctx.answerCallbackQuery();
    });

    const windows_back_keyboard = new InlineKeyboard()
        .text("برگشت ↪️", "tutorials:windows")
        .text("صفحه اصلی 🏠", "mainMenu");

    // ===> windows:ezvpn
    const windows_ezvpn_tutorial = "http://dl.ezvpn.co/tutorials/windows/EZvpn.mp4";
    bot.callbackQuery("tutorials:windows:ezvpn", async (ctx) => {
        const text = `Windows - EZvpn\n\n${windows_ezvpn_tutorial}`
        await ctx.editMessageText(text, { reply_markup: windows_back_keyboard });
        await ctx.answerCallbackQuery();
    });

    // ===> windows:v2rayn
    const windows_v2rayn_tutorial = "http://dl.ezvpn.co/tutorials/windows/v2rayN.mp4";
    bot.callbackQuery("tutorials:windows:v2rayn", async (ctx) => {
        const text = `Windows - v2rayN\n\n${windows_v2rayn_tutorial}`
        await ctx.editMessageText(text, { reply_markup: windows_back_keyboard });
        await ctx.answerCallbackQuery();
    });

    // ===> windows:l2tp
    const windows_l2tp_tutorial = "http://dl.ezvpn.co/tutorials/windows/L2tp.mp4";
    bot.callbackQuery("tutorials:windows:l2tp", async (ctx) => {
        const text = `Windows - L2tp\n\n${windows_l2tp_tutorial}`
        await ctx.editMessageText(text, { reply_markup: windows_back_keyboard });
        await ctx.answerCallbackQuery();
    });
}


const MacOSTutorials = (bot: Bot) => {
    const text = "محتوای مدنظر را انتخاب کنید:";

    // ===> macos
    const keyboard = new InlineKeyboard()
        .text("برگشت ↪️", "tutorials")
        .text("صفحه اصلی 🏠", "mainMenu");
    bot.callbackQuery("tutorials:macos", async (ctx) => {
        await ctx.editMessageText(text, { reply_markup: keyboard });
        await ctx.answerCallbackQuery();
    });
}
