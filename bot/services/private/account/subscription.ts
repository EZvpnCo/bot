import axios from "axios";
import { Bot, InlineKeyboard, InputFile, NextFunction } from "grammy";
import AccountService from ".";
import { MyContext } from "../../..";
import * as apiService from "../../../api"
import QRCode from 'qrcode'


interface SubType {
    "json": string,
    "clash": string,
    "surfboard": string,

    "all": string,
    "vmess": string,
    "tjvmess": string,

    "ss": string,
    "v2ray": string,
    "trojan": string,
}


class AccountSubscriptionService {
    private bot;
    constructor(bot: Bot<MyContext>) {
        this.bot = bot;
    }

    public run() {
        this.bot.callbackQuery(["account:subscription", /^account:agency:users:detail:([0-9]+):subscription$/], this.response)
        this.bot.callbackQuery([
            /^account:subscription:(clash|surfboard|ss|v2ray|trojan|all|vmess|tjvmess|single_config)$/,
            /^account:agency:users:detail:([0-9]+):subscription:(clash|surfboard|ss|v2ray|trojan|all|vmess|tjvmess|single_config)$/
        ], this.detailSubscription)
    }



    private subscriptions: SubType | null = null
    private keyboard = async (ctx: MyContext) => {
        const keyboard = new InlineKeyboard()
        keyboard.text("🛠 آموزش اتصال", "tutorials").row()
        keyboard.text("👇 دریافت QR code 👇", "account:subscription:get_qrcode").row()
        if (Array.isArray(ctx.match) && /^account:agency:users:detail:([0-9]+):subscription$/.test(ctx.match[0])) {
            keyboard.text("Clash", "account:agency:users:detail:" + ctx.match[1] + ":subscription:clash")
            keyboard.text("Surfboard", "account:agency:users:detail:" + ctx.match[1] + ":subscription:surfboard")
            keyboard.row()
            keyboard.text("All", "account:agency:users:detail:" + ctx.match[1] + ":subscription:all")
            keyboard.text("VmessOnly", "account:agency:users:detail:" + ctx.match[1] + ":subscription:vmess")
            keyboard.text("TrojanVmess", "account:agency:users:detail:" + ctx.match[1] + ":subscription:tjvmess")
            keyboard.row()
            keyboard.text("ShadowSocks", "account:agency:users:detail:" + ctx.match[1] + ":subscription:ss")
            keyboard.text("V2ray", "account:agency:users:detail:" + ctx.match[1] + ":subscription:v2ray")
            keyboard.text("Trojan", "account:agency:users:detail:" + ctx.match[1] + ":subscription:trojan")
            keyboard.row()
            keyboard.text("دریافت کانفیگ تکی", "account:agency:users:detail:" + ctx.match[1] + ":subscription:single_config")
            keyboard.row()
            keyboard.text(ctx.t("back-btn"), "account:agency:users:detail:" + ctx.match[1])
        }
        else {
            keyboard.text("Clash", "account:subscription:clash")
            keyboard.text("Surfboard", "account:subscription:surfboard")
            keyboard.row()
            keyboard.text("All", "account:subscription:all")
            keyboard.text("VmessOnly", "account:subscription:vmess")
            keyboard.text("TrojanVmess", "account:subscription:tjvmess")
            keyboard.row()
            keyboard.text("ShadowSocks", "account:subscription:ss")
            keyboard.text("V2ray", "account:subscription:v2ray")
            keyboard.text("Trojan", "account:subscription:trojan")
            keyboard.row()
            keyboard.text("دریافت کانفیگ تکی", "account:subscription:single_config")
            keyboard.row()
            keyboard.text(ctx.t("back-btn"), "account")
        }
        keyboard.text(ctx.t("back-to-home-btn"), "menu")
        return keyboard
    }

    private text = async (ctx: MyContext) => {
        let _data = ''
        _data += '<b>🔗 JSON:</b>\n<pre>' + this.subscriptions?.json + '</pre>\n\n'
        _data += '<b>🔗 Clash:</b>\n<pre>' + this.subscriptions?.clash + '</pre>\n\n'
        _data += '<b>🔗 Surfboard:</b>\n<pre>' + this.subscriptions?.surfboard + '</pre>\n\n'

        _data += '<b>🔗 All:</b>\n<pre>' + this.subscriptions?.all + '</pre>\n\n'
        _data += '<b>🔗 VmessOnly:</b>\n<pre>' + this.subscriptions?.vmess + '</pre>\n\n'
        _data += '<b>🔗 TrojanVmess:</b>\n<pre>' + this.subscriptions?.tjvmess + '</pre>\n\n'

        _data += '<b>🔗 ShadowSocks:</b>\n<pre>' + this.subscriptions?.ss + '</pre>\n\n'
        _data += '<b>🔗 V2ray:</b>\n<pre>' + this.subscriptions?.v2ray + '</pre>\n\n'
        _data += '<b>🔗 Trojan:</b>\n<pre>' + this.subscriptions?.trojan + '</pre>'

        return `🔻 <b>اطلاعات اشتراک:</b>\n\n${_data}`
    }

