"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, CheckCircle2 } from "lucide-react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import { getGradeById } from "@/data/grades";
import { getSubjectById } from "@/data/subjects";
import type { GradeId, SubjectId } from "@/types/quiz";

const chapters: Record<
  GradeId,
  Partial<Record<SubjectId, { id: string; title: string; order: number }[]>>
> = {
  grade4: {
    math: [
      { id: "chapter-1", title: "اعداد و الگوها", order: 1 },
      { id: "chapter-2", title: "کسر", order: 2 },
      { id: "chapter-3", title: "ضرب و تقسیم", order: 3 },
      { id: "chapter-4", title: "اندازه‌گیری", order: 4 },
      { id: "chapter-5", title: "عددهای اعشاری", order: 5 },
      { id: "chapter-6", title: "شکل‌های هندسی", order: 6 },
      { id: "chapter-7", title: "آمار و احتمال", order: 7 },
    ],

    science: [
      { id: "chapter-1", title: "زنگ علوم", order: 1 },
      { id: "chapter-2", title: "مخلوط‌ها در زندگی", order: 2 },
      { id: "chapter-3", title: "انرژی، نیاز هر روز ما", order: 3 },
      { id: "chapter-4", title: "انرژی الکتریکی", order: 4 },
      { id: "chapter-5", title: "گرما و ماده", order: 5 },
      { id: "chapter-6", title: "سنگ‌ها", order: 6 },
      { id: "chapter-7", title: "آهن‌ربا در زندگی", order: 7 },
      { id: "chapter-8", title: "آسمان در شب", order: 8 },
      { id: "chapter-9", title: "بدن ما", order: 9 },
      { id: "chapter-10", title: "بی‌مهره‌ها", order: 10 },
      { id: "chapter-11", title: "مهره‌داران", order: 11 },
      { id: "chapter-12", title: "گوناگونی گیاهان", order: 12 },
      { id: "chapter-13", title: "زیستگاه", order: 13 },
    ],

    persian: [
      { id: "chapter-1", title: "آفریدگار زیبایی", order: 1 },
      { id: "chapter-2", title: "کوچ پرستوها", order: 2 },
      { id: "chapter-3", title: "راز نشانه‌ها", order: 3 },
      { id: "chapter-4", title: "ارزش علم", order: 4 },
      { id: "chapter-5", title: "رهایی از قفس", order: 5 },
      { id: "chapter-6", title: "آرش کمانگیر", order: 6 },
      { id: "chapter-7", title: "مهمان شهر ما", order: 7 },
      { id: "chapter-8", title: "باغچه اطفال", order: 8 },
      { id: "chapter-9", title: "فرمانده دل‌ها", order: 9 },
      { id: "chapter-10", title: "اتفاق ساده", order: 10 },
      { id: "chapter-11", title: "لطف حق", order: 11 },
      { id: "chapter-12", title: "ادب از که آموختی", order: 12 },
      { id: "chapter-13", title: "شیر و موش", order: 13 },
      { id: "chapter-14", title: "علم و عمل", order: 14 },
      { id: "chapter-15", title: "مدرسه هوشمند", order: 15 },
    ],

    social: [
      { id: "chapter-1", title: "محله‌ی ما", order: 1 },
      { id: "chapter-2", title: "شهر من، روستای من", order: 2 },
      { id: "chapter-3", title: "پیدایش شهر و روستا", order: 3 },
      { id: "chapter-4", title: "سفری به شهرهای باستانی", order: 4 },
      { id: "chapter-5", title: "کشور زیبای من", order: 5 },
      { id: "chapter-6", title: "ما ایرانی هستیم", order: 6 },
    ],

    hedye: [
      { id: "chapter-1", title: "دانه‌ای که نمی‌خواست بروید!", order: 1 },
      { id: "chapter-2", title: "کودکی بر آب", order: 2 },
      { id: "chapter-3", title: "ما به مسجد می‌رویم", order: 3 },
      { id: "chapter-4", title: "یک نماز و ده رکوع!", order: 4 },
      { id: "chapter-5", title: "سخنی که سه بار تکرار شد!", order: 5 },
      { id: "chapter-6", title: "حرمی با دو گنبد", order: 6 },
      { id: "chapter-7", title: "نماز در کوهستان", order: 7 },
      { id: "chapter-8", title: "دیدار دوست", order: 8 },
      { id: "chapter-9", title: "کودک شجاع", order: 9 },
      { id: "chapter-10", title: "روشن‌ترین شب", order: 10 },
      { id: "chapter-11", title: "درس یازدهم", order: 11 },
      { id: "chapter-12", title: "روزی برای تمام بچه‌ها", order: 12 },
      { id: "chapter-13", title: "خاله نرگس", order: 13 },
      { id: "chapter-14", title: "اولین بانوی مسلمان", order: 14 },
      { id: "chapter-15", title: "یک ماجرای زیبا", order: 15 },
      { id: "chapter-16", title: "اسب طلایی", order: 16 },
      { id: "chapter-17", title: "آقای بهاری، خانم بهاری", order: 17 },
      { id: "chapter-18", title: "چشمان همیشه باز", order: 18 },
      { id: "chapter-19", title: "خدا جون از تو ممنونم", order: 19 },
    ],

    quran: [
      { id: "chapter-1", title: "درس ۱", order: 1 },
      { id: "chapter-2", title: "درس ۲", order: 2 },
      { id: "chapter-3", title: "درس ۳", order: 3 },
      { id: "chapter-4", title: "درس ۴", order: 4 },
      { id: "chapter-5", title: "درس ۵", order: 5 },
      { id: "chapter-6", title: "درس ۶", order: 6 },
      { id: "chapter-7", title: "درس ۷", order: 7 },
      { id: "chapter-8", title: "درس ۸", order: 8 },
      { id: "chapter-9", title: "درس ۹", order: 9 },
      { id: "chapter-10", title: "درس ۱۰", order: 10 },
      { id: "chapter-11", title: "درس ۱۱", order: 11 },
      { id: "chapter-12", title: "درس ۱۲", order: 12 },
    ],
  },
  grade5: {
    math: [
      { id: "chapter-1", title: "عددنویسی و الگوها", order: 1 },
      { id: "chapter-2", title: "کسر", order: 2 },
      { id: "chapter-3", title: "نسبت، تناسب و درصد", order: 3 },
      { id: "chapter-4", title: "تقارن و چندضلعی‌ها", order: 4 },
      { id: "chapter-5", title: "عددهای اعشاری", order: 5 },
      { id: "chapter-6", title: "اندازه‌گیری", order: 6 },
      { id: "chapter-7", title: "آمار و احتمال", order: 7 },
    ],

    science: [
      { id: "chapter-1", title: "زنگ علوم", order: 1 },
      { id: "chapter-2", title: "ماده تغییر می‌کند", order: 2 },
      { id: "chapter-3", title: "رنگین‌کمان", order: 3 },
      { id: "chapter-4", title: "برگی از تاریخ زمین", order: 4 },
      { id: "chapter-5", title: "حرکت بدن", order: 5 },
      { id: "chapter-6", title: "چه خبر؟ (۱)", order: 6 },
      { id: "chapter-7", title: "چه خبر؟ (۲)", order: 7 },
      { id: "chapter-8", title: "کارها آسان می‌شود", order: 8 },
      { id: "chapter-9", title: "خاک با ارزش", order: 9 },
      { id: "chapter-10", title: "خاک حاصلخیز", order: 10 },
      { id: "chapter-11", title: "بکارید و بخورید", order: 11 },
      { id: "chapter-12", title: "از ریشه تا برگ", order: 12 },
      { id: "chapter-13", title: "بخورید و بیاشامید", order: 13 },
    ],

    persian: [
      { id: "chapter-1", title: "تماشاخانه", order: 1 },
      { id: "chapter-2", title: "فضل خدا", order: 2 },
      { id: "chapter-3", title: "رازی و ساخت بیمارستان", order: 3 },
      { id: "chapter-4", title: "بازرگان و پسران", order: 4 },
      { id: "chapter-5", title: "چنار و کدوبُن", order: 5 },
      { id: "chapter-6", title: "سرود ملی", order: 6 },
      { id: "chapter-7", title: "درس آزاد", order: 7 },
      { id: "chapter-8", title: "دفاع از میهن", order: 8 },
      { id: "chapter-9", title: "نام‌آوران دیروز، امروز و فردا", order: 9 },
      { id: "chapter-10", title: "نام‌آوران ایران", order: 10 },
      { id: "chapter-11", title: "رهایی از قفس", order: 11 },
      { id: "chapter-12", title: "کبوتر طوق‌دار", order: 12 },
      { id: "chapter-13", title: "روزی که باران می‌بارید", order: 13 },
      { id: "chapter-14", title: "خردمندان", order: 14 },
      { id: "chapter-15", title: "راز گل سرخ", order: 15 },
      { id: "chapter-16", title: "روزی که باران می‌بارید", order: 16 },
    ],

    social: [
      { id: "chapter-1", title: "زندگی با دیگران", order: 1 },
      { id: "chapter-2", title: "سرزمین ما", order: 2 },
      { id: "chapter-3", title: "زندگی در نواحی مختلف ایران", order: 3 },
      { id: "chapter-4", title: "زیستگاه‌های ایران", order: 4 },
      { id: "chapter-5", title: "ایران و همسایگان", order: 5 },
      { id: "chapter-6", title: "منابع و فعالیت‌های اقتصادی", order: 6 },
    ],

    hedye: [
      { id: "chapter-1", title: "دسته‌گلی از آسمان", order: 1 },
      { id: "chapter-2", title: "تنها او", order: 2 },
      { id: "chapter-3", title: "راستی و درستی", order: 3 },
      { id: "chapter-4", title: "از نوزاد بپرسید!", order: 4 },
      { id: "chapter-5", title: "گل صد برگ", order: 5 },
      { id: "chapter-6", title: "مال مردم", order: 6 },
      { id: "chapter-7", title: "رنگین‌کمان جمعه", order: 7 },
      { id: "chapter-8", title: "دو نامه", order: 8 },
      { id: "chapter-9", title: "یک جهان جشن!", order: 9 },
      { id: "chapter-10", title: "در ساحل دجله", order: 10 },
      { id: "chapter-11", title: "سرو سربلند سامرا", order: 11 },
      { id: "chapter-12", title: "خورشید پشت ابر", order: 12 },
      { id: "chapter-13", title: "کوچک‌های بزرگ!", order: 13 },
      { id: "chapter-14", title: "بزرگ‌مرد تاریخ", order: 14 },
      { id: "chapter-15", title: "بهمن همیشه بهار", order: 15 },
      { id: "chapter-16", title: "روزنامه‌های دیواری", order: 16 },
      { id: "chapter-17", title: "این‌ها و آن‌ها", order: 17 },
    ],

    quran: [
      { id: "chapter-1", title: "درس ۱", order: 1 },
      { id: "chapter-2", title: "درس ۲", order: 2 },
      { id: "chapter-3", title: "درس ۳", order: 3 },
      { id: "chapter-4", title: "درس ۴", order: 4 },
      { id: "chapter-5", title: "درس ۵", order: 5 },
      { id: "chapter-6", title: "درس ۶", order: 6 },
      { id: "chapter-7", title: "درس ۷", order: 7 },
      { id: "chapter-8", title: "درس ۸", order: 8 },
      { id: "chapter-9", title: "درس ۹", order: 9 },
      { id: "chapter-10", title: "درس ۱۰", order: 10 },
      { id: "chapter-11", title: "درس ۱۱", order: 11 },
      { id: "chapter-12", title: "درس ۱۲", order: 12 },
    ],
  },

  grade6: {
    math: [
      { id: "chapter-1", title: "عدد و الگوهای عددی", order: 1 },
      { id: "chapter-2", title: "کسر", order: 2 },
      { id: "chapter-3", title: "اعداد اعشاری", order: 3 },
      { id: "chapter-4", title: "تقارن و مختصات", order: 4 },
      { id: "chapter-5", title: "اندازه‌گیری", order: 5 },
      { id: "chapter-6", title: "تناسب و درصد", order: 6 },
      { id: "chapter-7", title: "تقریب", order: 7 },
      { id: "chapter-8", title: "آمار و احتمال", order: 8 },
    ],

    science: [
      { id: "chapter-1", title: "زنگ علوم", order: 1 },
      { id: "chapter-2", title: "سرگذشت دفتر من", order: 2 },
      { id: "chapter-3", title: "کارخانه کاغذسازی", order: 3 },
      { id: "chapter-4", title: "سفر به اعماق زمین", order: 4 },
      { id: "chapter-5", title: "زمین پویا", order: 5 },
      { id: "chapter-6", title: "ورزش و نیرو (۱)", order: 6 },
      { id: "chapter-7", title: "ورزش و نیرو (۲)", order: 7 },
      { id: "chapter-8", title: "طراحی کنیم و بسازیم", order: 8 },
      { id: "chapter-9", title: "سفر انرژی", order: 9 },
      { id: "chapter-10", title: "خیلی کوچک، خیلی بزرگ", order: 10 },
      { id: "chapter-11", title: "شگفتی‌های برگ", order: 11 },
      { id: "chapter-12", title: "جنگل برای کیست؟", order: 12 },
      { id: "chapter-13", title: "سالم بمانیم", order: 13 },
      { id: "chapter-14", title: "از گذشته تا آینده", order: 14 },
    ],

    persian: [
      { id: "chapter-1", title: "معرفت آفریدگار", order: 1 },
      { id: "chapter-2", title: "پنجره‌های شناخت", order: 2 },
      { id: "chapter-3", title: "هوشیاری", order: 3 },
      { id: "chapter-4", title: "داستان من و شما", order: 4 },
      { id: "chapter-5", title: "هفت خان رستم", order: 5 },
      { id: "chapter-6", title: "ای وطن", order: 6 },
      { id: "chapter-7", title: "درس آزاد", order: 7 },
      { id: "chapter-8", title: "دریاقلی", order: 8 },
      { id: "chapter-9", title: "همه از خاک پاک ایرانیم", order: 9 },
      { id: "chapter-10", title: "عطار و جلال‌الدین محمد", order: 10 },
      { id: "chapter-11", title: "دوستان همدل", order: 11 },
      { id: "chapter-12", title: "میوه هنر", order: 12 },
      { id: "chapter-13", title: "آداب زندگانی", order: 13 },
      { id: "chapter-14", title: "راز زندگی", order: 14 },
      { id: "chapter-15", title: "کودک نادان", order: 15 },
      { id: "chapter-16", title: "پایان خوش", order: 16 },
    ],

    social: [
      { id: "chapter-1", title: "دوستان ما", order: 1 },
      { id: "chapter-2", title: "آداب دوستی", order: 2 },
      { id: "chapter-3", title: "تصمیم‌گیری", order: 3 },
      { id: "chapter-4", title: "چگونه تصمیم بگیریم؟", order: 4 },
      { id: "chapter-5", title: "عوامل کشاورزی", order: 5 },
      { id: "chapter-6", title: "محصولات کشاورزی", order: 6 },
      { id: "chapter-7", title: "اوقات فراغت", order: 7 },
      { id: "chapter-8", title: "برنامه‌ریزی برای اوقات فراغت", order: 8 },
      { id: "chapter-9", title: "دریاهای ایران", order: 9 },
      { id: "chapter-10", title: "ایران و همسایگان", order: 10 },
      { id: "chapter-11", title: "ایران و جهان", order: 11 },
      {
        id: "chapter-12",
        title: "چرا انسان‌ها به مکان‌های مختلف مهاجرت می‌کنند؟",
        order: 12,
      },
      { id: "chapter-13", title: "اصطلاحات جغرافیایی", order: 13 },
      { id: "chapter-14", title: "پیدایش تمدن", order: 14 },
      { id: "chapter-15", title: "تمدن‌های باستانی", order: 15 },
      { id: "chapter-16", title: "ایران در دوران باستان", order: 16 },
      { id: "chapter-17", title: "اسلام در ایران", order: 17 },
      { id: "chapter-18", title: "آثار تاریخی", order: 18 },
      { id: "chapter-19", title: "میراث فرهنگی", order: 19 },
      { id: "chapter-20", title: "نهادهای اجتماعی", order: 20 },
      { id: "chapter-21", title: "حکومت و قانون", order: 21 },
      { id: "chapter-22", title: "ایران امروز", order: 22 },
    ],

    hedye: [
      { id: "chapter-1", title: "آفریدگار زیبایی", order: 1 },
      { id: "chapter-2", title: "بهترین راهنمایان", order: 2 },
      { id: "chapter-3", title: "سرور آزادگان", order: 3 },
      { id: "chapter-4", title: "باغ سرسبز نماز", order: 4 },
      { id: "chapter-5", title: "گل صداقت", order: 5 },
      { id: "chapter-6", title: "سفری به سرزمین کربلا", order: 6 },
      { id: "chapter-7", title: "دست در دست دوست", order: 7 },
      { id: "chapter-8", title: "پیامبر رحمت", order: 8 },
      { id: "chapter-9", title: "آداب زندگی", order: 9 },
      { id: "chapter-10", title: "انفاق", order: 10 },
      { id: "chapter-11", title: "دوست خوب", order: 11 },
      { id: "chapter-12", title: "نماز در سفر", order: 12 },
      { id: "chapter-13", title: "سرباز کوچک", order: 13 },
      { id: "chapter-14", title: "راز موفقیت", order: 14 },
      { id: "chapter-15", title: "رهبر کوچک", order: 15 },
      { id: "chapter-16", title: "به سوی پاکی", order: 16 },
      { id: "chapter-17", title: "شکوفایی", order: 17 },
    ],

    quran: [
      { id: "chapter-1", title: "درس ۱", order: 1 },
      { id: "chapter-2", title: "درس ۲", order: 2 },
      { id: "chapter-3", title: "درس ۳", order: 3 },
      { id: "chapter-4", title: "درس ۴", order: 4 },
      { id: "chapter-5", title: "درس ۵", order: 5 },
      { id: "chapter-6", title: "درس ۶", order: 6 },
      { id: "chapter-7", title: "درس ۷", order: 7 },
      { id: "chapter-8", title: "درس ۸", order: 8 },
      { id: "chapter-9", title: "درس ۹", order: 9 },
      { id: "chapter-10", title: "درس ۱۰", order: 10 },
      { id: "chapter-11", title: "درس ۱۱", order: 11 },
      { id: "chapter-12", title: "درس ۱۲", order: 12 },
      { id: "chapter-13", title: "درس ۱۳", order: 13 },
      { id: "chapter-14", title: "درس ۱۴", order: 14 },
    ],
  },
};

