type Tone = "sage" | "sky" | "indigo";

const toneStyles: Record<Tone, { bg: string; text: string; dot: string }> = {
  sage: {
    bg: "bg-sage-100",
    text: "text-sage-700",
    dot: "bg-sage-700",
  },
  sky: {
    bg: "bg-sky-100",
    text: "text-sky-700",
    dot: "bg-sky-700",
  },
  indigo: {
    bg: "bg-indigo-100",
    text: "text-indigo-700",
    dot: "bg-indigo-700",
  },
};

type BadgeProps = {
  tone: Tone;
  label: string;
  className?: string;
};

export function Badge({ tone, label, className }: BadgeProps) {
  const styles = toneStyles[tone];
  return (
    <div
      className={`flex items-center gap-[7px] px-3 py-1.5 rounded-full ${styles.bg}${className ? ` ${className}` : ""}`}
    >
      <span className={`w-2 h-2 rounded-full ${styles.dot}`} />
      <span
        className={`text-xs font-extrabold tracking-[0.5px] ${styles.text}`}
      >
        {label}
      </span>
    </div>
  );
}