import { IconPlus } from "@/components/shared/Icons";

export function ChildrenHeader() {
  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <div>
        <div className="text-coral-700 text-[12.5px] font-extrabold tracking-[0.8px]">
          GESTIÓN
        </div>
        <h1 className="font-fredoka font-semibold text-[30px] m-0 text-ink-900">
          Niños
        </h1>
      </div>
      <a
        href="#"
        className="flex items-center justify-center gap-2 py-3 px-4 rounded-[14px] bg-gradient-to-b from-coral-500 to-coral-600 text-white font-extrabold text-[14.5px] shadow-[0_8px_18px_-8px_rgba(238,129,100,0.75)]"
      >
        <IconPlus width={17} height={17} strokeWidth={2.4} />
        Agregar niño
      </a>
    </div>
  );
}