export default function ChaptersPage() {
  const params = useParams();

  const gradeId = params.gradeId as GradeId;
  const subjectId = params.subjectId as SubjectId;

  const grade = getGradeById(gradeId);
  const subject = getSubjectById(subjectId);

  if (!grade || !subject) {
    return (
      <main className="min-h-[70vh] px-5 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center">
          <Card className="w-full text-center" padding="lg">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-2xl">
              ⚠️
            </div>

            <h1 className="mt-5 text-xl font-extrabold text-slate-900">
              صفحه موردنظر پیدا نشد
            </h1>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              پایه یا درس انتخاب‌شده معتبر نیست.
            </p>

            <Link
              href="/grades"
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
            >
              بازگشت به پایه‌ها
              <ArrowLeft size={17} />
            </Link>
          </Card>
        </div>
      </main>
    );
  }

  const subjectChapters = [...(chapters[gradeId]?.[subjectId] ?? [])].sort(
    (a, b) => a.order - b.order,
  );

  return (
    <main className="min-h-screen px-5 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <Link
            href={`/subjects/${gradeId}`}
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            بازگشت به درس‌ها
          </Link>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                  {grade.shortTitle}
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                  {subject.title}
                </span>
              </div>

              <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                فصل‌های {subject.title}
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                فصل موردنظر را انتخاب کن و با چند سؤال کوتاه، میزان یادگیری خودت
                را بسنج.
              </p>
            </div>

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <BookOpen size={25} />
            </div>
          </div>
        </div>

        {subjectChapters.length === 0 ? (
          <Card className="text-center" padding="lg">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
              📚
            </div>

            <h2 className="mt-5 text-lg font-extrabold text-slate-900">
              فصل‌های این درس در حال آماده‌سازی است
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-500">
              محتوای فصل‌های این درس به‌زودی به نگارینو اضافه می‌شود.
            </p>

            <Link
              href={`/subjects/${gradeId}`}
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
            >
              انتخاب درس دیگر
              <ArrowLeft size={17} />
            </Link>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {subjectChapters.map((chapter, index) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.25,
                  delay: index * 0.04,
                }}
              >
                <Link
                  href={`/quiz/${gradeId}/${subjectId}/${chapter.id}`}
                  className="group block"
                >
                  <Card
                    variant="interactive"
                    padding="md"
                    className="relative overflow-hidden"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-sm font-extrabold text-blue-600 transition-all duration-200 group-hover:bg-blue-600 group-hover:text-white">
                        {chapter.order}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-slate-400">
                          فصل {chapter.order}
                        </p>

                        <h2 className="mt-1 text-base font-extrabold text-slate-800 transition-colors group-hover:text-blue-700 sm:text-lg">
                          {chapter.title}
                        </h2>
                      </div>

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-all duration-200 group-hover:bg-blue-50 group-hover:text-blue-600">
                        <ArrowLeft size={18} />
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3">
                      <CheckCircle2 size={15} className="text-green-500" />

                      <span className="text-xs font-medium text-slate-400">
                        شروع آزمون فصل
                      </span>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
