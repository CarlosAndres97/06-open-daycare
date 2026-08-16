"use client";

import { useState } from "react";
import { MobileDrawer } from "@/components/home/MobileDrawer";
import { Sidebar } from "@/components/home/Sidebar";
import { ChildrenHeader } from "@/components/children/ChildrenHeader";
import { ChildrenSearch } from "@/components/children/ChildrenSearch";
import { ChildCard } from "@/components/children/ChildCard";
import { AddChildModal } from "@/components/children/AddChildModal";
import type { Child } from "@/components/children/ChildCard";

const CHILDREN: Child[] = [
  {
    id: "mateo",
    name: "Mateo",
    initial: "M",
    avatarColor: "bg-sky-300",
    avatarTextColor: "text-sky-900",
    age: 3,
    parentsLinked: 2,
    badge: { kind: "allergy", label: "MANÍ" },
  },
  {
    id: "sofia",
    name: "Sofía",
    initial: "S",
    avatarColor: "bg-pink-100",
    avatarTextColor: "text-pink-700",
    age: 2,
    parentsLinked: 1,
  },
  {
    id: "benjamin",
    name: "Benjamín",
    initial: "B",
    avatarColor: "bg-sage-100",
    avatarTextColor: "text-sage-700",
    age: 3,
    parentsLinked: 2,
  },
  {
    id: "valentina",
    name: "Valentina",
    initial: "V",
    avatarColor: "bg-yellow-100",
    avatarTextColor: "text-yellow-700",
    age: 2,
    parentsLinked: "none",
    badge: { kind: "link", label: "VINCULAR" },
  },
  {
    id: "tomas",
    name: "Tomás",
    initial: "T",
    avatarColor: "bg-indigo-100",
    avatarTextColor: "text-indigo-700",
    age: 3,
    parentsLinked: 1,
    badge: { kind: "allergy", label: "LACTOSA" },
  },
  {
    id: "emma",
    name: "Emma",
    initial: "E",
    avatarColor: "bg-pink-100",
    avatarTextColor: "text-pink-700",
    age: 2,
    parentsLinked: 1,
  },
  {
    id: "lucas",
    name: "Lucas",
    initial: "L",
    avatarColor: "bg-sky-300",
    avatarTextColor: "text-sky-900",
    age: 3,
    parentsLinked: 1,
  },
  {
    id: "olivia",
    name: "Olivia",
    initial: "O",
    avatarColor: "bg-sage-100",
    avatarTextColor: "text-sage-700",
    age: 2,
    parentsLinked: 1,
  },
];

export default function KidsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream flex">
      <MobileDrawer activeKey="ninos" />
      <div className="hidden md:flex">
        <Sidebar activeKey="ninos" />
      </div>

      <main className="flex-1 min-w-0 h-screen overflow-y-auto">
        <div className="max-w-[880px] w-full mx-auto pt-20 md:pt-[34px] px-5 md:px-10 pb-20">
          <ChildrenHeader onAddClick={() => setIsModalOpen(true)} />
          <ChildrenSearch />

          <div className="flex items-center gap-[14px] mb-3.5">
            <span className="text-ink-900 text-[12.5px] font-extrabold tracking-[0.8px]">
              SALA SOLES
            </span>
            <span className="text-ink-200 text-[12.5px]">
              · {CHILDREN.length} niños
            </span>
            <span className="flex-1 h-px bg-beige-400" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {CHILDREN.map((c) => (
              <ChildCard key={c.id} child={c} />
            ))}
          </div>
        </div>
      </main>

      <AddChildModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}