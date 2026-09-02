export type Lang = "uz" | "ru" | "en";

export const LANGS: { code: Lang; label: string }[] = [
  { code: "uz", label: "UZ" },
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
];

export type Dict = {
  brand: string;
  cover: { kicker: string; title: string; subtitle: string; cta: string; date: string };
  nav: { intro: string; greeting: string; value: string; memories: string; quotes: string; gift: string };
  greeting: { heading: string; body: string; signOff: string };
  value: {
    heading: string;
    text: string;
    hint: string;
    counter: (n: number) => string;
  };
  memories: { heading: string; text: string; captions: string[] };
  quotes: { heading: string; items: string[] };
  gift: {
    heading: string;
    text: string;
    open: string;
    certTitle: string;
    certSubtitle: string;
    certBody: string;
    to: (name: string) => string;
    from: (name: string) => string;
    promoLabel: string;
    promo: string;
    copied: string;
    share: string;
    shareCopied: string;
  };
  personalize: {
    title: string;
    subtitle: string;
    recipient: string;
    recipientPh: string;
    sender: string;
    senderPh: string;
    save: string;
    saving: string;
    done: string;
    copyLink: string;
    error: string;
    open: string;
    cancel: string;
  };
  music: { on: string; off: string };
  defaults: { recipient: string; sender: string };
};

