import { readFileSync, unlinkSync } from "fs";
import { Api, Bot, InputFile, RawApi } from "grammy";
import moment from "moment";
import mysqldump from "mysqldump";
import { MyContext } from "..";
import { AdminGP } from "../config";

export const BackupDB = async (bot: Bot<MyContext, Api<RawApi>>) => {
    const text = "Backup Started ...";
    const m = await bot.api.sendMessage(AdminGP, text);
    try {
        const datetime = moment().format("YYYY-MM-DD-HH-mm-ss")
        const databases = ['ezvpn_dashboard', 'ezvpn_bot', 'ezshell']
        for (let iii = 0; iii < databases.length; iii++) {
            const dbname = databases[iii]
            const ff = `temp/BackupDB_${dbname}_${datetime}.sql`
            await mysqldump({
                connection: {
                    host: '0.0.0.0',
                    user: 'root',
                    password: 'tehONDretSVERveRnive',
                    database: dbname,
                },
                dumpToFile: ff,
            });
            const _file = readFileSync(ff)
            await bot.api.sendDocument(AdminGP, new InputFile(_file, `BackupDB_${dbname}_${datetime}.sql`), { caption: `#Backup\n${dbname}\n${datetime}` })
            unlinkSync(ff)
        }
        await bot.api.deleteMessage(m.chat.id, m.message_id)
    } catch (error) {
        await bot.api.editMessageText(m.chat.id, m.message_id, "Backup Failed")
        console.log(error);
    }
}