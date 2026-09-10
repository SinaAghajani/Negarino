import { create } from "zustand";
import type {
    QuizQuestion,
    QuizResult,
    QuizSettings,
    QuizState,
} from "@/types/quiz";

export const useQuizStore = create<QuizState>((set, get) => ({
    settings: null,
    questions: [],
    currentQuestionIndex: 0,
    answers: {},
    startedAt: null,
    isFinished: false,
    result: null,

    startQuiz: (
        settings: QuizSettings,
        questions: QuizQuestion[],
    ) => {
        set({
            settings,
            questions,
            currentQuestionIndex: 0,
            answers: {},
            startedAt: Date.now(),
            isFinished: false,
            result: null,
        });
    },

    answerQuestion: (
        questionId: string,
        answerId: string,
    ) => {
        if (get().isFinished) {
            return;
        }

        const question = get().questions.find(
            (item) => item.id === questionId,
        );

        if (!question) {
            return;
        }

        const answerExists = question.options.some(
            (option) => option.id === answerId,
        );

        if (!answerExists) {
            return;
        }

        set((state) => ({
            answers: {
                ...state.answers,
                [questionId]: answerId,
            },
        }));
    },

    nextQuestion: () => {
        const {
            currentQuestionIndex,
            questions,
            isFinished,
        } = get();

        if (isFinished) {
            return;
        }

        if (currentQuestionIndex < questions.length - 1) {
            set({
                currentQuestionIndex:
                    currentQuestionIndex + 1,
            });
        }
    },

    previousQuestion: () => {
        const {
            currentQuestionIndex,
            isFinished,
        } = get();

        if (isFinished) {
            return;
        }

        if (currentQuestionIndex > 0) {
            set({
                currentQuestionIndex:
                    currentQuestionIndex - 1,
            });
        }
    },

    goToQuestion: (index: number) => {
        const {
            questions,
            isFinished,
        } = get();

        if (isFinished) {
            return;
        }

        if (
            index < 0 ||
            index >= questions.length
        ) {
            return;
        }

        set({
            currentQuestionIndex: index,
        });
    },

    finishQuiz: () => {
        const {
            settings,
            questions,
            answers,
            startedAt,
            isFinished,
        } = get();

        if (
            isFinished ||
            !settings ||
            questions.length === 0
        ) {
            return;
        }

        const correctAnswers = questions.reduce(
            (total, question) => {
                return (
                    total +
                    (answers[question.id] ===
                        question.correctAnswer
                        ? 1
                        : 0)
                );
            },
            0,
        );

        const totalQuestions = questions.length;

        const answeredQuestions = questions.filter(
            (question) =>
                Boolean(answers[question.id]),
        ).length;

        const wrongAnswers =
            answeredQuestions - correctAnswers;

        const unanswered =
            totalQuestions - answeredQuestions;

        const score =
            totalQuestions > 0
                ? Math.round(
                    (correctAnswers / totalQuestions) *
                    100,
                )
                : 0;

        const duration = startedAt
            ? Math.max(
                0,
                Math.floor(
                    (Date.now() - startedAt) / 1000,
                ),
            )
            : 0;

        const result: QuizResult = {
            gradeId: settings.gradeId,
            subjectId: settings.subjectId,
            chapterId: settings.chapterId,
            totalQuestions,
            correctAnswers,
            wrongAnswers,
            unanswered,
            score,
            duration,
            completedAt: new Date().toISOString(),
        };

        set({
            result,
            isFinished: true,
        });
    },

    resetQuiz: () => {
        set({
            settings: null,
            questions: [],
            currentQuestionIndex: 0,
            answers: {},
            startedAt: null,
            isFinished: false,
            result: null,
        });
    },
}));