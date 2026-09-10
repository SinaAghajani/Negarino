"use client";

import { motion } from "framer-motion";
import { Lightbulb, MessageCircleQuestion } from "lucide-react";
import type { QuizQuestion } from "@/types/quiz";
import OptionButton from "./OptionButton";

interface QuizCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer?: string;
  onAnswer: (answerId: string) => void;
  disabled?: boolean;
}

export default function QuizCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswer,
  disabled = false,
}: QuizCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-7">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white">
                <MessageCircleQuestion size={21} strokeWidth={2.2} />
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">سؤال</p>

                <p className="text-sm font-bold text-slate-800">
                  {questionNumber} از {totalQuestions}
                </p>
              </div>
            </div>

            {question.difficulty && (
              <span
                className={[
                  "rounded-full px-3 py-1.5 text-xs font-semibold",
                  question.difficulty === "easy"
                    ? "bg-green-50 text-green-700"
                    : question.difficulty === "medium"
                      ? "bg-yellow-50 text-yellow-700"
                      : "bg-red-50 text-red-700",
                ].join(" ")}
              >
                {question.difficulty === "easy"
                  ? "آسان"
                  : question.difficulty === "medium"
                    ? "متوسط"
                    : "سخت"}
              </span>
            )}
          </div>
        </div>

        <div className="p-5 sm:p-7">
          <h2 className="mb-7 text-lg font-bold leading-9 text-slate-900 sm:text-xl">
            {question.question}
          </h2>

          <div className="grid gap-3">
            {question.options.map((option, index) => (
              <OptionButton
                key={option.id}
                option={option}
                index={index}
                selected={selectedAnswer === option.id}
                onClick={() => onAnswer(option.id)}
                disabled={disabled}
              />
            ))}
          </div>

          {question.explanation && selectedAnswer && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
                marginTop: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
                marginTop: 20,
              }}
              className="overflow-hidden"
            >
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <Lightbulb size={18} />
                  </div>

                  <div>
                    <p className="mb-1 text-sm font-bold text-blue-900">نکته</p>

                    <p className="text-sm leading-7 text-blue-800">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
