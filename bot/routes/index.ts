import express, { Express, Request, Response } from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import { MyBot } from '..';
import { AdminGP, SuperAdmin } from '../config';
import QRCode from 'qrcode'
import fs from "fs"
import path from 'path';

export default function EndPoint(bot: MyBot) {
    const app: Express = express()
    const router = express.Router()
    app.use(bodyParser.json())


    router.get('/temp/:name', async (req, res) => {
        const { name } = req.params
        const filePath = 'temp/' + name
        try {
            res.sendFile(filePath, { root: __dirname })
        }
        catch (err) {
            res.send('Not Found')
        }
    })

    router.get('/qrcode', async (req: Request, res: Response) => {
        const suburl = req.query.content as string || "https://EZvpn.co/"
        try {
            const filename = Date.now() + ".png"
            await QRCode.toFile("temp/" + filename, suburl)
            res.sendFile(path.join(__dirname, "../../temp/" + filename))
            // res.send(`
            //     <html>
            //     <head>
            //         <title>Subscription</title>
            //         <link rel="canonical" href="/">
            //         <meta charset="utf-8">
            //         <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
            //         <meta name="title" content="Subscription">
            //         <meta name="author" content="ezvpn.co">
            //         <meta name="description" content="">
            //         <meta property="og:type" content="website">
            //         <meta property="og:url" content="http://bot.ezvpn.co">
            //         <meta property="og:title" content="Subscription">
            //         <meta property="og:description" content="">
            //         <meta property="og:image" content="${img}">
            //         <meta property="twitter:card" content="summary_large_image">
            //         <meta property="twitter:url" content="http://bot.ezvpn.co">
            //         <meta property="twitter:title" content="Subscription">
            //         <meta property="twitter:description" content="">
            //         <meta property="twitter:image" content="${img}">
            //     </head>
            //     <body>
            //     <img src="${img}" />
            //     1
            //     </body>
            //     </html>
            // `)
        } catch (err) {
            console.log(err)
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