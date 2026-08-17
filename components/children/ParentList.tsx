"use client";

import { ParentListItem } from "@/components/children/ParentListItem";
import type { Parent } from "@/components/children/ParentListItem";
import { LinkParentRow } from "@/components/children/LinkParentRow";

type ParentListProps = {
  parents: Parent[];
  onLinkParent?: () => void;
};

export function ParentList({ parents, onLinkParent }: ParentListProps) {
  return (
    <div className="bg-cream-soft border border-beige-200 rounded-2xl p-4">
      <div className="text-ink-400 text-[12.5px] font-extrabold tracking-[0.8px] mb-[14px]">
        PADRES VINCULADOS
      </div>
      <div className="flex flex-col gap-3.5">
        {parents.map((p) => (
          <ParentListItem key={p.id} parent={p} />
        ))}
        <LinkParentRow onClick={onLinkParent} />
      </div>
    </div>
  );
}