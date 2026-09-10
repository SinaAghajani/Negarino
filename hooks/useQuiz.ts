"use client";

import { useMemo } from "react";
import { useQuizStore } from "@/store/quizStore";

export const useQuiz = () => {
    const settings = useQuizStore((state) => state.settings);
    const questions = useQuizStore((state) => state.questions);
    const currentQuestionIndex = useQuizStore(
        (state) => state.currentQuestionIndex,
    );
    const answers = useQuizStore((state) => state.answers);
    const startedAt = useQuizStore((state) => state.startedAt);
    const isFinished = useQuizStore((state) => state.isFinished);
    const result = useQuizStore((state) => state.result);

    const currentQuestion = useMemo(() => {
        return questions[currentQuestionIndex] ?? null;
    }, [questions, currentQuestionIndex]);

    const currentAnswer = useMemo(() => {
        if (!currentQuestion) {
            return null;
        }

        return answers[currentQuestion.id] ?? null;
    }, [answers, currentQuestion]);

    const progress = useMemo(() => {
        if (questions.length === 0) {
            return 0;
        }

        return Math.round(
            ((currentQuestionIndex + 1) / questions.length) * 100,
        );
    }, [currentQuestionIndex, questions.length]);

    const answeredCount = useMemo(() => {
        return Object.keys(answers).length;
    }, [answers]);

    const remainingCount = useMemo(() => {
        return Math.max(0, questions.length - answeredCount);
    }, [questions.length, answeredCount]);

    const isFirstQuestion = currentQuestionIndex === 0;

    const isLastQuestion =
        questions.length > 0 &&
        currentQuestionIndex === questions.length - 1;

    return {
        settings,
        questions,
        currentQuestion,
        currentQuestionIndex,
        currentAnswer,
        answers,
        startedAt,
        isFinished,
        result,
        progress,
        answeredCount,
        remainingCount,
        isFirstQuestion,
        isLastQuestion,
    };
};