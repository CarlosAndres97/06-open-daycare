import type { ReactNode } from "react";

type AvatarProps = {
  color: string;
  initial?: string;
  children?: ReactNode;
  size?: number;
  className?: string;
};

export function Avatar({
  color,
  initial,
  children,
  size = 38,
  className,
}: AvatarProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`shrink-0 rounded-full flex items-center justify-center ${color}${className ? ` ${className}` : ""}`}
    >
      {children ??
        (initial ? (
          <span
            className="font-fredoka font-semibold"
            style={{ fontSize: size * 0.42 }}
          >
            {initial}
          </span>
        ) : null)}
    </div>
  );
}