export const DICTS: Record<Lang, Dict> = {
  uz: {
    brand: "WebInvite",
    cover: {
      kicker: "1-oktyabr",
      title: "Ustozlarga Ehtirom",
      subtitle: "O'qituvchi va murabbiylar kuniga bag'ishlangan hikoya",
      cta: "Boshlash",
      date: "1-oktyabr — O'qituvchi va murabbiylar kuni",
    },
    nav: {
      intro: "Kirish",
      greeting: "Tabrik",
      value: "Ustozlik qadri",
      memories: "Xotiralar",
      quotes: "Minnatdorchilik",
      gift: "Sovg'a",
    },
    greeting: {
      heading: "Qadrli ustoz",
      body: "Sizni 1-oktyabr — O'qituvchi va murabbiylar kuni bilan chin qalbdan tabriklaymiz! Siz bergan bilim, sabr va mehr minglab yuraklarda nur bo'lib yashaydi. Har bir darsingiz — kelajakka qo'yilgan g'isht, har bir so'zingiz — umrbod eslanadigan saboq. Sog'lik, quvonch va bitmas ilhom tilaymiz.",
      signOff: "Hurmat bilan,",
    },
    value: {
      heading: "Bir ustoz ming yulduzni yoqadi",
      text: "Ustoz — bu shunchaki kasb emas, bu qorong'ida chiroq yoqish san'ati. U bir shamni yoqadi, o'sha sham yuzta boshqa shamni yoqadi va dunyo yorishadi.",
      hint: "Yulduz yoqish uchun bosing",
      counter: (n) => `Siz ${n} ta yulduz yoqdingiz`,
    },
    memories: {
      heading: "Xotiralar albomi",
      text: "Doska bo'ri, kuz gullari va oynadan tushgan quyosh — hech qachon unutilmaydigan lahzalar.",
      captions: ["Birinchi dars", "Bilim chirog'i", "Kuz guldastasi"],
    },
    quotes: {
      heading: "Minnatdorchilik so'zlari",
      items: [
        "Ustoz otangdek ulug'.",
        "Bilim — eng katta boylik, uni bergan inson — eng aziz insondir.",
        "Siz o'rgatgan bir so'z butun bir umrni o'zgartirdi.",
        "Yaxshi ustoz umid uyg'otadi, tasavvurni yoqadi va ilmga muhabbat singdiradi.",
      ],
    },
    gift: {
      heading: "Sizga kichik sovg'a",
      text: "Qutini oching — ichida siz uchun maxsus sertifikat bor.",
      open: "Qutini ochish",
      certTitle: "SERTIFIKAT",
      certSubtitle: "O'qituvchi va murabbiylar kuni sharafiga",
      certBody:
        "Siz WebInvite raqamli taklifnomalar jamoasidan istalgancha taklifnoma xaridlaringiz uchun 1 yilgacha 30% chegirmaga ega bo'ldingiz! Tabriklaymiz!",
      to: (name) => `Kimga: ${name}`,
      from: (name) => `Kimdan: ${name}`,
      promoLabel: "PROMOKOD",
      promo: "Ustoz2026",
      copied: "Nusxalandi!",
      share: "Ulashish",
      shareCopied: "Havola nusxalandi!",
    },
    personalize: {
      title: "Tabriknomani shaxsiylashtiring",
      subtitle: "Ismlarni kiriting va o'zingizning havolangizni oling.",
      recipient: "Kimga tabriklamoqchisiz?",
      recipientPh: "Masalan: Nodira opa",
      sender: "Sizning ismingiz",
      senderPh: "Masalan: 11-A sinf o'quvchilari",
      save: "Saqlash",
      saving: "Saqlanmoqda...",
      done: "Tayyor! Havolangiz:",
      copyLink: "Havolani nusxalash",
      error: "Xatolik yuz berdi. Qaytadan urinib ko'ring.",
      open: "Ochish",
      cancel: "Yopish",
    },
    music: { on: "Musiqa yoqilgan", off: "Musiqa o'chirilgan" },
    defaults: { recipient: "Qadrli ustozimiz", sender: "WebInvite jamoasi" },
  },
  ru: {
    brand: "WebInvite",
    cover: {
      kicker: "1 октября",
      title: "Почтение Учителям",
      subtitle: "История, посвящённая Дню учителя и наставника",
      cta: "Начать",
      date: "1 октября — День учителя и наставника",
    },
    nav: {
      intro: "Начало",
      greeting: "Поздравление",
      value: "Ценность учителя",
      memories: "Воспоминания",
      quotes: "Благодарность",
      gift: "Подарок",
    },
    greeting: {
      heading: "Дорогой учитель",
      body: "От всего сердца поздравляем Вас с 1 октября — Днём учителя и наставника! Знания, терпение и тепло, которые Вы дарите, светом живут в тысячах сердец. Каждый Ваш урок — кирпичик будущего, каждое слово — урок на всю жизнь. Желаем здоровья, радости и неиссякаемого вдохновения.",
      signOff: "С уважением,",
    },
    value: {
      heading: "Один учитель зажигает тысячу звёзд",
      text: "Учитель — это не просто профессия, это искусство зажигать свет в темноте. Он зажигает одну свечу, та зажигает сотню других — и мир становится светлее.",
      hint: "Нажмите, чтобы зажечь звезду",
      counter: (n) => `Вы зажгли ${n} звёзд`,
    },
    memories: {
      heading: "Альбом воспоминаний",
      text: "Мел на доске, осенние цветы и солнце в окне — мгновения, которые не забываются.",
      captions: ["Первый урок", "Свет знаний", "Осенний букет"],
    },
    quotes: {
      heading: "Слова благодарности",
      items: [
        "Учитель велик, как отец.",
        "Знание — величайшее богатство, а тот, кто его дал, — самый дорогой человек.",
        "Одно Ваше слово изменило целую жизнь.",
        "Хороший учитель пробуждает надежду, зажигает воображение и прививает любовь к знанию.",
      ],
    },
    gift: {
      heading: "Небольшой подарок для Вас",
      text: "Откройте коробку — внутри особый сертификат.",
      open: "Открыть коробку",
      certTitle: "СЕРТИФИКАТ",
      certSubtitle: "В честь Дня учителя и наставника",
      certBody:
        "Вы получили скидку 30% сроком на 1 год на любые покупки приглашений от команды цифровых приглашений WebInvite! Поздравляем!",
      to: (name) => `Кому: ${name}`,
      from: (name) => `От: ${name}`,
      promoLabel: "ПРОМОКОД",
      promo: "Ustoz2026",
      copied: "Скопировано!",
      share: "Поделиться",
      shareCopied: "Ссылка скопирована!",
    },
    personalize: {
      title: "Персонализируйте поздравление",
      subtitle: "Введите имена и получите свою ссылку.",
      recipient: "Кого Вы поздравляете?",
      recipientPh: "Например: Нодира Каримовна",
      sender: "Ваше имя",
      senderPh: "Например: ученики 11-А класса",
      save: "Сохранить",
      saving: "Сохранение...",
      done: "Готово! Ваша ссылка:",
      copyLink: "Скопировать ссылку",
      error: "Произошла ошибка. Попробуйте ещё раз.",
      open: "Открыть",
      cancel: "Закрыть",
    },
    music: { on: "Музыка включена", off: "Музыка выключена" },
    defaults: { recipient: "Наш дорогой учитель", sender: "Команда WebInvite" },
  },
  en: {
    brand: "WebInvite",
    cover: {
      kicker: "October 1",
      title: "Honoring Our Teachers",
      subtitle: "A story dedicated to Teachers' and Mentors' Day",
      cta: "Begin",
      date: "October 1 — Teachers' and Mentors' Day",
    },
    nav: {
      intro: "Opening",
      greeting: "Greeting",
      value: "The Teacher",
      memories: "Memories",
      quotes: "Gratitude",
      gift: "Gift",
    },
    greeting: {
      heading: "Dear Teacher",
      body: "Warmest congratulations on October 1 — Teachers' and Mentors' Day! The knowledge, patience and kindness you give live on as light in thousands of hearts. Every lesson you teach is a brick in the future; every word, a lesson for life. We wish you health, joy and endless inspiration.",
      signOff: "With respect,",
    },
    value: {
      heading: "One teacher lights a thousand stars",
      text: "Teaching is not merely a profession — it is the art of lighting a lamp in the dark. One candle lit becomes a hundred, and the world grows brighter.",
      hint: "Tap to light a star",
      counter: (n) => `You lit ${n} stars`,
    },
    memories: {
      heading: "Album of memories",
      text: "Chalk dust, autumn flowers and sunlight through the window — moments never forgotten.",
      captions: ["The first lesson", "The light of knowledge", "An autumn bouquet"],
    },
    quotes: {
      heading: "Words of gratitude",
      items: [
        "A teacher is as revered as a parent.",
        "Knowledge is the greatest wealth, and the one who gives it is the dearest of all.",
        "One word you taught me changed an entire life.",
        "A great teacher awakens hope, ignites imagination and instills a love of learning.",
      ],
    },
    gift: {
      heading: "A small gift for you",
      text: "Open the box — a special certificate is waiting inside.",
      open: "Open the box",
      certTitle: "CERTIFICATE",
      certSubtitle: "In honor of Teachers' and Mentors' Day",
      certBody:
        "You have received a 30% discount for a full year on any invitation purchases from the WebInvite digital invitations team! Congratulations!",
      to: (name) => `To: ${name}`,
      from: (name) => `From: ${name}`,
      promoLabel: "PROMO CODE",
      promo: "Ustoz2026",
      copied: "Copied!",
      share: "Share",
      shareCopied: "Link copied!",
    },
    personalize: {
      title: "Personalize this greeting",
      subtitle: "Enter the names and get your own link.",
      recipient: "Who are you congratulating?",
      recipientPh: "e.g. Ms. Nodira",
      sender: "Your name",
      senderPh: "e.g. Class 11-A",
      save: "Save",
      saving: "Saving...",
      done: "Done! Your link:",
      copyLink: "Copy link",
      error: "Something went wrong. Please try again.",
      open: "Open",
      cancel: "Close",
    },
    music: { on: "Music on", off: "Music off" },
    defaults: { recipient: "Our dear teacher", sender: "The WebInvite team" },
  },
};
