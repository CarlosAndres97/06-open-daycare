import { IconSearch } from "@/components/shared/Icons";

export function ChildrenSearch() {
  return (
    <label className="flex items-center gap-3 bg-cream-soft border border-beige-200 rounded-[14px] py-3 px-4 mb-4">
      <IconSearch width={18} height={18} className="stroke-ink-100" />
      <input
        type="text"
        placeholder="Buscar niño…"
        className="flex-1 bg-transparent outline-none border-0 text-[14.5px] text-ink-900 placeholder:text-ink-200"
      />
    </label>
  );
}