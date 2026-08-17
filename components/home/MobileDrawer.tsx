"use client";

import { useState } from "react";
import { Sidebar } from "@/components/home/Sidebar";
import { IconMenu, IconClose } from "@/components/shared/Icons";
import type { NavKey } from "@/components/home/Sidebar";

export function MobileDrawer({
  activeKey = "feed",
  onCreatePost,
}: {
  activeKey?: NavKey;
  onCreatePost?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl bg-cream-soft border border-beige-200 text-ink-700 flex items-center justify-center shadow-md"
      >
        {open ? (
          <IconClose width={22} height={22} />
        ) : (
          <IconMenu width={22} height={22} />
        )}
      </button>

      {open && (
        <>
          <div
            className="md:hidden fixed inset-0 z-30 bg-black/30 transition-opacity duration-200"
            onClick={close}
            aria-hidden="true"
          />
          <div className="md:hidden fixed inset-y-0 left-0 w-[248px] z-40 transition-transform duration-200 ease-out">
            <Sidebar activeKey={activeKey} onCreatePost={onCreatePost} />
          </div>
        </>
      )}
    </>
  );
}