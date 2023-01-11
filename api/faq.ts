import { Bot, InlineKeyboard } from "grammy";
import { MyBot } from "./bot";

const Faq = (bot: MyBot) => {
    // text
    const text = "🔻 از منوی زیر انتخاب کنید:";

    const faqList = [
        [
            "آیا امکان تست قبل خرید وجود دارد؟",
            "بله با ارسال ایمیل به ادمین میتونید درخواست یه اکانت تست بدین . اکانت تست 1 روزه 1 کاربره و با حجم 1 گیگ میباشد و شامل تمام سرویس های معمولی و پلاس هست."
        ],
        [
            "فرق سرویس پلاس و معمولی چیه؟",
            "سرویس های پلاس موقع نت ملی هم کار میکنه و دارای تعداد بیشتری سرور هستن نسبت به سرویس معمولی"
        ],
        [
            "سرویس ها چند کاربره هستند؟",
            "سرویس ها تک کاربره و 5 کاربره هستن در دوره های ماهانه و سه ماهه"
        ],
        [
            "چطوری درامد دلاری داشته باشیم؟",
            "شما با فروش سرویس های ما میتونید 20 درصد رو به عنوان پورسانت مستقیما به کیف پول خودتون منتقل کنید. برای اینکار نیازه که حساب کاربری خودتون رو از یوزر به ایجنت تغییر بدین. برای اینکار با ادمین در ارتباط باشین."
        ],
        [
            "بر روی چه دستگاه هایی کار میکنه؟",
            "بر روی تمامی دستگاه ها قابلیت نصب و فعالسازی وجود داره"
        ],
        [
            "بر روی چه اینترنتی کار میکنه؟",
            "روی تمامی اینترنت ها تست شده و کار میکنه ولی با توجه به اختلالات موجود قبل از خرید حتما اکانت تست دریافت کنید و تست کنید."
        ],
        [
            "تعرفه ها چند ماهه هستند؟",
            "سرویس ها در بازه های زمانی یک ماهه و سه ماهه ارائه میشه"
        ],
        [
            "از کدوم کشورا سرور دارید؟",
            "فعلا از کشور های آلمان هلند فرانسه آمریکا ترکیه بحرین آذربایجان و ... موجوده"
        ],
        [
            "با چه نرم افزاری کار میکنه؟",
            `اندروید: surfboard - v2rayng - one click
آیفون: one click - fair -rocket tool - shadowlink
ویندوز: ezvpn - v2rayn - qv2ray`,
        ],
        [
            "برای گیم سرویس موجوده؟",
            "بله برای گیم در لوکیشن های ترکیه آلمان و بحرین موجوده"
        ],
        [
            "برای ترید سرویس موجوده؟",
            "بله برای ترید سرور های ترکیه موجود هستن بدون leak dns"
        ],
    ];

    // keyboard
    const keyboard = new InlineKeyboard()
    faqList.map((v, index) => {
        keyboard.text(v[0], "faq:" + (index + 1)).row();
    });
    keyboard.text("صفحه اصلی 🏠", "mainMenu");

    // Handle the /faq command.
    bot.command("faq", (ctx) => {
        ctx.reply(text, { reply_markup: keyboard });
    });

    bot.callbackQuery("faq", async (ctx) => {
        await ctx.answerCallbackQuery();
        await ctx.editMessageText(text, { reply_markup: keyboard });
    });

    // faq answer
    bot.callbackQuery(/(faq:)\d{1,}/g, async (ctx) => {
        const q = parseInt(ctx.match.toString().replace("faq:", "")) - 1;
        const keyboard = new InlineKeyboard()
            .text("برگشت ↩️", "faq")
            .text("صفحه اصلی 🏠", "mainMenu");
        await ctx.editMessageText(`❓ ${faqList[q][0]}\n\n💭 ${faqList[q][1]}`, { reply_markup: keyboard });
        await ctx.answerCallbackQuery();
    });
};

export default Faq;