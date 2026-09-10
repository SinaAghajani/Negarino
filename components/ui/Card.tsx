import type { HTMLAttributes, ReactNode } from "react";

type CardVariant = "default" | "soft" | "interactive";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: CardVariant;
  padding?: "none" | "sm" | "md" | "lg";
}

const variantClasses: Record<CardVariant, string> = {
  default: "border-slate-200 bg-white",
  soft: "border-slate-100 bg-slate-50/70",
  interactive:
    "border-slate-200 bg-white hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/40",
};

const paddingClasses = {
  none: "p-0",
  sm: "p-4",
  md: "p-5",
  lg: "p-6 sm:p-7",
};

export default function Card({
  children,
  variant = "default",
  padding = "md",
  className = "",
  ...props
}: CardProps) {
  const classes = [
    "rounded-3xl border",
    "transition-all duration-200",
    variantClasses[variant],
    paddingClasses[padding],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div {...props} className={classes}>
      {children}
    </div>
  );
}
