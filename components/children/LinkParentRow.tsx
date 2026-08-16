import { IconPlus } from "@/components/shared/Icons";

interface LinkParentRowProps {
  onClick?: () => void;
}

export function LinkParentRow({ onClick }: LinkParentRowProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 pt-2 w-full text-left"
    >
      <span className="w-10 h-10 rounded-full border border-dashed border-beige-300 flex items-center justify-center text-ink-100 shrink-0">
        <IconPlus width={18} height={18} strokeWidth={2.4} />
      </span>
      <span className="text-coral-900 font-extrabold text-[14.5px]">
        Vincular otro padre
      </span>
    </button>
  );
}