import express, { Express, Request, Response } from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import { MyBot } from '..';
import { SuperAdmin } from '../config';


export default function EndPoint(bot: MyBot) {
    const app: Express = express()
    const router = express.Router()
    app.use(bodyParser.json())

    router.get('/qrcode', (req: Request, res: Response) => {
        res.send("QRCODE")
    })

    router.post('/payment', (req: Request, res: Response) => {
        bot.api.sendMessage(SuperAdmin, "Text2")
        console.log(req.body)
        // bot.api.sendMessage(SuperAdmin, )
        res.send("Payment")
    })

    router.get('/', (req: Request, res: Response) => {
        res.status(301).redirect("https://t.me/EZvpnCo_bot")
    })

    app.use(cors());
    app.use(router);
    app.listen(1551, () => console.log('Listening on port 1551'));
}