    public response = async (ctx: MyContext) => {
        ctx.session.inputState = null

        try {
            let uid = ctx.session.user?.account_id
            if (Array.isArray(ctx.match) && /^account:agency:users:detail:([0-9]+):subscription$/.test(ctx.match[0])) {
                uid = parseInt(ctx.match[1])
            }

            const response = await apiService.GET()("account/subscription?user=" + uid)
            this.subscriptions = response.data.subscription
            await ctx.editMessageText(
                await this.text(ctx),
                { parse_mode: "HTML", reply_markup: await this.keyboard(ctx) }
            );
            await ctx.answerCallbackQuery();
        } catch (error) {

            if (axios.isAxiosError(error)) {
                await ctx.reply("Error: SystemError")
            } else {
                const ee = error as { data: { msg: string } }
                await ctx.reply("Error: " + ee.data.msg)
            }
            setTimeout(async () => {
                if (Array.isArray(ctx.match) && /^account:agency:users:detail:([0-9]+):subscription$/.test(ctx.match[0])) {
                    const accountID = ctx.match[1]
                    ctx.match = [`account:agency:users:detail:${accountID}`, accountID]
                }
                new AccountService(this.bot).response(ctx)
            }, 500)
        }

        return
    }



    private detailSubscription = async (ctx: MyContext) => {
        ctx.session.inputState = null


        try {
            let uid = ctx.session.user?.account_id
            let subtype = ctx.match![1]!
            if (Array.isArray(ctx.match) && /^account:agency:users:detail:([0-9]+):subscription:(clash|surfboard|ss|v2ray|trojan|all|vmess|tjvmess|single_config)$/.test(ctx.match[0])) {
                uid = parseInt(ctx.match[1])
                subtype = ctx.match![2]!
            }

            const response = await apiService.GET()("account/subscription?user=" + uid)
            const s: SubType = response.data.subscription

            let suburl = null
            switch (subtype) {
                case 'json':
                    suburl = s.json
                    break
                case 'clash':
                    suburl = s.clash
                    break
                case 'surfboard':
                    suburl = s.surfboard
                    break
                case 'all':
                    suburl = s.all
                    break
                case 'vmess':
                    suburl = s.vmess
                    break
                case 'tjvmess':
                    suburl = s.tjvmess
                    break
                case 'ss':
                    suburl = s.ss
                    break
                case 'v2ray':
                    suburl = s.v2ray
                    break
                case 'trojan':
                    suburl = s.trojan
                    break
                case 'single_config':
                    const tj_url = s.trojan
                    const v2_url = s.v2ray
                    const ss_url = s.ss

                    try {
                        const tj_fetch = await fetch(tj_url)
                        const tj_text = (await tj_fetch.text()).toString()
                        const tj_arr = tj_text.split("\n")

                        const ss_fetch = await fetch(ss_url)
                        const ss_text = (await ss_fetch.text()).toString()
                        const ss_arr = ss_text.split(" ")

                        const v2_fetch = await fetch(v2_url)
                        const v2_text = (await v2_fetch.text()).toString()
                        const v2_arr = v2_text.split(" ")

                        const btnList: string[] = []
                        const buttons: { name: string, url: string }[] = []

                        if (Array.isArray(ctx.match) && /^account:agency:users:detail:([0-9]+):subscription:(clash|surfboard|ss|v2ray|trojan|all|vmess|tjvmess|single_config)$/.test(ctx.match[0])) {
                            ctx.reply("user of agent")
                            for (let i = 0; i < tj_arr.length; i++) {
                                const item = tj_arr[i].split("#")
                                const name = item[1]
                                if (!!name && !btnList.includes(name)) {
                                    btnList.push(name)
                                    buttons.push({ name, url: "account:agency:users:detail:" + ctx.match[1] + ":subscription:get_config:" + name })
                                }
                            }
                        }
                        else {
                            ctx.reply("user normal")
                            for (let i = 0; i < tj_arr.length; i++) {
                                const item = tj_arr[i].split("#")
                                const name = item[1]
                                if (!!name && !btnList.includes(name)) {
                                    btnList.push(name)
                                    buttons.push({ name, url: "account:subscription:get_config:" + name })
                                }
                            }
                        }
                        const keyboard = new InlineKeyboard()


                        for (let i = 0; i < buttons.length; i++) {
                            const item = buttons[i]
                            keyboard.text(item.name, item.url)
                        }

                        keyboard.text("برگشت", "menu").row()

                        await ctx.editMessageText(`لیست سرورها:`, { reply_markup: keyboard });

                    } catch (error) {
                        await ctx.reply("Err: " + error)
                    }





                    break
            }
            if (suburl) {
                await ctx.editMessageText(
                    `<a href="https://bot.ezvpn.co/qrcode/?content=${suburl}&_=${+new Date()}">🔻</a> <pre>${suburl}</pre>`,
                    { parse_mode: "HTML", reply_markup: await this.keyboard(ctx) }
                );
            }
            await ctx.answerCallbackQuery()
        } catch (error) {
            if (axios.isAxiosError(error)) {
                await ctx.reply("Error: SystemError")
            } else {
                const ee = error as { data: { msg: string } }
                await ctx.reply("Error: " + ee.data.msg)
            }
            setTimeout(async () => {
                if (Array.isArray(ctx.match) && /^account:agency:users:detail:([0-9]+):subscription:(clash|surfboard|ss|v2ray|trojan|all|vmess||single_config)$/.test(ctx.match[0])) {
                    const accountID = ctx.match[1]
                    ctx.match = [`account:agency:users:detail:${accountID}:subscription`, accountID]
                }
                this.response(ctx)
            }, 500)
        }

    }

}


export default AccountSubscriptionService