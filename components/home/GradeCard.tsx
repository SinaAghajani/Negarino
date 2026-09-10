"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import type { Grade } from "@/types/quiz";

interface GradeCardProps {
  grade: Grade;
}

export default function GradeCard({ grade }: GradeCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Link
        href={`/subjects/${grade.id}`}
        className="group block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-xl hover:shadow-slate-200/50"
      >
        <div className="h-2 w-full" style={{ backgroundColor: grade.color }} />

        <div className="p-5 sm:p-6">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl"
              style={{
                backgroundColor: `${grade.color}15`,
              }}
            >
              {grade.icon}
            </div>

            <span
              className="rounded-full px-3 py-1.5 text-xs font-bold"
              style={{
                backgroundColor: `${grade.color}12`,
                color: grade.color,
              }}
            >
              پایه {grade.shortTitle}
            </span>
          </div>

          <h3 className="mb-2 text-lg font-bold text-slate-900">
            {grade.title}
          </h3>

          <p className="mb-5 min-h-12 text-sm leading-6 text-slate-500">
            {grade.description}
          </p>

          <div
            className="flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-semibold transition-colors"
            style={{ color: grade.color }}
          >
            <span>مشاهده آزمون‌ها</span>

            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 transition-all duration-200 group-hover:bg-slate-100">
              <ArrowLeft size={18} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
