"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpenCheck,
  Brain,
  CheckCircle2,
  ChevronLeft,
  GraduationCap,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";
import GradeCard from "@/components/home/GradeCard";
import SubjectCard from "@/components/home/SubjectCard";
import { grades } from "@/data/grades";
import { subjects } from "@/data/subjects";

const features = [
  {
    icon: BookOpenCheck,
    title: "آزمون‌های درسی",
    description:
      "برای درس‌های مختلف پایه‌های چهارم تا ششم تمرین و آزمون انجام بده.",
  },
  {
    icon: Brain,
    title: "یادگیری با تمرین",
    description: "با پاسخ دادن به سؤال‌ها، نقاط قوت و ضعف خودت را بهتر بشناس.",
  },
  {
    icon: Trophy,
    title: "رقابت و پیشرفت",
    description: "امتیازت را ثبت کن و برای رسیدن به رتبه‌های بهتر تلاش کن.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <section className="relative">
        <div className="absolute inset-x-0 top-0 -z-10 h-140 bg-linear-to-b from-blue-50 via-white to-transparent" />

        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center lg:text-right"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700">
                <Sparkles size={15} />
                یادگیری می‌تواند جذاب باشد!
              </div>

              <h1 className="text-4xl font-extrabold leading-normal tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                با نگارینو
                <span className="block text-blue-600">بهتر یاد بگیر</span>
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-500 sm:text-lg lg:mx-0">
                آزمون بده، تمرین کن، امتیاز بگیر و قدم‌به‌قدم در درس‌ها پیشرفت
                کن. نگارینو همراه تو برای یادگیری بهتر است.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Link
                  href="/grades"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-7 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  انتخاب پایه و شروع
                  <ArrowLeft size={18} />
                </Link>

                <Link
                  href="/leaderboard"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-7 text-sm font-bold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
                >
                  <Trophy size={18} />
                  جدول امتیازات
                </Link>
              </div>

              <div className="mt-9 flex items-center justify-center gap-6 text-xs text-slate-400 lg:justify-start">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-500" />
                  مناسب ابتدایی
                </span>

                <span className="flex items-center gap-2">
                  <Zap size={16} className="text-yellow-500" />
                  سریع و جذاب
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative mx-auto w-full max-w-md"
            >
              <div className="absolute -right-5 top-10 h-24 w-24 rounded-full bg-yellow-200/60 blur-2xl" />
              <div className="absolute -bottom-5 -left-5 h-28 w-28 rounded-full bg-green-200/60 blur-2xl" />

              <div className="relative rounded-[2.5rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-200/70">
                <div className="rounded-4xl bg-blue-600 p-6 text-white">
                  <div className="mb-8 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-blue-100">آزمون ریاضی</p>
                      <p className="mt-1 text-lg font-bold">پایه ششم</p>
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                      <GraduationCap size={25} />
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white p-5 text-slate-900">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-400">
                        سؤال ۳ از ۱۰
                      </span>

                      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-600">
                        ۳۰٪
                      </span>
                    </div>

                    <p className="text-sm font-bold leading-7">
                      حاصل عبارت زیر کدام است؟
                      <span className="mt-1 block text-base">۱۲ + ۲۴</span>
                    </p>

                    <div className="mt-5 space-y-2.5">
                      {["۲۴", "۳۶", "۴۸"].map((item, index) => (
                        <div
                          key={item}
                          className={[
                            "flex items-center gap-3 rounded-xl border px-3 py-3 text-xs font-semibold",
                            index === 1
                              ? "border-blue-200 bg-blue-50 text-blue-700"
                              : "border-slate-100 text-slate-600",
                          ].join(" ")}
                        >
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-[10px]">
                            {["الف", "ب", "ج"][index]}
                          </span>

                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="text-xs font-bold text-blue-600">
              چرا نگارینو؟
            </span>

            <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              یادگیری ساده‌تر، تمرین جذاب‌تر
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.08,
                  }}
                  className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                    <Icon size={22} />
                  </div>

                  <h3 className="mb-2 font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="text-sm leading-7 text-slate-500">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-600">
                انتخاب پایه
              </span>

              <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                از کجا شروع کنیم؟
              </h2>
            </div>

            <Link
              href="/grades"
              className="hidden items-center gap-1 text-sm font-bold text-blue-600 transition-colors hover:text-blue-700 sm:flex"
            >
              مشاهده همه
              <ChevronLeft size={17} />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {grades.map((grade) => (
              <GradeCard key={grade.id} grade={grade} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold text-blue-600">درس‌ها</span>

            <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
              چه درس‌هایی را می‌توانی تمرین کنی؟
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-4xl bg-blue-600 p-7 text-center text-white shadow-xl shadow-blue-600/15 sm:p-12">
          <Sparkles className="mx-auto mb-5" size={30} />

          <h2 className="text-2xl font-extrabold sm:text-3xl">
            آماده‌ای شروع کنیم؟
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-blue-100">
            پایه‌ات را انتخاب کن و اولین آزمونت را همین حالا شروع کن.
          </p>

          <Link
            href="/grades"
            className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-white px-7 text-base font-extrabold text-blue-700 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-blue-50"
          >
            شروع آزمون
            <ArrowLeft size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
