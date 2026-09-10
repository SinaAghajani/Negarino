"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Home,
  RotateCcw,
  Trophy,
  XCircle,
} from "lucide-react";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import { getGradeById } from "@/data/grades";
import { getSubjectById } from "@/data/subjects";
import { useQuizStore } from "@/store/quizStore";

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes === 0) {
    return `${remainingSeconds} ثانیه`;
  }

  if (remainingSeconds === 0) {
    return `${minutes} دقیقه`;
  }

  return `${minutes} دقیقه و ${remainingSeconds} ثانیه`;
};

export default function ResultPage() {
  const result = useQuizStore((state) => state.result);

  const resetQuiz = useQuizStore((state) => state.resetQuiz);

  if (!result) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <Trophy size={27} />
          </div>

          <h1 className="mt-5 text-xl font-extrabold text-slate-900">
            نتیجه‌ای برای نمایش وجود ندارد
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            ابتدا یک آزمون را کامل کن تا نتیجه آن نمایش داده شود.
          </p>

          <Button href="/grades" className="mt-6">
            انتخاب آزمون
          </Button>
        </div>
      </main>
    );
  }

  const grade = getGradeById(result.gradeId);

  const subject = getSubjectById(result.subjectId);

  const scoreMessage =
    result.score >= 90
      ? "عالی بود! عملکرد فوق‌العاده‌ای داشتی."
      : result.score >= 70
        ? "خیلی خوب بود! با کمی تمرین بیشتر بهتر هم می‌شوی."
        : result.score >= 50
          ? "خوب پیش رفتی؛ با مرور بیشتر می‌توانی امتیازت را بالاتر ببری."
          : "اشکالی ندارد؛ دوباره تمرین کن و این بار بهتر نتیجه بگیر.";

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
          }}
        >
          <div className="mb-6 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-yellow-100 text-yellow-600 shadow-sm">
              <Trophy size={38} />
            </div>

            <h1 className="mt-5 text-3xl font-extrabold text-slate-950">
              آزمون تمام شد!
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {grade?.shortTitle}
              {subject ? ` • ${subject.title}` : ""}
            </p>
          </div>

          <div className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-blue-600 px-6 py-8 text-center text-white sm:px-10">
              <p className="text-sm text-blue-100">امتیاز نهایی</p>

              <div className="mt-2 text-6xl font-extrabold tracking-tight">
                {result.score.toLocaleString("fa-IR")}

                <span className="mr-1 text-2xl">٪</span>
              </div>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-blue-100">
                {scoreMessage}
              </p>
            </div>

            <div className="p-5 sm:p-8">
              <ProgressBar
                value={result.score}
                variant={
                  result.score >= 70
                    ? "success"
                    : result.score >= 50
                      ? "warning"
                      : "danger"
                }
              />

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-2xl bg-green-50 p-4 text-center">
                  <CheckCircle2 size={22} className="mx-auto text-green-600" />

                  <p className="mt-2 text-xl font-extrabold text-green-700">
                    {result.correctAnswers.toLocaleString("fa-IR")}
                  </p>

                  <p className="mt-1 text-xs font-medium text-green-600">
                    پاسخ صحیح
                  </p>
                </div>

                <div className="rounded-2xl bg-red-50 p-4 text-center">
                  <XCircle size={22} className="mx-auto text-red-600" />

                  <p className="mt-2 text-xl font-extrabold text-red-700">
                    {result.wrongAnswers.toLocaleString("fa-IR")}
                  </p>

                  <p className="mt-1 text-xs font-medium text-red-600">
                    پاسخ غلط
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4 text-center">
                  <div className="mx-auto flex h-5.5 w-5.5 items-center justify-center rounded-full border-2 border-slate-400 text-[9px] font-bold text-slate-500">
                    —
                  </div>

                  <p className="mt-2 text-xl font-extrabold text-slate-700">
                    {result.unanswered.toLocaleString("fa-IR")}
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    بی‌پاسخ
                  </p>
                </div>

                <div className="rounded-2xl bg-blue-50 p-4 text-center">
                  <div className="mx-auto flex h-5.5 w-5.5 items-center justify-center text-blue-600">
                    ⏱
                  </div>

                  <p className="mt-2 text-sm font-extrabold text-blue-700">
                    {formatDuration(result.duration)}
                  </p>

                  <p className="mt-1 text-xs font-medium text-blue-600">
                    زمان آزمون
                  </p>
                </div>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <Button
                  href={`/quiz/${result.gradeId}?subject=${result.subjectId}`}
                  onClick={resetQuiz}
                  fullWidth
                >
                  <RotateCcw size={18} />
                  دوباره تلاش کن
                </Button>

                <Button
                  href={`/quiz/${result.gradeId}`}
                  variant="outline"
                  fullWidth
                >
                  آزمون دیگر
                  <ArrowLeft size={18} />
                </Button>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/leaderboard"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-yellow-200 bg-yellow-50 px-5 text-sm font-bold text-yellow-700 transition-colors hover:bg-yellow-100"
                >
                  <Trophy size={17} />
                  جدول امتیازات
                </Link>

                <Link
                  href="/"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-50 px-5 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-100"
                >
                  <Home size={17} />
                  صفحه اصلی
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-5 text-center">
            <Link
              href={`/quiz/${result.gradeId}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-blue-600"
            >
              <ArrowRight size={16} />
              بازگشت به درس‌های پایه {grade?.shortTitle}
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
