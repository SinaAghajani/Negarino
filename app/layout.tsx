import type { Metadata } from "next";
import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/500.css";
import "@fontsource/vazirmatn/600.css";
import "@fontsource/vazirmatn/700.css";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "نگارینو | یادگیری و آزمون ابتدایی",
    template: "%s | نگارینو",
  },
  description:
    "نگارینو؛ سامانه‌ای برای تمرین، یادگیری و شرکت در آزمون‌های درسی پایه‌های چهارم، پنجم و ششم ابتدایی.",
  keywords: [
    "نگارینو",
    "آزمون ابتدایی",
    "کوییز ابتدایی",
    "ریاضی ابتدایی",
    "علوم ابتدایی",
    "فارسی ابتدایی",
    "مطالعات اجتماعی",
    "هدیه های آسمان",
    "قرآن ابتدایی",
  ],
  authors: [{ name: "Negarino" }],
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
