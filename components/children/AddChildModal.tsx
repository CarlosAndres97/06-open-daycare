"use client";

import { IconChevronDown } from "@/components/shared/Icons";

interface AddChildModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddChildModal({ isOpen, onClose }: AddChildModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[520px] bg-[#FBF4EC] border border-[#ECE0D0] rounded-[24px] shadow-[0_20px_50px_-24px_rgba(63,54,46,0.35)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-[26px] py-5 border-b border-[#ECE0D0]">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
            className="text-[#94887B] font-bold text-[15px]"
          >
            Cancelar
          </a>
          <span className="font-fredoka font-semibold text-[18px] text-[#3F362E]">
            Agregar niño
          </span>
          <a href="#" className="text-[#D9583C] font-extrabold text-[15px]">
            Guardar
          </a>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-2">
              NOMBRE COMPLETO
            </div>
            <input
              type="text"
              placeholder="Ej. Martina López"
              required
              className="w-full px-4 py-[13px] rounded-[14px] border border-[#EADFD0] bg-white text-[15px] text-[#3F362E] placeholder:text-[#B6A99B] focus:outline-none focus:border-[#D9583C]"
            />
          </div>

          <div className="flex gap-[14px] mb-4">
            <div className="flex-1">
              <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-2">
                FECHA DE NACIMIENTO
              </div>
              <input
                type="date"
                required
                className="w-full px-4 py-[13px] rounded-[14px] border border-[#EADFD0] bg-white text-[15px] text-[#3F362E] placeholder:text-[#B6A99B] focus:outline-none focus:border-[#D9583C]"
              />
            </div>
            <div className="flex-1">
              <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-2">
                SALA
              </div>
              <div className="relative">
                <select
                  required
                  className="w-full px-4 py-[13px] rounded-[14px] border border-[#EADFD0] bg-white text-[15px] text-[#3F362E] font-bold appearance-none cursor-pointer focus:outline-none focus:border-[#D9583C]"
                >
                  <option value="soles">Soles</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <IconChevronDown width={16} height={16} stroke="#B0A290" strokeWidth={2.2} />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-2">
              ALERGIAS (ETIQUETAS)
            </div>
            <input
              type="text"
              placeholder="Ej. Maní, Lactosa"
              className="w-full px-4 py-[13px] rounded-[14px] border border-[#EADFD0] bg-white text-[15px] text-[#3F362E] placeholder:text-[#B6A99B] focus:outline-none focus:border-[#D9583C]"
            />
          </div>

          <div>
            <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-2">
              NOTAS MÉDICAS
            </div>
            <textarea
              placeholder="Indicaciones, medicación, contactos…"
              className="w-full min-h-[90px] resize-none px-4 py-[13px] rounded-[14px] border border-[#EADFD0] bg-white text-[15px] text-[#3F362E] placeholder:text-[#B6A99B] focus:outline-none focus:border-[#D9583C] leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
