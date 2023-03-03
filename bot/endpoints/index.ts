import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { MyBot } from '..';
import { SuperAdmin } from '../config';


export default function EndPoint(bot: MyBot) {
    const app: Express = express()
    const router = express.Router()

    router.get('/qrcode', (req: Request, res: Response) => {
        res.send("QRCODE")
    })

    router.post('/payment', (req: Request, res: Response) => {
        bot.api.sendMessage(SuperAdmin, "Text")
        bot.api.sendMessage(SuperAdmin, JSON.stringify(req.body))
        res.send("Payment")
    })

    router.get('/', (req: Request, res: Response) => {
        res.status(301).redirect("https://t.me/EZvpnCo_bot")
    })

    app.use(cors());
    app.use(router);
    app.listen(1551, () => console.log('Listening on port 1551'));
}