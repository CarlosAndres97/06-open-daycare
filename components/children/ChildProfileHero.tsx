import { Avatar } from "@/components/shared/Avatar";
import type { Child } from "@/components/children/ChildCard";

type ChildProfileHeroProps = {
  child: Child;
};

export function ChildProfileHero({ child }: ChildProfileHeroProps) {
  return (
    <div className="flex items-center gap-[18px]">
      <Avatar
        color={child.avatarColor}
        initial={child.initial}
        className={child.avatarTextColor}
        size={84}
      />
      <div className="flex-1 min-w-0">
        <h1 className="font-fredoka font-semibold text-[28px] m-0 text-ink-900">
          {child.name}
        </h1>
        <p className="text-[15px] text-ink-300 m-0 mt-[3px]">
          {child.age} años · Sala Soles
        </p>
      </div>
      <a
        href="#"
        className="border border-beige-200 bg-cream-soft text-ink-500 px-4 py-2 rounded-xl font-bold text-[14px]"
      >
        Editar
      </a>
    </div>
  );
}