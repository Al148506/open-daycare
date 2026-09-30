import Link from "next/link";
import { CLASSROOM, TEACHER } from "@/app/data/feed";
import {
  BellIcon,
  ChildrenIcon,
  HomeIcon,
  LogOutIcon,
  PlusIcon,
  SunIcon,
  UserIcon,
} from "@/app/components/icons";

type SidebarProps = {
  isOpen: boolean;
  onNavigate: () => void;
};

const NAV_ITEMS = [
  { label: "Feed", href: "/", icon: HomeIcon, isActive: true },
  { label: "Niños", href: "/ninos", icon: ChildrenIcon, isActive: false },
  { label: "Avisos", href: "/avisos", icon: BellIcon, isActive: false },
  { label: "Mi cuenta", href: "/mi-cuenta", icon: UserIcon, isActive: false },
];

const ITEM_BASE_CLASS =
  "flex items-center gap-3 rounded-xl px-3 py-[11px] text-[14.5px]";

const ITEM_ACTIVE_CLASS = "bg-brand-tint font-extrabold text-brand-accent";

const ITEM_IDLE_CLASS = "font-semibold text-ink-nav";

export function Sidebar({ isOpen, onNavigate }: SidebarProps) {
  return (
    <aside
      id="app-sidebar"
      className={[
        "fixed top-0 left-0 z-50 flex h-screen w-[248px] shrink-0 flex-col",
        "overflow-y-auto border-r border-line bg-surface py-6 pr-4 pl-4",
        "transition-transform duration-200",
        "md:sticky md:z-auto md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
      ].join(" ")}
    >
      <Link
        href="/"
        onClick={onNavigate}
        className="flex items-center gap-[11px] px-2 pt-1 pb-[22px]"
      >
        <span className="flex size-[38px] shrink-0 items-center justify-center rounded-[12px] bg-linear-[155deg] from-brand-soft to-brand text-white">
          <SunIcon />
        </span>
        <span>
          <span className="block font-display text-[17px] leading-none font-semibold text-ink">
            OpenDayCare
          </span>
          <span className="mt-0.5 block text-[11.5px] text-ink-muted">
            {CLASSROOM.name}
          </span>
        </span>
      </Link>

      <Link
        href="/nueva-publicacion"
        onClick={onNavigate}
        className="mb-[18px] flex w-full items-center justify-center gap-2 rounded-[14px] bg-linear-[180deg] from-brand-cta-top to-brand-cta-bottom px-3 py-3 text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,0.75)]"
      >
        <PlusIcon />
        Nueva publicación
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map(({ label, href, icon: Icon, isActive }) => (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={`${ITEM_BASE_CLASS} ${
              isActive ? ITEM_ACTIVE_CLASS : ITEM_IDLE_CLASS
            }`}
          >
            <Icon />
            {label}
          </Link>
        ))}
      </nav>

      <div className="mt-2.5 border-t border-line pt-[14px]">
        <div className="flex items-center gap-[11px] px-2 py-1.5">
          <span className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-brand font-display text-[16px] font-semibold text-white">
            {TEACHER.firstName.charAt(0)}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[14px] font-extrabold text-ink">
              {TEACHER.name}
            </span>
            <span className="block text-[12px] text-ink-muted">
              {TEACHER.role} · {CLASSROOM.shortName}
            </span>
          </span>
          <Link
            href="/login"
            onClick={onNavigate}
            title="Cerrar sesión"
            aria-label="Cerrar sesión"
            className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-canvas text-ink-soft"
          >
            <LogOutIcon />
          </Link>
        </div>
      </div>
    </aside>
  );
}