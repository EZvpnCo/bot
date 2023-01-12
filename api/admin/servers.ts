import { Bot, Context, InlineKeyboard, } from "grammy";
import { Admins as admins, flagCountryList } from "../config";
import moment from "moment";
import { MyBot, MyContext } from "../bot";
import { EmojiName } from "@grammyjs/emoji/out/emoji"

import * as countries from "i18n-iso-countries"
import { checkConnection, liveSSH } from "./ssh";

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
    port: number,
    domain: string,
    deleted: false | null,
}

const getFlagEmoji = (country: string) => {
    return flagCountryList[country] || 'bug';
}

const tempServers: (serverType | null)[] = []
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

        port: 22,

        created: moment("2022-12-28 12:45:44").toDate(),
        country: "Bahrain",
        flag: "flag_bahrain",
        iso: "bh",
        domain: "bh01.ezvpn.co",
        deleted: false,
    }
]
const createServer = async (server: serverType) => {
    server.created = moment().toDate();
    server.id = serversList[serversList.length - 1].id! + 1;
    serversList.push(server)
}

const getServer = async (_id: number): Promise<serverType | null> => {
    return serversList.filter(({ id }) => id == _id)[0]
}

const ManagementServers = (bot: MyBot) => {

    // ==================================================================================> servers list
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
            .text("🔄", "management:servers")
            .text("🏠", "mainMenu")
        return keyboard;
    }
    bot.callbackQuery("management:servers", async (ctx) => {
        try {
            const _text = `📡 مدیریت سرورها\nتعداد: ${serversList.length}`
            const _keyboard = genServersListKeyboard(ctx)
            await ctx.editMessageText(_text, { reply_markup: _keyboard });
            await ctx.answerCallbackQuery();
        } catch (error) {
            console.log(error)
        }
    });

    // ==================================================================================> manage a server
    bot.callbackQuery(/^management:servers:([0-9]+)$/, async (ctx) => {
        const id = parseInt(ctx.match[1]);
        const server = await getServer(id)
        if (!server) {
            await ctx.answerCallbackQuery("خطا در یافتن اطلاعات");
            return
        }
        const _text = ctx.emoji`${server.flag}` + ` <b>${server.name}</b>
<b>IP:</b> <code>${server.ip}</code>
<b>Username:</b> <code>${server.username}</code>
<b>Password:</b> <code>${server.password}</code>
<b>Port:</b> <code>${server.port}</code>
<b>Domain:</b> <code>${server.domain}</code>
<b>Created:</b> <code>${moment(server.created).format("YYYY-MM-DD HH:mm:ss")}</code>

__ <pre>${server.description}</pre>`

        const _keyboard = new InlineKeyboard()
            .text("❌ Delete", "management:servers:" + id + ":delete")
            .text("💤 Inactive", "management:servers:" + id + ":inactive")
            .row()
            .text("🕹 Check SSH", "management:servers:" + id + ":ssh:check")
            .text("🕹 Exec SSH", "management:servers:" + id + ":ssh:exec")
            .row()
            .text("✏️ ip", "management:servers:" + id + ":edit:ip")
            .text("✏️ user", "management:servers:" + id + ":edit:user")
            .text("✏️ pswd", "management:servers:" + id + ":edit:pswd")
            .row()
            .text("✏️ dmin", "management:servers:" + id + ":edit:dmin")
            .text("✏️ port", "management:servers:" + id + ":edit:port")
            .text("✏️ dscp", "management:servers:" + id + ":edit:dscp")
            .row()
            .text("Install XrayR", "management:servers:" + id + ":xrayr:install")
            .row()
            .text("Config XrayR", "management:servers:" + id + ":xrayr:config")
            .row()
            .text("Restart XrayR", "management:servers:" + id + ":xrayr:restart")
            .row()
            .text("↪️", "management:servers")
            .text("🏠", "mainMenu")
            .text("🎛", "management")

        await ctx.editMessageText(_text, { reply_markup: _keyboard, parse_mode: "HTML", });
        await ctx.answerCallbackQuery();
    });

    bot.callbackQuery(/^management:servers:([0-9]+):ssh:check$/, async (ctx) => {
        const serverID = parseInt(ctx.match[1]);
        const server = await getServer(serverID)
        if (!server) {
            await ctx.answerCallbackQuery("خطا در یافتن اطلاعات");
            return
        }
        const canConnect = await checkConnection({
            host: server.ip,
            port: server.port,
            username: server.username,
            password: server.password,
        })
        if (canConnect) await ctx.answerCallbackQuery("با موفقیت متصل شد ✅");
        else await ctx.answerCallbackQuery("متصل نشد ❌");
    });


    bot.callbackQuery(/^management:servers:([0-9]+):ssh:exec$/, async (ctx) => {
        const serverID = parseInt(ctx.match[1]);
        const server = await getServer(serverID)
        if (!server) {
            await ctx.answerCallbackQuery("خطا در یافتن اطلاعات");
            return
        }
        const canConnect = await checkConnection({
            host: server.ip,
            port: server.port,
            username: server.username,
            password: server.password,
        })
        if (canConnect) {
            const text = `
✅ با موفقیت متصل شد
برای اجرای دستورات به شکل زیر دستور را وارد کنید:

<code>management:servers:${serverID}:ssh:exec:command</code>`;
            await ctx.reply(text, { parse_mode: 'HTML' })
            await ctx.answerCallbackQuery();
        }
        else await ctx.answerCallbackQuery("متصل نشد ❌");
    });

    const sshCommand = async (ctx: MyContext, serverID: number, command: string) => {
        try {
            const server = await getServer(serverID)
            if (!server) {
                await ctx.reply("خطا در یافتن اطلاعات");
                return
            }

            const serverDisplay = ctx.emoji`${server.flag} ` + `<b>${server.name}</b>\n`
            const sshSession = `<span class="tg-spoiler">#ssh_session #ssh_server_${serverID}</span>\n`
            const _header = sshSession + serverDisplay
            const responseMessageID = (await ctx.reply(serverDisplay + '\n<i>Connecting...</i>', { reply_to_message_id: ctx.message?.message_id, parse_mode: 'HTML' })).message_id
            const _ssh = await liveSSH(
                {
                    host: server.ip,
                    port: server.port,
                    username: server.username,
                    password: server.password,
                },
                command,
                (result) => {
                    if (responseMessageID) {
                        ctx.api.editMessageText(ctx!.chat!.id, responseMessageID, _header + '<b>Response:</b>\n' + '<code>' + result + '</code>', { parse_mode: 'HTML' })
                    }
                }
            )
            if (_ssh) ctx.api.editMessageText(ctx!.chat!.id, responseMessageID, _header + '<b>Connected:</b>', { parse_mode: 'HTML' })
            else ctx.api.editMessageText(ctx!.chat!.id, responseMessageID, _header + '<b>Can\'t connected:</b>', { parse_mode: 'HTML' })
        } catch (error) {
            console.log("TC@@@", error)
        }
    }

    bot.hears(/^management:servers:([0-9]+):ssh:exec:(.*)$/s, async (ctx, _next) => {
        const command = ctx.match[2]
        const serverID = parseInt(ctx.match[1]);
        await sshCommand(ctx, serverID, command)
    });


    bot.on("message", async (ctx, _next) => {
        const g = ctx.chat.type === "private"
            &&
            ctx.msg.reply_to_message?.from?.id === ctx.me.id
            &&
            ctx?.msg?.reply_to_message?.text?.includes("#ssh_session #ssh_server_")
            &&
            admins.includes(ctx?.from?.id!)
        if (!g) return _next()
        const _t = ctx?.msg?.reply_to_message?.text!
        const regex = /#ssh_session #ssh_server_([0-9]+)/;
        const _p = _t.match(regex)
        const command = ctx.message.text!
        const serverID = parseInt(_p![1]);
        await sshCommand(ctx, serverID, command)
    });




    // =========================================================================================> add server
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

            deleted: false,
            port: 22
        }
        return server;
    }
    bot.inlineQuery(/^management:servers:add:\n(.*)-(.*)\n(.*)\n(.*)\n(.*)\n(.*)$/, async (ctx) => {
        try {
            const server = extractServer(ctx.match!);
            const _text = ctx.emoji`${server.flag}` + ` <b>${server.name}</b>
<code>${server.username}@${server.ip} -p ${server.port}</code>
<b>Password:</b> <span class="tg-spoiler">${server.password}</span>
${server.country} | ${server.iso}
<b>Domain:</b> <code>${server.domain}</code>
<pre>${server.description}</pre>
========================
<span class="tg-spoiler">${ctx.inlineQuery.query.replace(/(\r\n|\n|\r)/gm, ";;")}</span>
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
                        description: `${server.username}@${server.ip} -p ${server.port} \n` + ctx.emoji`${server.flag}` + ` ${server.country} | ${server.iso}`,
                    },
                ],
                { cache_time: 0, },
            );
        }
        catch (e) {
            console.log(e)
        }

    });

    bot.hears(/management:servers:add:;;(.*)-(.*);;(.*);;(.*);;(.*);;(.*)$/, async (ctx, _next) => {
        if (!ctx?.message?.via_bot) return _next()
        else {
            const server = extractServer(ctx.match!);
            const tempID = addTempServer(server);
            const bellow_keyboard = new InlineKeyboard()
                .text("✅ تایید", "management:servers:add:confirm:" + tempID)
                .text("❌ لغو", "management:servers:add:cancel:" + tempID)

            const cttx = await ctx.reply("تایید می کنید؟", { reply_markup: bellow_keyboard, reply_to_message_id: ctx.message.message_id })
            setTimeout(() => {
                const server = getTempServer(tempID)
                if (server) {
                    const bellow_keyboard = new InlineKeyboard().text("❌ لغو شد")
                    ctx.api.editMessageReplyMarkup(cttx.chat.id, cttx.message_id, { reply_markup: bellow_keyboard })
                    removeTempServer(tempID)
                }
            }, 5000)
        }
    });

    bot.callbackQuery(/^management:servers:add:confirm:([0-9]+)$/, async (ctx) => {
        console.log("%%%", ctx.match)
        const tempID = parseInt(ctx.match[1]);
        const server = getTempServer(tempID)
        if (!server) {
            await ctx.answerCallbackQuery("خطا در یافتن اطلاعات");
            return
        }
        removeTempServer(tempID)

        await createServer(server)

        const keys = new InlineKeyboard().text("✅ ثبت شد")
        await ctx.editMessageReplyMarkup({ reply_markup: keys });
        await ctx.answerCallbackQuery(server.name + " ✅ ثبت شد");
    });

    bot.callbackQuery(/^management:servers:add:cancel:([0-9]+)$/, async (ctx) => {
        const tempID = parseInt(ctx.match[1]);
        const server = getTempServer(tempID)
        if (!server) {
            await ctx.answerCallbackQuery("خطا در یافتن اطلاعات");
            return
        }
        removeTempServer(tempID)

        const keys = new InlineKeyboard().text("❌ لغو شد")
        await ctx.editMessageReplyMarkup({ reply_markup: keys });
        await ctx.answerCallbackQuery(server.name + " ❌ لغو شد");
    });
};

export default ManagementServers;
