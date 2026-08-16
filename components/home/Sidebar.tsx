import { Avatar } from "@/components/shared/Avatar";
import {
  IconSun,
  IconPlus,
  IconHome,
  IconUsers,
  IconBell,
  IconUser,
  IconLogout,
} from "@/components/shared/Icons";

type NavKey = "feed" | "ninos" | "avisos" | "mi-cuenta";

type NavItem = {
  key: NavKey;
  label: string;
  icon: typeof IconHome;
};

const navItems: NavItem[] = [
  { key: "feed", label: "Feed", icon: IconHome },
  { key: "ninos", label: "Niños", icon: IconUsers },
  { key: "avisos", label: "Avisos", icon: IconBell },
  { key: "mi-cuenta", label: "Mi cuenta", icon: IconUser },
];

export function Sidebar({ activeKey = "feed" }: { activeKey?: NavKey }) {
  return (
    <aside className="w-[248px] shrink-0 bg-cream-soft border-r border-beige-200 flex flex-col p-6 sticky top-0 h-screen">
      <a
        href="#"
        className="flex items-center gap-[11px] py-1 px-2 pb-[22px]"
      >
        <div className="w-[38px] h-[38px] shrink-0 rounded-xl bg-gradient-to-br from-coral-300 to-coral-400 flex items-center justify-center text-white">
          <IconSun width={21} height={21} strokeWidth={2.2} />
        </div>
        <div>
          <div className="font-fredoka font-semibold text-[17px] text-ink-900 leading-none">
            OpenDayCare
          </div>
          <div className="text-[11.5px] text-ink-200 mt-[2px]">
            Sala Soles
          </div>
        </div>
      </a>

      <a
        href="#"
        className="flex items-center justify-center gap-2 w-full py-3 rounded-[14px] bg-gradient-to-b from-coral-500 to-coral-600 text-white font-extrabold text-[14.5px] shadow-[0_8px_18px_-8px_rgba(238,129,100,0.75)] mb-[18px]"
      >
        <IconPlus width={17} height={17} strokeWidth={2.4} />
        Nueva publicación
      </a>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ key, label, icon: Icon }) => {
          const active = key === activeKey;
          return (
          <a
            key={key}
            href="#"
            className={`flex items-center gap-3 py-[11px] px-3 rounded-xl text-[14.5px] ${
              active
                ? "bg-beige-100 text-coral-700 font-extrabold"
                : "bg-transparent text-ink-500 font-semibold"
            }`}
          >
            <Icon width={19} height={19} />
            {label}
          </a>
          );
        })}
      </nav>

      <div className="border-t border-beige-200 pt-[14px] mt-[10px]">
        <div className="flex items-center gap-[11px] py-1.5 px-2">
          <Avatar
            color="bg-coral-400"
            size={38}
            className="text-white"
            initial="C"
          />
          <div className="flex-1 min-w-0">
            <div className="font-extrabold text-[14px] text-ink-900">
              Caro Giménez
            </div>
            <div className="text-[12px] text-ink-200">
              Maestra · Soles
            </div>
          </div>
          <a
            href="#"
            title="Cerrar sesión"
            className="shrink-0 w-8 h-8 rounded-[10px] bg-cream text-ink-300 flex items-center justify-center"
          >
            <IconLogout width={16} height={16} />
          </a>
        </div>
      </div>
    </aside>
  );
}