import { MobileDrawer } from "@/components/home/MobileDrawer";
import { Sidebar } from "@/components/home/Sidebar";
import { ChildProfileHero } from "@/components/children/ChildProfileHero";
import { AllergyAlert } from "@/components/children/AllergyAlert";
import { ChildInfoCard } from "@/components/children/ChildInfoCard";
import { ParentList } from "@/components/children/ParentList";
import { IconSun, IconChevronLeft } from "@/components/shared/Icons";
import type { Child } from "@/components/children/ChildCard";
import type { Parent } from "@/components/children/ParentListItem";

const PROFILE: Child = {
  id: "mateo",
  name: "Mateo",
  initial: "M",
  avatarColor: "bg-sky-300",
  avatarTextColor: "text-sky-900",
  age: 3,
  parentsLinked: 2,
  badge: { kind: "allergy", label: "MANÍ" },
};

const ALLERGY = "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila.";

const PROFILE_INFO = {
  birthDate: "12 mar 2022",
  classroom: "Soles",
  joinedAt: "feb 2025",
};

const PARENTS: Parent[] = [
  {
    id: "lucia",
    name: "Lucía Fernández",
    initial: "L",
    avatarColor: "bg-indigo-100",
    role: "Mamá",
    status: "active",
  },
  {
    id: "diego",
    name: "Diego Fernández",
    initial: "D",
    avatarColor: "bg-sky-300",
    role: "Papá",
    status: "pending",
  },
];

export default async function ChildProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  void id;
  return (
    <div className="min-h-screen bg-cream flex">
      <MobileDrawer activeKey="ninos" />
      <div className="hidden md:flex">
        <Sidebar activeKey="ninos" />
      </div>

      <main className="flex-1 min-w-0 h-screen overflow-y-auto">
        <div className="max-w-[820px] w-full mx-auto pt-20 md:pt-[34px] px-5 md:px-10 pb-20">
          <a
            href="/kids"
            className="flex items-center gap-[7px] text-ink-300 font-bold text-[14px] mb-5"
          >
            <IconChevronLeft width={18} height={18} strokeWidth={2.2} />
            Volver a Niños
          </a>

          <div className="flex flex-wrap gap-6 items-start">
            <div className="flex-1 min-w-[300px] flex flex-col gap-[18px]">
              <ChildProfileHero child={PROFILE} />
              <AllergyAlert text={ALLERGY} />
              <ChildInfoCard info={PROFILE_INFO} />
            </div>
            <div className="w-[300px] flex-none flex flex-col gap-3.5">
              <a
                href="#"
                className="bg-ink-900 text-white rounded-2xl py-3 w-full font-extrabold text-[15px] flex items-center justify-center gap-2"
              >
                <IconSun width={18} height={18} />
                Resumen del día
              </a>
              <ParentList parents={PARENTS} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}