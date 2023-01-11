import { Bot, InlineKeyboard, } from "grammy";
import { Admins as admins } from "../config";
import moment from "moment";
import { MyBot, MyContext } from "../bot";
import { EmojiName } from "@grammyjs/emoji/out/emoji"

type server = {
    id: number,
    name: string,
    description: string,
    created: Date,
    country: string,
    location: string,
    flag: EmojiName,
    iso: string,
    ip: string,
    username: string,
    password: string,
    domain: string,
    deleted: false,
}

const serversList: server[] = [
    {
        id: 1,

        name: "Bahrain-01",
        description: "description",
        location: "Bahrain/Unja",
        ip: "38.54.2.172",
        username: "ubuntu",
        password: "(C[3Sz{WB8",

        created: moment("2022-12-28 12:45:44").toDate(),
        country: "Bahrain",
        flag: "flag_bahrain",
        iso: "bh",
        domain: "bh01.ezvpn.co",
        deleted: false,
    }
]

const ManagementServers = (bot: MyBot) => {

    const genServersListKeyboard = (ctx: MyContext) => {
        const keyboard = new InlineKeyboard()

        serversList.forEach((v, i) => {
            keyboard
                .text(v.name + ctx.emoji` ${v.flag}`, "management:servers:" + v.id)
                .row()
        })

        keyboard
            .switchInlineCurrent("➕ افزودن سرور جدید", "management:servers:add:Germany-07(Description)Germany/Frankfurt:ip username password")
            .row()
            .text("↪️", "management")
            .text("🏠", "mainMenu")

        return keyboard;
    }


    bot.callbackQuery("management:servers", async (ctx) => {
        const _text = "📡 مدیریت سرورها"
        const _keyboard = genServersListKeyboard(ctx)
        await ctx.editMessageText(_text, { reply_markup: _keyboard });
        await ctx.answerCallbackQuery();
    });


    bot.callbackQuery(/(management:servers:)\d{1,}/g, async (ctx) => {
        const id = parseInt(ctx.match.toString().replace("management:servers:", ""));
        const _text = "server " + id
        const _keyboard = new InlineKeyboard()
            .text("↪️", "management:servers")
            .text("🏠", "mainMenu")
            .text("🎛", "management")

        await ctx.editMessageText(_text, { reply_markup: _keyboard });
        await ctx.answerCallbackQuery();
    });

    bot.inlineQuery(/management:servers:add:(.*)\((.*)\)(.*)\/(.*):(.*) (.*) (.*)/, async (ctx) => {
        const mm = ctx.match;
        await ctx.reply("Hello" + JSON.stringify(mm))
        await ctx.answerInlineQuery(
            [
                {
                    type: "article",
                    id: "grammy-website",
                    title: "grammY",
                    input_message_content: {
                        message_text:
                            "<b>grammY</b> is the best way to create your own Telegram bots. \
They even have a pretty website! 👇",
                        parse_mode: "HTML",
                    },
                    reply_markup: new InlineKeyboard().url(
                        "grammY website",
                        "https://grammy.dev/",
                    ),
                    url: "https://grammy.dev/",
                    description: "The Telegram Bot Framework.",
                },
            ],
            { cache_time: 30 * 24 * 3600 }, // one month in seconds
        );
    });

    bot.inlineQuery(/management:servers:add /, async (ctx) => {
        await ctx.answerInlineQuery(
            [
                {
                    type: "article",
                    id: "grammy-website",
                    title: "grammY",
                    input_message_content: {
                        message_text:
                            "<b>grammY</b> is the best way to create your own Telegram bots. \
They even have a pretty website! 👇",
                        parse_mode: "HTML",
                    },
                    reply_markup: new InlineKeyboard().url(
                        "grammY website",
                        "https://grammy.dev/",
                    ),
                    url: "https://grammy.dev/",
                    description: "The Telegram Bot Framework.",
                },
            ],
            { cache_time: 30 * 24 * 3600 }, // one month in seconds
        );
    });

    // bot.callbackQuery("management:servers:add", async (ctx) => {
    //     const _text = `❕برای افزودن سرور به شکل زیر دستور را وارد کنید: 


    //     `
    //     const _keyboard = new InlineKeyboard()
    //         .switchInlineCurrent("")
    //         .row()
    //         .text("↪️", "management:servers")
    //         .text("🏠", "mainMenu")
    //         .text("🎛", "management")

    //     await ctx.editMessageText(_text, { parse_mode: 'MarkdownV2', reply_markup: _keyboard });
    //     await ctx.answerCallbackQuery();
    // });


};

export default ManagementServers;
