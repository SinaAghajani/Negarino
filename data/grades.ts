import type { Grade } from "@/types/quiz";

export const grades: Grade[] = [
    {
        id: "grade4",
        title: "پایه چهارم ابتدایی",
        shortTitle: "چهارم",
        description: "آزمون‌های درسی پایه چهارم ابتدایی",
        icon: "🎒",
        color: "#2563EB",
    },
    {
        id: "grade5",
        title: "پایه پنجم ابتدایی",
        shortTitle: "پنجم",
        description: "آزمون‌های درسی پایه پنجم ابتدایی",
        icon: "📚",
        color: "#22C55E",
    },
    {
        id: "grade6",
        title: "پایه ششم ابتدایی",
        shortTitle: "ششم",
        description: "آزمون‌های درسی پایه ششم ابتدایی",
        icon: "🎓",
        color: "#F59E0B",
    },
];

export const getGradeById = (id: string): Grade | undefined => {
    return grades.find((grade) => grade.id === id);
};