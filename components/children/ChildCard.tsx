import { Avatar } from "@/components/shared/Avatar";
import { Badge } from "@/components/shared/Badge";
import { IconChevronRight } from "@/components/shared/Icons";

export type ChildBadge =
  | { kind: "allergy"; label: string }
  | { kind: "link"; label: "VINCULAR" };

export type Child = {
  id: string;
  name: string;
  initial: string;
  avatarColor: string;
  avatarTextColor: string;
  age: number;
  parentsLinked: number | "none";
  badge?: ChildBadge;
};

type ChildCardProps = {
  child: Child;
};

const parentsLabel = (n: number | "none") => {
  if (n === "none") return "sin padres vinculados";
  if (n === 1) return "1 padre vinculado";
  return `${n} padres vinculados`;
};

export function ChildCard({ child }: ChildCardProps) {
  return (
    <a
      href={`/kids/${child.id}`}
      className="flex items-center gap-3 bg-cream-soft border border-beige-200 rounded-2xl p-3 transition-[transform,border-color] duration-150 hover:border-[#F2A78E] hover:-translate-y-0.5"
    >
      <Avatar
        color={child.avatarColor}
        initial={child.initial}
        className={child.avatarTextColor}
        size={44}
      />
      <div className="flex-1 min-w-0">
        <div className="font-fredoka font-semibold text-[16px] text-ink-900 truncate">
          {child.name}
        </div>
        <div className="text-[12.5px] text-ink-300 mt-[2px]">
          {child.age} años · {parentsLabel(child.parentsLinked)}
        </div>
      </div>
      <div className="shrink-0">
        {child.badge?.kind === "allergy" ? (
          <Badge tone="coral-soft" label={child.badge.label} />
        ) : child.badge?.kind === "link" ? (
          <Badge tone="pink" label={child.badge.label} />
        ) : (
          <IconChevronRight
            width={18}
            height={18}
            className="stroke-ink-200"
          />
        )}
      </div>
    </a>
  );
}