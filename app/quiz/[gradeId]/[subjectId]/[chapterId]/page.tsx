"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ListChecks,
  RotateCcw,
} from "lucide-react";
import { motion } from "framer-motion";
import QuizCard from "@/components/quiz/QuizCard";
import QuestionNumber from "@/components/quiz/QuestionNumber";
import Timer from "@/components/quiz/Timer";
import ProgressBar from "@/components/ui/ProgressBar";
import Button from "@/components/ui/Button";
import { getGradeById } from "@/data/grades";
import { getSubjectById } from "@/data/subjects";
import { useQuizStore } from "@/store/quizStore";
import type { GradeId, QuizQuestion, SubjectId } from "@/types/quiz";

import grade4Questions from "@/data/questions/grade4.json";
import grade5Questions from "@/data/questions/grade5.json";
import grade6Questions from "@/data/questions/grade6.json";

const questionSets: Record<GradeId, QuizQuestion[]> = {
  grade4: grade4Questions as QuizQuestion[],
  grade5: grade5Questions as QuizQuestion[],
  grade6: grade6Questions as QuizQuestion[],
};

const DEFAULT_TIME_LIMIT = 10 * 60;

export default function QuizPage() {
  const params = useParams<{
    gradeId: string;
    subjectId: string;
    chapterId: string;
  }>();

  const router = useRouter();

  const gradeId = params.gradeId as GradeId;
  const subjectId = params.subjectId as SubjectId;
  const chapterId = params.chapterId;

  const grade = getGradeById(gradeId);
  const subject = getSubjectById(subjectId);

  const startQuiz = useQuizStore((state) => state.startQuiz);
  const answerQuestion = useQuizStore((state) => state.answerQuestion);
  const nextQuestion = useQuizStore((state) => state.nextQuestion);
  const previousQuestion = useQuizStore((state) => state.previousQuestion);
  const goToQuestion = useQuizStore((state) => state.goToQuestion);
  const finishQuiz = useQuizStore((state) => state.finishQuiz);

  const questions = useQuizStore((state) => state.questions);
  const currentQuestionIndex = useQuizStore(
    (state) => state.currentQuestionIndex,
  );
  const answers = useQuizStore((state) => state.answers);
  const settings = useQuizStore((state) => state.settings);
  const startedAt = useQuizStore((state) => state.startedAt);
  const isFinished = useQuizStore((state) => state.isFinished);

  const [initialized, setInitialized] = useState(false);

  const availableQuestions = useMemo(() => {
    const source = questionSets[gradeId] ?? [];

    return source.filter(
      (question) =>
        question.subjectId === subjectId && question.chapterId === chapterId,
    );
  }, [gradeId, subjectId, chapterId]);

  const currentQuestion = questions[currentQuestionIndex];

  const currentAnswer = currentQuestion
    ? answers[currentQuestion.id]
    : undefined;

  const progress =
    questions.length > 0
      ? Math.round(((currentQuestionIndex + 1) / questions.length) * 100)
      : 0;

  useEffect(() => {
    if (!grade || !subject || !chapterId) {
      setInitialized(true);
      return;
    }

    if (availableQuestions.length === 0) {
      setInitialized(true);
      return;
    }

    const sameQuiz =
      settings?.gradeId === gradeId &&
      settings?.subjectId === subjectId &&
      settings?.chapterId === chapterId &&
      questions.length === availableQuestions.length;

    if (!sameQuiz) {
      startQuiz(
        {
          gradeId,
          subjectId,
          chapterId,
          questionCount: availableQuestions.length,
          timeLimit: DEFAULT_TIME_LIMIT,
          shuffleQuestions: false,
          shuffleOptions: false,
        },
        availableQuestions,
      );
    }

    setInitialized(true);
  }, [
    grade,
    subject,
    chapterId,
    gradeId,
    subjectId,
    availableQuestions,
    settings?.gradeId,
    settings?.subjectId,
    settings?.chapterId,
    questions.length,
    startQuiz,
  ]);

  const handleFinish = useCallback(() => {
    const state = useQuizStore.getState();

    if (state.isFinished || !state.questions.length) {
      return;
    }

    finishQuiz();
    router.push("/result");
  }, [finishQuiz, router]);

  const handleNext = () => {
    if (!currentQuestion) {
      return;
    }

    if (currentQuestionIndex === questions.length - 1) {
      handleFinish();
      return;
    }

    nextQuestion();
  };

  if (!grade) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-5 py-12">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            ⚠️
          </div>

          <h1 className="mt-5 text-xl font-extrabold text-slate-900">
            پایه موردنظر پیدا نشد
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            پایه انتخاب‌شده معتبر نیست.
          </p>

          <Button href="/grades" className="mt-6">
            بازگشت به پایه‌ها
          </Button>
        </div>
      </main>
    );
  }

  if (!subject) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-5 py-12">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            ⚠️
          </div>

          <h1 className="mt-5 text-xl font-extrabold text-slate-900">
            درس موردنظر پیدا نشد
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            درس انتخاب‌شده معتبر نیست.
          </p>

          <Button href={`/subjects/${gradeId}`} className="mt-6">
            بازگشت به درس‌ها
          </Button>
        </div>
      </main>
    );
  }

  if (!chapterId) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-5 py-12">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-sm">
          <h1 className="text-xl font-extrabold text-slate-900">
            فصل موردنظر پیدا نشد
          </h1>

          <Button href={`/chapters/${gradeId}/${subjectId}`} className="mt-6">
            بازگشت به فصل‌ها
          </Button>
        </div>
      </main>
    );
  }

  if (initialized && availableQuestions.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-5 py-12">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-600">
            <ListChecks size={26} />
          </div>

          <h1 className="mt-5 text-xl font-extrabold text-slate-900">
            هنوز سؤالی برای این فصل ثبت نشده
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            سؤال‌های این فصل هنوز به نگارینو اضافه نشده‌اند.
          </p>

          <Button href={`/chapters/${gradeId}/${subjectId}`} className="mt-6">
            مشاهده فصل‌ها
          </Button>
        </div>
      </main>
    );
  }

  if (!initialized || !currentQuestion || isFinished) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <span className="text-sm">در حال آماده‌سازی آزمون...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-5 sm:px-6 sm:py-8">
        <header className="mb-5 flex items-center justify-between gap-3">
          <Link
            href={`/chapters/${gradeId}/${subjectId}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition-colors hover:text-blue-600"
          >
            <ArrowRight size={18} />

            <span className="hidden sm:inline">بازگشت به فصل‌ها</span>

            <span className="sm:hidden">بازگشت</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="hidden rounded-xl bg-white px-3 py-2 text-xs font-bold text-slate-600 shadow-sm sm:inline-flex">
              {subject.icon} {subject.title}
            </span>

            <Timer
              duration={settings?.timeLimit}
              startedAt={startedAt}
              onComplete={handleFinish}
            />
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="text-xs font-bold text-slate-500">
              پیشرفت آزمون
            </span>

            <span className="text-xs font-extrabold text-blue-600">
              {currentQuestionIndex + 1} از {questions.length}
            </span>
          </div>

          <ProgressBar value={progress} />
        </motion.div>

        <div className="mb-5 flex gap-2 overflow-x-auto rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
          {questions.map((question, index) => (
            <QuestionNumber
              key={question.id}
              number={index + 1}
              total={questions.length}
              active={index === currentQuestionIndex}
              answered={Boolean(answers[question.id])}
              onClick={() => goToQuestion(index)}
            />
          ))}
        </div>

        <QuizCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          selectedAnswer={currentAnswer}
          onAnswer={(answerId) => answerQuestion(currentQuestion.id, answerId)}
        />

        <div className="mt-5 flex items-center justify-between gap-3">
          <Button
            variant="outline"
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <ArrowRight size={17} />
            قبلی
          </Button>

          {currentQuestionIndex === questions.length - 1 ? (
            <Button
              variant="success"
              onClick={handleFinish}
              disabled={!currentAnswer}
            >
              <CheckCircle2 size={18} />
              پایان آزمون
            </Button>
          ) : (
            <Button onClick={handleNext} disabled={!currentAnswer}>
              بعدی
              <ArrowLeft size={17} />
            </Button>
          )}
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
          <RotateCcw size={13} />
          پاسخ هر سؤال را می‌توانی تا قبل از پایان آزمون تغییر دهی.
        </div>
      </div>
    </main>
  );
}
