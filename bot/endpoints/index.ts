import express, { Express, Request, Response } from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import { MyBot } from '..';
import { AdminGP, SuperAdmin } from '../config';
import QRCode from 'qrcode'


export default function EndPoint(bot: MyBot) {
    const app: Express = express()
    const router = express.Router()
    app.use(bodyParser.json())

    router.get('/qrcode', async (req: Request, res: Response) => {
        const suburl = req.query.content as string || "https://EZvpn.co/"
        try {
            const qr = await QRCode.toBuffer(suburl)
            const img = `data:image/png;base64,${qr.toString('base64')}`
            res.send(`
                <html>
                <head>
                    <title>Generate Customized QR Codes | QR.io</title>
                    <link rel="canonical" href="/">
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
                    <meta name="title" content="Generate Customized QR Codes | QR.io">
                    <meta name="author" content="QR.io">
                    <meta name="description" content="Generate fully customized QR Codes, with color &amp; shape, logo and keep track of how many people scan your QR Codes, from where and on what date.">
                    <meta name="keywords" content="qr, qr code, qr code generator">
                    <meta property="og:type" content="website">
                    <meta property="og:url" content="https://qr.io">
                    <meta property="og:title" content="Generate Customized QR Codes | QR.io">
                    <meta property="og:description" content="Generate fully customized QR Codes, with color &amp; shape, logo and keep track of how many people scan your QR Codes, from where and on what date.">
                    <meta property="og:image" content="https://qr.io/logo/qr-background.png">
                    <meta property="twitter:card" content="summary_large_image">
                    <meta property="twitter:url" content="https://qr.io">
                    <meta property="twitter:title" content="Generate Customized QR Codes | QR.io">
                    <meta property="twitter:description" content="Generate fully customized QR Codes, with color &amp; shape, logo and keep track of how many people scan your QR Codes, from where and on what date.">
                    <meta property="twitter:image" content="https://qr.io/logo/qr-background.png">
                </head>
                <body>
                <img src="${img}" />
                </body>
                </html>
            `)
        } catch (err) {
            res.send("Error")
        }
    })

    router.post('/payment', async (req: Request, res: Response) => {
        bot.api.sendMessage(SuperAdmin, "Text2")
        console.log(req.body)

        // get account id by order

        const text = `🔻 اکانت عباس 50 دلار شارژ شد`
        await bot.api.sendMessage(AdminGP, text)
        await bot.api.sendMessage(AdminGP, JSON.stringify(req.body))

        res.send("payment result")
    })

    router.get('/', (req: Request, res: Response) => {
        res.status(301).redirect("https://t.me/EZvpnCo_bot")
    })

    app.use(cors());
    app.use(router);
    app.listen(1551, () => console.log('Listening on port 1551'));
}