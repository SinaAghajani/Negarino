export type GradeId = "grade4" | "grade5" | "grade6";

export type SubjectId =
    | "math"
    | "science"
    | "persian"
    | "social"
    | "hedye"
    | "quran";

export type QuestionType = "multiple-choice";

export interface QuizOption {
    id: string;
    text: string;
}

export interface QuizQuestion {
    id: string;
    gradeId: GradeId;
    subjectId: SubjectId;
    chapterId?: string;
    question: string;
    options: QuizOption[];
    correctAnswer: string;
    explanation?: string;
    difficulty?: "easy" | "medium" | "hard";
    type: QuestionType;
}

export interface Chapter {
    id: string;
    title: string;
    order: number;
}

export interface Grade {
    id: GradeId;
    title: string;
    shortTitle: string;
    description: string;
    icon: string;
    color: string;
}

export interface Subject {
    id: SubjectId;
    title: string;
    shortTitle: string;
    icon: string;
    color: string;
    description: string;
}

export interface QuizSettings {
    gradeId: GradeId;
    subjectId: SubjectId;
    chapterId?: string;
    questionCount: number;
    timeLimit?: number;
    shuffleQuestions: boolean;
    shuffleOptions: boolean;
}

export interface QuizAnswer {
    questionId: string;
    selectedAnswer: string;
    isCorrect: boolean;
}

export interface QuizResult {
    gradeId: GradeId;
    subjectId: SubjectId;
    chapterId?: string;
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    unanswered: number;
    score: number;
    duration: number;
    completedAt: string;
}

export interface QuizState {
    settings: QuizSettings | null;
    questions: QuizQuestion[];
    currentQuestionIndex: number;
    answers: Record<string, string>;
    startedAt: number | null;
    isFinished: boolean;
    result: QuizResult | null;

    startQuiz: (
        settings: QuizSettings,
        questions: QuizQuestion[],
    ) => void;

    answerQuestion: (
        questionId: string,
        answerId: string,
    ) => void;

    nextQuestion: () => void;
    previousQuestion: () => void;
    goToQuestion: (index: number) => void;
    finishQuiz: () => void;
    resetQuiz: () => void;
}