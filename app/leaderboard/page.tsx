"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Medal, Sparkles, Trophy, UserRound } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  quizzes: number;
}

const leaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    name: "نگار",
    score: 980,
    quizzes: 18,
  },
  {
    rank: 2,
    name: "سینا",
    score: 920,
    quizzes: 16,
  },
  {
    rank: 3,
    name: "محمد",
    score: 870,
    quizzes: 15,
  },
  {
    rank: 4,
    name: "سارا",
    score: 810,
    quizzes: 14,
  },
  {
    rank: 5,
    name: "پارسا",
    score: 760,
    quizzes: 13,
  },
  {
    rank: 6,
    name: "یاسین",
    score: 720,
    quizzes: 12,
  },
];

const rankStyles: Record<number, string> = {
  1: "bg-yellow-100 text-yellow-700",
  2: "bg-slate-200 text-slate-700",
  3: "bg-orange-100 text-orange-700",
};

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <header className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-bold text-slate-700 transition-colors hover:text-blue-600"
          >
            <ArrowRight size={18} />
            خانه
          </Link>

          <Link
            href="/grades"
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
          >
            شروع آزمون
          </Link>
        </header>

        <section className="py-8 sm:py-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="text-center"
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-yellow-100 text-yellow-600">
              <Trophy size={30} />
            </div>

            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-bold text-blue-600">
              <Sparkles size={14} />
              رقابت سالم
            </div>

            <h1 className="text-3xl font-extrabold text-slate-950 sm:text-4xl">
              جدول امتیازات
            </h1>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              با تمرین بیشتر، امتیاز بیشتری بگیر و در جدول پیشرفت کن.
            </p>
          </motion.div>

          <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-[56px_1fr_90px_70px] items-center gap-3 border-b border-slate-100 bg-slate-50 px-4 py-4 text-xs font-bold text-slate-400 sm:grid-cols-[70px_1fr_120px_90px] sm:px-6">
              <span>رتبه</span>
              <span>دانش‌آموز</span>
              <span className="text-center">امتیاز</span>
              <span className="text-center">آزمون</span>
            </div>

            <div className="divide-y divide-slate-100">
              {leaderboard.map((entry, index) => (
                <motion.div
                  key={entry.name}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.25,
                    delay: index * 0.05,
                  }}
                  className="grid grid-cols-[56px_1fr_90px_70px] items-center gap-3 px-4 py-4 sm:grid-cols-[70px_1fr_120px_90px] sm:px-6"
                >
                  <div
                    className={[
                      "flex h-9 w-9 items-center justify-center rounded-xl text-xs font-extrabold",
                      rankStyles[entry.rank] ?? "bg-slate-100 text-slate-500",
                    ].join(" ")}
                  >
                    {entry.rank <= 3 ? <Medal size={17} /> : entry.rank}
                  </div>

                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <UserRound size={18} />
                    </div>

                    <span className="truncate text-sm font-bold text-slate-800">
                      {entry.name}
                    </span>
                  </div>

                  <span className="text-center text-sm font-extrabold text-blue-600">
                    {entry.score.toLocaleString("fa-IR")}
                  </span>

                  <span className="text-center text-xs font-medium text-slate-400">
                    {entry.quizzes.toLocaleString("fa-IR")}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-center text-xs leading-6 text-blue-700">
            جدول امتیازات در نسخه فعلی نمونه است و در نسخه متصل به حساب کاربری،
            امتیازات واقعی دانش‌آموزان نمایش داده خواهد شد.
          </div>
        </section>
      </div>
    </main>
  );
}
