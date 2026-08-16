import { IconSun } from "@/components/shared/Icons";

type BrandPanelProps = {
  compact?: boolean;
  className?: string;
};

export function BrandPanel({ compact = false, className = "" }: BrandPanelProps) {
  const padding = compact ? "py-8 px-6" : "p-14";
  const gap = compact ? "gap-6" : "";
  const headlineSize = compact ? "text-[28px]" : "text-[42px]";
  const footerSize = compact ? "text-[13px]" : "text-[14px]";

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-coral-300 via-coral-400 to-coral-600 text-white flex flex-col justify-between ${padding} ${gap} ${className}`}
    >
      {!compact && (
        <>
          <div className="absolute w-[420px] h-[420px] rounded-full bg-white/12 -top-[140px] -right-[120px] pointer-events-none" />
          <div className="absolute w-[300px] h-[300px] rounded-full bg-white/10 -bottom-[110px] -left-[80px] pointer-events-none" />
        </>
      )}

      <div className="relative flex items-center gap-[13px]">
        <div className="w-[46px] h-[46px] rounded-[14px] bg-white/22 flex items-center justify-center">
          <IconSun width={26} height={26} strokeWidth={2.2} />
        </div>
        <span className="font-fredoka font-semibold text-[21px] tracking-[0.5px]">
          OpenDayCare
        </span>
      </div>

      <div className="relative">
        <h1
          className={`font-fredoka font-semibold ${headlineSize} leading-[1.12] m-0 mb-[18px]`}
        >
          El día de cada niño,
          <br />
          compartido con su familia.
        </h1>
        <p className="text-[17px] leading-[1.6] m-0 max-w-[430px] text-white/92">
          Publicá momentos, gestioná las salas y mantené a las familias cerca,
          desde un solo lugar.
        </p>
      </div>

      <div className={`relative text-white/90 ${footerSize}`}>
        🌿 Guardería Sala Soles
      </div>
    </div>
  );
}
