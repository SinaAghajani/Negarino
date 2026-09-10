"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { getGradeById } from "@/data/grades";
import { subjects } from "@/data/subjects";
import Card from "@/components/ui/Card";

export default function SubjectsPage() {
  const params = useParams<{ gradeId: string }>();

  const grade = getGradeById(params.gradeId);

  if (!grade) {
    return (
      <main className="min-h-screen px-5 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center">
          <Card className="w-full text-center" padding="lg">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-2xl">
              ⚠️
            </div>

            <h1 className="mt-5 text-xl font-extrabold text-slate-900">
              پایه موردنظر پیدا نشد
            </h1>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              لطفاً یکی از پایه‌های موجود را انتخاب کن.
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

  return (
    <main className="min-h-screen px-5 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/grades"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-blue-600"
        >
          <ArrowLeft size={17} />
          بازگشت به پایه‌ها
        </Link>

        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
              <span>{grade.icon}</span>
              <span>{grade.shortTitle}</span>
            </div>

            <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              درس موردنظر را انتخاب کن
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
              ابتدا درس را انتخاب کن تا فصل‌های مربوط به آن را ببینی و آزمون
              موردنظرت را شروع کنی.
            </p>
          </div>

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <BookOpen size={25} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.25,
                delay: index * 0.05,
              }}
            >
              <Link
                href={`/chapters/${grade.id}/${subject.id}`}
                className="group block"
              >
                <Card
                  variant="interactive"
                  padding="md"
                  className="h-full overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl text-2xl"
                      style={{
                        backgroundColor: `${subject.color}14`,
                      }}
                    >
                      {subject.icon}
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-all duration-200 group-hover:bg-blue-50 group-hover:text-blue-600">
                      <ChevronLeft size={18} />
                    </div>
                  </div>

                  <div className="mt-5">
                    <h2 className="text-lg font-extrabold text-slate-900 transition-colors group-hover:text-blue-700">
                      {subject.title}
                    </h2>

                    <p className="mt-2 text-sm leading-7 text-slate-500">
                      {subject.description}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: subject.color }}
                    />

                    <span className="text-xs font-semibold text-slate-400">
                      مشاهده فصل‌ها
                    </span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
