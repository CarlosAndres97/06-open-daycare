"use client";

import { useState } from "react";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const kids = [
  { id: "1", name: "Mateo", initials: "M", avatarBg: "#A9D9E8", avatarColor: "#1F7A93" },
  { id: "2", name: "Sofía", initials: "S", avatarBg: "#F4B8CC", avatarColor: "#C44A7A" },
  { id: "3", name: "Benjamín", initials: "B", avatarBg: "#B9DEC4", avatarColor: "#3E8B62" },
];

const postTypes = [
  { label: "Comida", bg: "#9A7B1E", color: "#fff" },
  { label: "Siesta", bg: "#E7DCF6", color: "#7B5FC0" },
  { label: "Actividad", bg: "#2E89A6", color: "#fff" },
  { label: "Logro", bg: "#CFEBD8", color: "#3E9B6C" },
  { label: "Ánimo", bg: "#F9D2DE", color: "#C56486" },
  { label: "Foto", bg: "#FBD8CC", color: "#D9684A" },
  { label: "Anuncio", bg: "#CCD8F4", color: "#4E72C8" },
];

const defaultDescription =
  "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón.";

export function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const [selectedKid, setSelectedKid] = useState("1");
  const [selectedType, setSelectedType] = useState("Actividad");
  const [description, setDescription] = useState(defaultDescription);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-6 bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[580px] bg-[#FBF4EC] border border-[#ECE0D0] rounded-[24px] shadow-[0_20px_50px_-24px_rgba(63,54,46,0.35)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-[26px] py-5 border-b border-[#ECE0D0]">
          <button
            onClick={onClose}
            className="text-[#94887B] font-bold text-[15px] hover:text-[#3F362E] transition-colors"
          >
            Cancelar
          </button>
          <span className="font-fredoka font-semibold text-[18px] text-[#3F362E]">
            Nueva publicación
          </span>
          <button className="text-[#D9583C] font-extrabold text-[15px] hover:opacity-80 transition-opacity">
            Publicar
          </button>
        </div>

        <div className="p-6">
          <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-[10px]">
            PARA
          </div>
          <div className="flex flex-wrap gap-[9px] mb-[22px]">
            {kids.map((kid) => (
              <button
                key={kid.id}
                onClick={() => setSelectedKid(kid.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 14px 6px 6px",
                  borderRadius: "999px",
                  border: selectedKid === kid.id ? "1.5px solid #3F362E" : "1.5px solid #ECE0D0",
                  background: selectedKid === kid.id ? "#3F362E" : "#FFFDF9",
                  color: selectedKid === kid.id ? "#fff" : "#6E6359",
                  fontWeight: 700,
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <span
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    background: kid.avatarBg,
                    color: kid.avatarColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Fredoka, sans-serif",
                    fontWeight: 600,
                    fontSize: "13px",
                  }}
                >
                  {kid.initials}
                </span>
                {kid.name}
              </button>
            ))}
            <button
              onClick={() => setSelectedKid("sala")}
              style={{
                padding: "6px 16px",
                borderRadius: "999px",
                border: selectedKid === "sala" ? "1.5px solid #3F362E" : "1.5px solid #ECE0D0",
                background: selectedKid === "sala" ? "#3F362E" : "#FFFDF9",
                color: selectedKid === "sala" ? "#fff" : "#6E6359",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Toda la sala
            </button>
          </div>

          <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-[10px]">
            TIPO
          </div>
          <div className="flex flex-wrap gap-[9px] mb-[22px]">
            {postTypes.map((type) => (
              <button
                key={type.label}
                onClick={() => setSelectedType(type.label)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "999px",
                  border: "none",
                  background: type.bg,
                  color: type.color,
                  fontWeight: 800,
                  fontSize: "13.5px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: selectedType === type.label ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
                  transform: selectedType === type.label ? "scale(1.05)" : "scale(1)",
                }}
              >
                {type.label}
              </button>
            ))}
          </div>

          <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-[10px]">
            DESCRIPCIÓN
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Contá cómo le fue hoy…"
            className="w-full min-h-[120px] resize-y px-4 py-[14px] rounded-[14px] border border-[#EADFD0] bg-white text-[15px] text-[#3F362E] placeholder:text-[#B6A99B] focus:outline-none focus:border-[#2E89A6] leading-relaxed mb-[22px]"
          />

          <div className="text-[12px] font-extrabold tracking-[0.7px] text-[#94887B] mb-[10px]">
            FOTOS
          </div>
          <div className="flex gap-3">
            <div
              style={{
                width: "96px",
                height: "96px",
                borderRadius: "14px",
                background: "#F4ECE1",
                border: "1px solid #ECE0D0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#CBB89F",
              }}
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.6-3.6a2 2 0 0 0-2.8 0L6 21" />
              </svg>
            </div>
            <button
              style={{
                width: "96px",
                height: "96px",
                borderRadius: "14px",
                border: "1.5px dashed #DBCDBA",
                background: "#F4ECE1",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                color: "#B0A290",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C5503A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              <span style={{ fontSize: "12px" }}>Agregar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
