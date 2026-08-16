"use client";

interface LinkParentModalProps {
  isOpen: boolean;
  onClose: () => void;
  childName?: string;
}

export function LinkParentModal({ isOpen, onClose, childName }: LinkParentModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-10 px-6 bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[480px] bg-[#FBF4EC] border border-[#ECE0D0] rounded-[24px] shadow-[0_20px_50px_-24px_rgba(63,54,46,0.35)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-[26px] py-5 border-b border-[#ECE0D0]">
          <div>
            <div className="font-fredoka font-semibold text-[18px] text-[#3F362E]">
              Vincular padre
            </div>
            {childName && (
              <div className="text-[13px] text-[#A89A8B]">a {childName}</div>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-[34px] h-[34px] rounded-[10px] bg-[#F0E6D8] text-[#94887B] flex items-center justify-center hover:bg-[#E5D8C4] hover:text-[#6E6359] transition-colors cursor-pointer"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-[22px]">
          <div className="flex gap-[11px] bg-[#E3ECFB] rounded-[14px] p-4 mb-5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4E72C8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-none mt-[2px]"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            <span className="text-[13.5px] text-[#3F5694] leading-[1.45]">
              Le enviaremos un correo con un código para que active su cuenta. Solo verá el feed de {childName || "el niño"}.
            </span>
          </div>

          <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-2">
            NOMBRE DEL PADRE/MADRE
          </div>
          <input
            type="text"
            placeholder="Ej. Diego Fernández"
            className="w-full px-4 py-[13px] rounded-[14px] border border-[#EADFD0] bg-white text-[15px] text-[#3F362E] placeholder:text-[#B6A99B] focus:outline-none focus:border-[#D9583C] mb-[18px]"
          />

          <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-2">
            EMAIL
          </div>
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            className="w-full px-4 py-[13px] rounded-[14px] border border-[#EADFD0] bg-white text-[15px] text-[#3F362E] placeholder:text-[#B6A99B] focus:outline-none focus:border-[#D9583C] mb-[18px]"
          />

          <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-[10px]">
            PARENTESCO
          </div>
          <div className="flex gap-[9px] mb-5">
            <button className="flex-1 py-[11px] rounded-[999px] border border-[#9FB8EC] bg-[#CCD8F4] text-[#4E72C8] font-extrabold text-[14px] hover:bg-[#B8C9F0] hover:border-[#8BA6E0] transition-colors cursor-pointer">
              Mamá
            </button>
            <button className="flex-1 py-[11px] rounded-[999px] border border-[#ECE0D0] bg-[#FFFDF9] text-[#6E6359] font-extrabold text-[14px] hover:bg-[#F5EEE3] hover:border-[#D9CEBB] transition-colors cursor-pointer">
              Papá
            </button>
            <button className="flex-1 py-[11px] rounded-[999px] border border-[#ECE0D0] bg-[#FFFDF9] text-[#6E6359] font-extrabold text-[14px] hover:bg-[#F5EEE3] hover:border-[#D9CEBB] transition-colors cursor-pointer">
              Tutor/a
            </button>
          </div>

          <div className="bg-[#FBF1D6] border border-dashed border-[#E6D08A] rounded-[16px] p-[18px] text-center mb-5">
            <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#A88526] mb-2">
              CÓDIGO DE INVITACIÓN
            </div>
            <div className="font-fredoka font-semibold text-[34px] tracking-[7px] text-[#8A7234]">
              7K4P9
            </div>
            <div className="text-[13px] text-[#A88526] mt-[6px]">
              Vence en 7 días
            </div>
          </div>

          <button className="w-full py-[14px] rounded-[14px] bg-gradient-to-b from-[#F4977E] to-[#EE8164] text-white font-extrabold text-[15.5px] shadow-[0_10px_22px_-8px_rgba(238,129,100,0.7)] flex items-center justify-center gap-[9px] hover:from-[#F08A6B] hover:to-[#E57658] transition-all hover:shadow-[0_12px_24px_-10px_rgba(238,129,100,0.8)] cursor-pointer">
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m22 2-7 20-4-9-9-4z" />
              <path d="M22 2 11 13" />
            </svg>
            Enviar invitación
          </button>
        </div>
      </div>
    </div>
  );
}
