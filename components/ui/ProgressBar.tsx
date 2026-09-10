import type { HTMLAttributes } from "react";

type ProgressVariant = "primary" | "success" | "warning" | "danger";

interface ProgressBarProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  value: number;
  variant?: ProgressVariant;
  showLabel?: boolean;
  label?: string;
  size?: "sm" | "md" | "lg";
}

const variantClasses: Record<ProgressVariant, string> = {
  primary: "bg-blue-600",
  success: "bg-green-500",
  warning: "bg-yellow-500",
  danger: "bg-red-500",
};

const sizeClasses = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3",
};

export default function ProgressBar({
  value,
  variant = "primary",
  showLabel = false,
  label,
  size = "md",
  className = "",
  ...props
}: ProgressBarProps) {
  const normalizedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      {...props}
      className={`w-full ${className}`}
      role="progressbar"
      aria-valuenow={normalizedValue}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {showLabel && (
        <div className="mb-2 flex items-center justify-between gap-3 text-xs font-medium text-slate-500">
          <span>{label ?? "پیشرفت"}</span>
          <span>{normalizedValue}٪</span>
        </div>
      )}

      <div
        className={`w-full overflow-hidden rounded-full bg-slate-100 ${sizeClasses[size]}`}
      >
        <div
          className={`h-full rounded-full transition-[width] duration-500 ease-out ${variantClasses[variant]}`}
          style={{ width: `${normalizedValue}%` }}
        />
      </div>
    </div>
  );
}
