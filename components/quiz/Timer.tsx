"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Clock3 } from "lucide-react";

interface TimerProps {
  duration?: number;
  startedAt?: number | null;
  onComplete?: () => void;
  paused?: boolean;
}

export default function Timer({
  duration,
  startedAt,
  onComplete,
  paused = false,
}: TimerProps) {
  const [remaining, setRemaining] = useState<number>(() => {
    if (!duration || duration <= 0) {
      return 0;
    }

    if (!startedAt) {
      return duration;
    }

    return Math.max(0, duration - Math.floor((Date.now() - startedAt) / 1000));
  });

  const completedRef = useRef(false);

  useEffect(() => {
    completedRef.current = false;
  }, [duration, startedAt]);

  useEffect(() => {
    if (!duration || duration <= 0) {
      return;
    }

    const updateTimer = () => {
      if (paused) {
        return;
      }

      const nextRemaining = startedAt
        ? Math.max(0, duration - Math.floor((Date.now() - startedAt) / 1000))
        : duration;

      setRemaining(nextRemaining);

      if (nextRemaining === 0 && !completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
    };

    updateTimer();

    const interval = window.setInterval(updateTimer, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [duration, startedAt, onComplete, paused]);

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0",
    )}`;
  }, [remaining]);

  const isWarning = duration
    ? remaining <= Math.max(60, Math.floor(duration * 0.2))
    : false;

  const isCritical = duration ? remaining <= 10 : false;

  if (!duration || duration <= 0) {
    return null;
  }

  return (
    <div
      className={[
        "inline-flex items-center gap-2 rounded-2xl border px-4 py-2.5 transition-all duration-200",
        isCritical
          ? "border-red-300 bg-red-100 text-red-700"
          : isWarning
            ? "border-red-200 bg-red-50 text-red-600"
            : "border-slate-200 bg-white text-slate-700",
      ].join(" ")}
      aria-label={`زمان باقی‌مانده ${formattedTime}`}
      role="timer"
    >
      <Clock3 size={18} className={isWarning ? "animate-pulse" : ""} />

      <span className="font-mono text-sm font-bold tracking-wide tabular-nums">
        {formattedTime}
      </span>
    </div>
  );
}
