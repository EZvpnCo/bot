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
    created: Date | null,
    country: string,
    flag: EmojiName,
    iso: string,
    ip: string,
    username: string,
    password: string,
    domain: string,
    deleted: false | null,
} | null

const getFlagEmoji = (country: string) => {
    return flagCountryList[country] || 'bug';
}

const tempServers: serverType[] = []
const addTempServer = (server: serverType) => {
    tempServers.push(server)
    return tempServers.length - 1
}

const getTempServer = (id: number) => {
    return tempServers[id]
}

const removeTempServer = (id: number) => {
    tempServers[id] = null
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
                .text(v!.name + ctx.emoji` ${v!.flag}`, "management:servers:" + v!.id)
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

            created: null,
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
    bot.inlineQuery(/management:servers:add:\n(.*)-(.*)\n(.*)\n(.*)\n(.*)\n(.*)/, async (ctx) => {
        try {
            const server = extractServer(ctx.match!);
            const tempID = addTempServer(server)
            const _text = ctx.emoji`${server.flag}` + ` <b>${server.name}</b>
<code><span class="tg-spoiler">${server.username}@${server.ip}:${server.password}</span></code>
${server.country} | ${server.iso}
<b>Domain:</b> <code>${server.domain}</code>
<pre>${server.description}</pre>

<code>management:servers:add:${tempID}</code>
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
                        url: server.domain,
                        description: `${server.username}@${server.ip}\n` + ctx.emoji`${server.flag}` + ` ${server.country} | ${server.iso}`,
                    },
                ],
                { cache_time: 0, },
            );
        }
        catch (e) {
            console.log(e)
        }

    });

    bot.hears(/(management:servers:add:)\d{1,}/g, (ctx, _next) => {
        if (!ctx?.message?.via_bot) return _next()
        else {
            const tempID = parseInt(ctx.match.toString().replace("management:servers:add:", ""));
            const bellow_keyboard = new InlineKeyboard()
                .text("✅ تایید", "management:servers:add:confirm" + tempID)

            ctx.reply("تایید می کنید؟", { reply_markup: bellow_keyboard, reply_to_message_id: ctx.message.message_id })
        }
    });

    bot.callbackQuery(/(management:servers:add:confirm)\d{1,}/g, async (ctx) => {
        const tempID = parseInt(ctx.match.toString().replace("management:servers:add:confirm", ""));
        const server = getTempServer(tempID)

        serversList.push(server)

        removeTempServer(tempID)

        const keys = new InlineKeyboard().text("✅ ثبت شد")
        await ctx.editMessageReplyMarkup({ reply_markup: keys });
        await ctx.answerCallbackQuery(server?.name + " ✅ ثبت شد");
    });
};

export default ManagementServers;
