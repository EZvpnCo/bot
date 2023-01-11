import { Bot, InlineKeyboard, } from "grammy";
import { Admins as admins } from "../config";
import moment from "moment";
import { MyBot, MyContext } from "../bot";
import { EmojiName } from "@grammyjs/emoji/out/emoji"

import * as countries from "i18n-iso-countries"

type serverType = {
    id: number | null,
    name: string,
    description: string,
    created: Date,
    country: string,
    flag: EmojiName,
    iso: string,
    ip: string,
    username: string,
    password: string,
    domain: string,
    deleted: false | null,
}

const serversList: serverType[] = [
    {
        id: 1,

        name: "Bahrain-01",
        description: "description",
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
            .switchInlineCurrent("➕ افزودن سرور جدید", "management:servers:add:\nGermany-07\n38.54.2.172\nusername\npassword\nDescription")
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

    bot.inlineQuery(/management:servers:add:\n(.*)-(.*)\n(.*)\n(.*)\n(.*)\n(.*)/, async (ctx) => {
        const mch = ctx.match!;

        const code = mch[2]
        const iso = countries.getAlpha2Code(mch[1], "en").toLowerCase()
        const domain = iso + code + ".ezvpn.co"
        const flag = `flag_${mch[1].toLowerCase()}`
        const country = mch[1]
        const name = mch[1] + "-" + code
        const server: serverType = {
            id: null,
            name,
            description: mch![6],

            created: moment().toDate(),
            country,

            ip: mch![3],
            username: mch[4],
            password: mch[5],
            domain,

            // @ts-ignore
            flag,
            iso,


            deleted: false
        }


        await ctx.answerInlineQuery(
            [
                {
                    type: "article",
                    id: server.name.toLowerCase(),
                    title: server.name,
                    input_message_content: {
                        message_text: "Hello",
                        parse_mode: "MarkdownV2",
                    },
                    reply_markup: new InlineKeyboard()
                        .url(
                            "grammY website",
                            "https://grammy.dev/",
                        ),
                    url: server.domain,
                    description: `${server.username}@${server.ip}` +
                        ctx.emoji`${server.flag}` + ` ${server.country} | ${server.iso}`,
                    thumb_url: "https://cdn.jsdelivr.net/gh/mt-theme/metron-assets@3.0.2/metron/media/flags/1x1/nl.svg",
                },
            ],
            { cache_time: 100 },
        );
    });


};

export default ManagementServers;
