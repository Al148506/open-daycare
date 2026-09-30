"use client";

import { useEffect, useState, type ReactNode } from "react";
import { MenuIcon } from "@/app/components/icons";
import { Sidebar } from "@/app/components/sidebar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const closeNav = () => setIsNavOpen(false);

  useEffect(() => {
    if (!isNavOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeNav();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isNavOpen]);

  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar isOpen={isNavOpen} onNavigate={closeNav} />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-line bg-surface px-5 py-3 md:hidden">
          <button
            type="button"
            onClick={() => setIsNavOpen(true)}
            aria-label="Abrir navegación"
            aria-expanded={isNavOpen}
            aria-controls="app-sidebar"
            className="flex size-9 items-center justify-center rounded-xl bg-canvas text-ink-nav"
          >
            <MenuIcon />
          </button>
          <span className="font-display text-[16px] font-semibold text-ink">
            OpenDayCare
          </span>
        </header>

        {children}
      </div>

      {isNavOpen && (
        <button
          type="button"
          aria-label="Cerrar navegación"
          onClick={closeNav}
          className="fixed inset-0 z-40 bg-ink/30 md:hidden"
        />
      )}
    </div>
  );
}