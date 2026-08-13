import { Avatar } from "@/components/shared/Avatar";
import { IconCamera } from "@/components/shared/Icons";

export function ComposerTile() {
  return (
    <a
      href="#"
      className="flex items-center gap-[14px] bg-cream-soft border border-beige-200 rounded-[18px] py-[14px] px-[18px] mb-6 shadow-[0_4px_14px_-10px_rgba(120,90,60,0.4)]"
    >
      <Avatar
        color="bg-coral-400"
        size={40}
        className="text-white"
        initial="C"
      />
      <span className="flex-1 text-ink-200 text-[15px]">
        Compartí un momento…
      </span>
      <span className="w-[38px] h-[38px] rounded-xl bg-beige-100 text-coral-800 flex items-center justify-center">
        <IconCamera width={19} height={19} />
      </span>
    </a>
  );
}