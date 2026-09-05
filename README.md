# Teacher's Tribute

MA'LUMOTLAR: Mavzu: 1-oktyabr — O'qituvchi va murabbiylar kuniga bag'ishlangan interaktiv, "hikoya kabi" tabriknoma sahifasi (React + TS + Tailwind + Vite + Framer Motion) Musiqa: YouTube audio — https://youtu.be/-OquDU12Xgg (mute holda avtoplay, pastda estetik play/pause tugma — masalan aylanuvchi vinil plastinka ko'rinishida) Tillar: UZ / RU / EN — barcha matn, animatsiya izohlari va sertifikat 3 tilda to'liq

UMUMIY KONSEPSIYA: Sahifa oddiy tabriknoma emas, balki "ustozga minnatdorchilik yo'li" — foydalanuvchi scroll qilgan sari bir hikoya ochiladi: kirish → tabrik → ustozlik qadri → xotira/galereya → minnatdorchilik → sovg'a. Har bir bo'lim oldingisidan boshqacha fon, boshqacha kayfiyat va o'ziga xos mikro-animatsiyaga ega bo'lsin, lekin uslub uzluksiz (oltin-krem-jigarrang-yashil palitra) saqlansin.

DIZAYN VA ANIMATSIYA DETALLARI:

Cover: AI generatsiya qilingan fon (ochilayotgan kitob, uchayotgan qog'oz varaqlar, quyosh nuri) — sahifa yuklanganda kitob ochilgandek animatsiya, so'ng "Boshlash" degan yorqin tugma paydo bo'ladi

Scroll paytida parallax effekt: fon sekin, old plan tezroq harakatlanadi

Har bir bo'lim chegarasida nozik o'tish animatsiyasi (fade + slide, doska bo'r chizig'i uslubidagi divider)

Doimiy fonda: sekin uchayotgan gul barglari, yulduzchalar, va vaqti-vaqti bilan "bilim zarralari" — kichik kitob/qalam siluetlari suzib o'tadi

Kursor harakatiga sezgir yengil parallax (desktopda), mobil versiyada esa gyroscope asosida yengil harakat (agar sodda bo'lsa)

Shrift: sarlavhalar uchun nafis serif (masalan Playfair Display uslubida), matn uchun yumshoq sans-serif

BO'LIMLAR (hikoya tarzida):

Kirish — kitob ochilish animatsiyasi, sarlavha asta-sekin harf-harf paydo bo'ladi ("Ustozlarga Ehtirom...")

Tabrik — glassmorphism kartada asosiy tabrik matni, atrofida yengil porlash effekti (matnni keyinroq yuboraman)

Ustozlik qadri — "Bir ustoz ming yulduzni yoqadi" ruhida qisqa ilhomlantiruvchi matn, unga hamroh interaktiv element: bosilganda ekranda kichik yulduzcha "yonadigan" animatsiya

Xotira/Foto galereya — rasmlar polaroid/eski albom uslubida, biroz qiyshiq joylashgan, hover/tap qilganda tekislanib kattalashadi

Minnatdorchilik iqtiboslari — avtomatik almashinuvchi (carousel) iqtiboslar, har biri qo'lyozma shriftda "yozilayotgandek" animatsiya bilan chiqadi

Sovg'a bo'limi — pastda batafsil

SOVG'A QUTISI — ASOSIY "WOW" MOMENT: Katta, chiroyli bezatilgan sovg'a qutisi (lenta bilan) sahifa markazida turadi, yengil "pulsatsiya" animatsiyasi bilan e'tiborni tortadi Bosilganda: lenta yechiladi → qopqoq sakrab ochiladi → ichidan yorug'lik/konfetti portlashi chiqadi → qutidan sertifikat/qog'oz "uchib chiqib" ekran markazida yoyiladi (kabi flip/unfold animatsiyasi) Sertifikat dizayni: eski pergament yoki diplom uslubida, oltin ramka, muhr (aylana ichida "WI" logotipi) va lenta elementi bilan Matn (joriy tilga qarab):

UZ: "Siz WebInvite raqamli taklifnomalar jamoasidan istalgancha taklifnoma xaridlaringiz uchun 1 yilgacha 30% chegirmaga ega bo'ldingiz! Tabriklaymiz! PROMOKOD: Ustoz2026"

RU va EN — shu matnning tarjimalari

Promokod maxsus "shtamp" uslubida ko'rsatilsin, bosilganda "mo'hr bosilgandek" animatsiya + clipboard'ga nusxalanadi + "Nusxalandi!" bildirishnomasi chiqadi Sertifikat pastida ixtiyoriy "Ulashish" tugmasi (link nusxalash)

SHAXSIYLASHTIRISH (tahrirlash funksiyasi): Pastki burchakda nafis qalam (✏️) ikonkasi, bosilganda yengil oyna ochiladi 2 ta maydon: "Kimga tabriklamoqchisiz?" (matndagi umumiy murojaatni almashtiradi) va "Sizning ismingiz" (matndagi "WebInvite jamoasi" o'rniga chiqadi) "Saqlash" bosilganda Supabase "greetings" jadvaliga yozuv qo'shiladi (recipient_name, sender_name, unique slug, created_at) va foydalanuvchiga /tabrik/:slug havolasi beriladi Har bir slug — mustaqil klon, asl dizayn/animatsiya/sovg'a bo'limi bilan birga, faqat ismlar almashgan holda

WI TUGMASI: Pastki burchakda kichik, nafis "WI" belgisi — doimiy ko'rinadi, bosilganda yangi tab'da https://webinvite-six.vercel.app ochiladi

TEXNIK: Mobil-responsive, tez yuklanadigan (animatsiyalar performance uchun optimallashtirilgan, lazy-load rasmlar) RSVP kerak emas Supabase: faqat "greetings" jadvali (id, slug, recipient_name, sender_name, created_at) Scroll-based navigatsiya + yon tomonda kichik progress-indikator (qaysi bo'limda ekanini ko'rsatadi)

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3a06b1ae-8a41-4c8f-926b-3f50b9289dba).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
