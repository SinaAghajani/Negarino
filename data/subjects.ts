import type { Subject } from "@/types/quiz";

export const subjects: Subject[] = [
    {
        id: "math",
        title: "ریاضی",
        shortTitle: "ریاضی",
        icon: "➗",
        color: "#2563EB",
        description: "تمرین و آزمون مباحث ریاضی",
    },
    {
        id: "science",
        title: "علوم تجربی",
        shortTitle: "علوم",
        icon: "🔬",
        color: "#16A34A",
        description: "آزمون مفاهیم و مباحث علوم تجربی",
    },
    {
        id: "persian",
        title: "فارسی",
        shortTitle: "فارسی",
        icon: "📖",
        color: "#DB2777",
        description: "آزمون فارسی، نگارش و درک مطلب",
    },
    {
        id: "social",
        title: "مطالعات اجتماعی",
        shortTitle: "مطالعات",
        icon: "🌍",
        color: "#EA580C",
        description: "آزمون مطالعات اجتماعی",
    },
    {
        id: "hedye",
        title: "هدیه‌های آسمان",
        shortTitle: "هدیه‌ها",
        icon: "🌱",
        color: "#7C3AED",
        description: "آزمون درس هدیه‌های آسمان",
    },
    {
        id: "quran",
        title: "قرآن",
        shortTitle: "قرآن",
        icon: "📗",
        color: "#0891B2",
        description: "آزمون و تمرین درس قرآن",
    },
];

export const getSubjectById = (id: string): Subject | undefined => {
    return subjects.find((subject) => subject.id === id);
};