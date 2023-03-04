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

    router.get('/qrcode/:text', async (req: Request, res: Response) => {
        const suburl = req.params.text
        try {
            const qr = await QRCode.toBuffer(suburl)
            res.send(`
                <html>
                <head>
                <meta property="og:image" content="https://qr.io/logo/qr-background.png">
                <meta property="twitter:image" content="https://qr.io/logo/qr-background.png">
                </head>
                <body>
                <img src="${qr.toString('base64')}" />
                QRcode
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