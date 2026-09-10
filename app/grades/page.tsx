"use client";

import Link from "next/link";
import { ArrowRight, GraduationCap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import GradeCard from "@/components/home/GradeCard";
import { grades } from "@/data/grades";

export default function GradesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-16 lg:px-8">
        <section>
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition-colors hover:text-blue-600"
          >
            <ArrowRight size={18} />
            بازگشت به خانه
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-100 text-blue-600">
              <GraduationCap size={30} />
            </div>

            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-bold text-blue-600">
              <Sparkles size={14} />
              شروع مسیر یادگیری
            </div>

            <h1 className="text-3xl font-extrabold text-slate-950 sm:text-4xl">
              پایه تحصیلی‌ات را انتخاب کن
            </h1>

            <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
              پایه خودت را انتخاب کن تا درس‌ها و آزمون‌های مربوط به آن را ببینی.
            </p>
          </motion.div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
            {grades.map((grade, index) => (
              <motion.div
                key={grade.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.08,
                }}
              >
                <GradeCard grade={grade} />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
