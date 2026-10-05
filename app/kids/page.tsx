import Link from "next/link";
import { AppShell } from "@/app/components/app-shell";
import { KidsBrowser } from "@/app/components/kids-browser";
import { PlusIcon } from "@/app/components/icons";
import { KIDS } from "@/app/data/kids";

export default function KidsPage() {
  return (
    <AppShell>
      <main className="min-w-0 flex-1 md:h-screen md:overflow-y-auto">
        <div className="mx-auto w-full max-w-[880px] px-5 pt-[34px] pb-20 md:px-10">
          <div className="mb-[22px] flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-1 text-[12.5px] font-extrabold tracking-[0.8px] text-brand-accent">
                GESTIÓN
              </div>
              <h1 className="m-0 font-display text-[30px] font-semibold text-ink">
                Niños
              </h1>
            </div>
            <Link
              href="/kids/new"
              className="flex items-center justify-center gap-2 rounded-[14px] bg-linear-[180deg] from-brand-cta-top to-brand-cta-bottom px-[18px] py-[11px] text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,0.7)]"
            >
              <PlusIcon />
              Agregar niño
            </Link>
          </div>

          <KidsBrowser kids={KIDS} />
        </div>
      </main>
    </AppShell>
  );
}
