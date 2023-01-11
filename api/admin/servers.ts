import { Bot, InlineKeyboard, } from "grammy";
import { Admins as admins, flagCountryList } from "../config";
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

const getFlagEmoji = (country: string) => {
    return flagCountryList[country] || 'bug';
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


    // ====> add server
    const regAdd = /management:servers:add:\n(.*)-(.*)\n(.*)\n(.*)\n(.*)\n(.*)/
    const extractServer = (match: string | RegExpMatchArray) => {
        const code = match[2]
        const iso = countries.getAlpha2Code(match[1], "en").toLowerCase()
        const domain = iso + code + ".ezvpn.co"
        const country = match[1]
        const name = match[1] + "-" + code
        let flag: EmojiName = getFlagEmoji(country.toLowerCase())

        const server: serverType = {
            id: null,
            name,
            description: match![6],

            created: moment().toDate(),
            country,

            ip: match![3],
            username: match[4],
            password: match[5],
            domain,

            flag,
            iso,

            deleted: false
        }
        return server;
    }
    bot.inlineQuery(regAdd, async (ctx) => {
        try {
            const server = extractServer(ctx.match!);
            console.log(ctx.match![0].replace(/(\r\n|\n|\r)/gm, "%"))
            const bellow_keyboard = new InlineKeyboard()
                .text("✅ تایید", "ctx.match![0]")
                .text("❌ لغو", "management:servers:add:cancel")

            const _text = ctx.emoji`${server.flag}` + ` <b>${server.name}</b>
<span class="tg-spoiler">${server.username}@${server.ip}:${server.password}</span>
${server.country} | ${server.iso}
<b>Domain:</b> <code>${server.domain}</code>
<i>${server.description}</i>
`
            await ctx.answerInlineQuery(
                [
                    {
                        type: "article",
                        id: server.name.toLowerCase(),
                        title: server.name,
                        input_message_content: {
                            message_text: _text,
                            parse_mode: "HTML",
                        },
                        reply_markup: bellow_keyboard,
                        url: server.domain,
                        description: `${server.username}@${server.ip}\n` + ctx.emoji`${server.flag}` + ` ${server.country} | ${server.iso}`,
                    },
                ],
                { cache_time: 100 },
            );
        }
        catch (e) {
            console.log(e)
        }

    });

    bot.callbackQuery(regAdd, async (ctx) => {
        const server = extractServer(ctx.match!);
        const keys = new InlineKeyboard().text("✅ ثبت شد")
        await ctx.editMessageReplyMarkup({ reply_markup: keys });
        await ctx.answerCallbackQuery("✅ ثبت شد");
    });

    bot.callbackQuery("management:servers:add:cancel", async (ctx) => {
        const keys = new InlineKeyboard().text("❌ لغو شد")
        await ctx.editMessageReplyMarkup({ reply_markup: keys });
        await ctx.answerCallbackQuery("❌ لغو شد");
    });
};

export default ManagementServers;
