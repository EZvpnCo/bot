import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { MyBot } from '..';


export default function EndPoint(bot: MyBot) {
    const app: Express = express();
    const router = express.Router()

    router.get('/', (req: Request, res: Response) => {
        res.send("All systems operational")
    })

    app.use(cors());
    app.use(router);
    app.listen(1551, () => console.log('Listening on port 1551'));
}