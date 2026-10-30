import Link from "next/link";
import { BookOpenCheck, Trophy, Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 px-3 pb-3 sm:px-5">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-t-[3rem] rounded-b-[3rem] border border-slate-200 bg-white shadow-sm">
        <div className="px-6 pb-8 pt-12 sm:px-10 sm:pb-10 sm:pt-14 lg:px-14">
          <div className="grid gap-10 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 text-slate-900"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white">
                  <BookOpenCheck size={23} strokeWidth={2.3} />
                </span>

                <span className="text-xl font-extrabold">نگارینو</span>
              </Link>

              <p className="mt-5 max-w-md text-sm leading-8 text-slate-500">
                نگارینو یک محیط ساده و جذاب برای تمرین و آزمون آنلاین
                دانش‌آموزان دوره ابتدایی است.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                دسترسی سریع
              </h3>

              <nav className="mt-5 grid gap-3">
                <Link
                  href="/"
                  className="w-fit text-sm font-medium text-slate-500 transition-colors hover:text-blue-600"
                >
                  خانه
                </Link>

                <Link
                  href="/grades"
                  className="w-fit text-sm font-medium text-slate-500 transition-colors hover:text-blue-600"
                >
                  آزمون‌ها
                </Link>

                <Link
                  href="/leaderboard"
                  className="inline-flex w-fit items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-blue-600"
                >
                  <Trophy size={16} />
                  رتبه‌بندی
                </Link>
              </nav>
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                درباره نگارینو
              </h3>

              <p className="mt-5 text-sm leading-8 text-slate-500">
                تمرین بیشتر، یادگیری بهتر و تجربه‌ای شیرین‌تر از آزمون‌های درسی.
              </p>

              <Link
                href="/grades"
                className="mt-5 inline-flex min-h-10 items-center justify-center rounded-xl bg-blue-50 px-4 text-sm font-bold text-blue-700 transition-colors hover:bg-blue-100"
              >
                شروع یادگیری
              </Link>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-5 border-t border-slate-100 pt-6">
            <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between">
              <p className="text-xs font-medium text-slate-400">
                © {new Date().getFullYear()} نگارینو — همه حقوق محفوظ است.
              </p>

              <p className="text-xs font-medium text-slate-400">
                ساخته شده برای یادگیری بهتر
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 border-t border-slate-100 pt-5">
              <span className="text-xs font-medium text-slate-400">
                طراحی و توسعه توسط
              </span>

              <a
                href="https://github.com/SinaAghajani"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex flex-wrap items-center justify-center gap-2.5 text-sm font-extrabold text-slate-700 transition-colors hover:text-blue-600"
              >
                <Code2
                  size={19}
                  className="transition-transform group-hover:scale-110"
                />

                <span>سینا آقاجانی</span>

                <span className="text-slate-300">|</span>

                <span dir="ltr">Sina Aghajani</span>
              </a>

              <a
                href="https://github.com/SinaAghajani"
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="text-xs font-medium text-slate-400 transition-colors hover:text-blue-600"
              >
                github.com/SinaAghajani
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
