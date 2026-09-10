"use client";

import { motion } from "framer-motion";
import { Check, Circle } from "lucide-react";
import type { QuizOption } from "@/types/quiz";

interface OptionButtonProps {
  option: QuizOption;
  index: number;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const optionLabels = ["الف", "ب", "ج", "د"];

export default function OptionButton({
  option,
  index,
  selected,
  onClick,
  disabled = false,
}: OptionButtonProps) {
  return (
    <motion.button
      type="button"
      whileHover={!disabled ? { scale: 1.01 } : undefined}
      whileTap={!disabled ? { scale: 0.99 } : undefined}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={[
        "group flex w-full items-center gap-3 rounded-2xl border p-3 text-right transition-all duration-200 sm:p-4",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer",
        selected
          ? "border-blue-500 bg-blue-50 shadow-sm shadow-blue-100"
          : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/40",
      ].join(" ")}
    >
      <span
        className={[
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-all duration-200",
          selected
            ? "bg-blue-600 text-white"
            : "bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700",
        ].join(" ")}
      >
        {optionLabels[index] ?? index + 1}
      </span>

      <span
        className={[
          "flex-1 text-sm font-medium leading-7 transition-colors sm:text-base",
          selected ? "text-blue-900" : "text-slate-700",
        ].join(" ")}
      >
        {option.text}
      </span>

      <span className="shrink-0">
        {selected ? (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white">
            <Check size={16} strokeWidth={2.5} />
          </span>
        ) : (
          <Circle
            size={22}
            strokeWidth={1.7}
            className="text-slate-300 transition-colors group-hover:text-blue-400"
          />
        )}
      </span>
    </motion.button>
  );
}
