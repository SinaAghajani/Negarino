"use client";

import { motion } from "framer-motion";

interface QuestionNumberProps {
  number: number;
  total: number;
  answered?: boolean;
  active?: boolean;
  onClick?: () => void;
}

export default function QuestionNumber({
  number,
  total,
  answered = false,
  active = false,
  onClick,
}: QuestionNumberProps) {
  const isInteractive = Boolean(onClick);

  return (
    <motion.button
      type="button"
      whileHover={isInteractive ? { scale: 1.05 } : undefined}
      whileTap={isInteractive ? { scale: 0.95 } : undefined}
      onClick={onClick}
      disabled={!isInteractive}
      aria-label={`سؤال ${number} از ${total}`}
      aria-current={active ? "step" : undefined}
      className={[
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        active
          ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20"
          : answered
            ? "bg-green-100 text-green-700"
            : "bg-slate-100 text-slate-500",
        isInteractive ? "cursor-pointer hover:shadow-sm" : "cursor-default",
      ].join(" ")}
    >
      {number}
    </motion.button>
  );
}
