"use client";

import Link from "next/link";
import { BookOpenCheck, Menu, Trophy, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  {
    href: "/",
    label: "خانه",
  },
  {
    href: "/grades",
    label: "آزمون‌ها",
  },
  {
    href: "/leaderboard",
    label: "رتبه‌بندی",
    icon: Trophy,
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="mx-auto max-w-7xl rounded-2xl border border-slate-200/80 bg-white/95 shadow-lg shadow-slate-200/30 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-slate-900 transition-opacity hover:opacity-80"
            aria-label="نگارینو"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/20">
              <BookOpenCheck size={22} strokeWidth={2.3} />
            </span>

            <span className="text-lg font-extrabold tracking-tight">
              نگارینو
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex min-h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  {Icon && <Icon size={17} />}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <Link
              href="/grades"
              className="inline-flex min-h-10 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-sm shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700"
            >
              شروع آزمون
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700 md:hidden"
            aria-label={isMenuOpen ? "بستن منو" : "باز کردن منو"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="border-t border-slate-100 px-4 pb-4 pt-3 md:hidden">
            <nav className="grid gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex min-h-11 items-center gap-2.5 rounded-xl px-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                  >
                    {Icon && <Icon size={18} />}
                    {item.label}
                  </Link>
                );
              })}

              <Link
                href="/grades"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 flex min-h-11 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
              >
                شروع آزمون
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
