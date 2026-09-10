"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import type { Subject } from "@/types/quiz";

interface SubjectCardProps {
  subject: Subject;
  gradeId?: string;
}

export default function SubjectCard({ subject, gradeId }: SubjectCardProps) {
  const href = gradeId
    ? `/quiz/${gradeId}?subject=${subject.id}`
    : `/grades?subject=${subject.id}`;

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link
        href={href}
        className="group block rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/40"
      >
        <div className="mb-5 flex items-center justify-between gap-3">
          <div
            className="flex h-13 w-13 items-center justify-center rounded-2xl text-2xl"
            style={{
              backgroundColor: `${subject.color}15`,
            }}
          >
            {subject.icon}
          </div>

          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-all duration-200 group-hover:bg-slate-100"
            style={{ color: subject.color }}
          >
            <ArrowLeft size={17} />
          </span>
        </div>

        <h3 className="mb-2 text-base font-bold text-slate-900">
          {subject.title}
        </h3>

        <p className="text-sm leading-6 text-slate-500">
          {subject.description}
        </p>

        <div
          className="mt-5 text-xs font-bold"
          style={{ color: subject.color }}
        >
          شروع آزمون
        </div>
      </Link>
    </motion.div>
  );
}
