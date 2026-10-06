import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/app/components/app-shell";
import { KidAvatarBadge } from "@/app/components/kid-card";
import {
  AlertTriangleIcon,
  ChevronLeftIcon,
  PlusIcon,
  SunIcon,
} from "@/app/components/icons";
import { KIDS, type Kid, type ParentAvatar, type ParentStatus } from "@/app/data/kids";

const PARENT_AVATAR_CLASSES: Record<ParentAvatar, string> = {
  purple: "bg-parent-purple",
  blue: "bg-parent-blue",
};

const PARENT_STATUS_LABELS: Record<ParentStatus, string> = {
  active: "ACTIVA",
  pending: "PENDIENTE",
};

const PARENT_STATUS_CLASSES: Record<ParentStatus, string> = {
  active: "bg-badge-active text-badge-active-ink",
  pending: "bg-badge-pending text-badge-pending-ink",
};

const PARENT_STATUS_HINTS: Record<ParentStatus, string> = {
  active: "activa",
  pending: "invitación enviada",
};

function KidProfile({ kid }: { kid: Kid }) {
  return (
    <AppShell>
      <main className="min-w-0 flex-1 md:h-screen md:overflow-y-auto">
        <div className="mx-auto w-full max-w-[820px] px-5 pt-[34px] pb-20 md:px-10">
          <Link
            href="/kids"
            className="mb-5 flex items-center gap-[7px] text-[14px] font-bold text-ink-soft"
          >
            <ChevronLeftIcon />
            Volver a Niños
          </Link>

          <div className="flex flex-wrap items-start gap-x-[26px] gap-y-5">
            <div className="flex min-w-[300px] flex-1 flex-col gap-[18px]">
              <div className="flex flex-wrap items-center gap-[18px]">
                <KidAvatarBadge kid={kid} className="size-[84px] text-[34px]" />
                <div className="min-w-0 flex-1">
                  <h1 className="m-0 font-display text-[28px] font-semibold text-ink">
                    {kid.name}
                  </h1>
                  <p className="mt-[3px] text-[15px] text-ink-soft">
                    {kid.age} años · Sala {kid.classroom}
                  </p>
                </div>
                <Link
                  href={`/kids/${kid.id}/edit`}
                  className="rounded-[12px] border-[1.5px] border-line bg-surface px-4 py-[9px] text-[14px] font-bold text-ink-nav"
                >
                  Editar
                </Link>
              </div>

              {kid.allergyNotes && (
                <div className="flex gap-3.5 rounded-2xl bg-alert-bg p-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-[11px] bg-alert-icon text-white">
                    <AlertTriangleIcon />
                  </span>
                  <div>
                    <div className="mb-0.5 text-[15px] font-extrabold text-alert-title">
                      Alergias y notas
                    </div>
                    <div className="text-[14.5px] leading-[1.5] text-alert-body">
                      {kid.allergyNotes}
                    </div>
                  </div>
                </div>
              )}

              <div className="overflow-hidden rounded-2xl border border-line bg-surface">
                <div className="flex items-center justify-between border-b border-line-soft px-[18px] py-[15px]">
                  <span className="text-[14.5px] text-ink-soft">
                    Fecha de nacimiento
                  </span>
                  <span className="text-[14.5px] font-extrabold text-ink">
                    {kid.birthDate}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-line-soft px-[18px] py-[15px]">
                  <span className="text-[14.5px] text-ink-soft">Sala</span>
                  <span className="text-[14.5px] font-extrabold text-ink">
                    {kid.classroom}
                  </span>
                </div>
                <div className="flex items-center justify-between px-[18px] py-[15px]">
                  <span className="text-[14.5px] text-ink-soft">Ingreso</span>
                  <span className="text-[14.5px] font-extrabold text-ink">
                    {kid.enrolled}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3.5 md:w-[300px] md:flex-none">
              <Link
                href={`/kids/${kid.id}/daily-summary`}
                className="flex w-full items-center justify-center gap-[9px] rounded-[14px] bg-ink px-[13px] py-[13px] text-[15px] font-extrabold text-surface"
              >
                <SunIcon size={18} />
                Resumen del día
              </Link>

              <div className="rounded-2xl border border-line bg-surface px-[18px] py-4">
                <div className="mb-[14px] text-[12.5px] font-extrabold tracking-[0.8px] text-ink-label">
                  PADRES VINCULADOS
                </div>
                <div className="flex flex-col gap-3.5">
                  {kid.parents.map((parent) => (
                    <div key={parent.name} className="flex items-center gap-3">
                      <span
                        className={`flex size-10 shrink-0 items-center justify-center rounded-full font-display text-[16px] font-semibold text-white ${PARENT_AVATAR_CLASSES[parent.avatar]}`}
                      >
                        {parent.name.charAt(0)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[14.5px] font-extrabold text-ink">
                          {parent.name}
                        </div>
                        <div className="text-[12.5px] text-ink-muted">
                          {parent.role} · {PARENT_STATUS_HINTS[parent.status]}
                        </div>
                      </div>
                      <span
                        className={`flex-none rounded-full px-[9px] py-1 text-[10.5px] font-extrabold ${PARENT_STATUS_CLASSES[parent.status]}`}
                      >
                        {PARENT_STATUS_LABELS[parent.status]}
                      </span>
                    </div>
                  ))}

                  <Link
                    href={`/kids/${kid.id}/link-parent`}
                    className="flex items-center gap-3 pt-2"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-dashed border-line-placeholder text-ink-placeholder">
                      <PlusIcon size={18} />
                    </span>
                    <span className="text-[14.5px] font-extrabold text-brand-edit">
                      Vincular otro padre
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AppShell>
  );
}

export default async function KidPage({ params }: PageProps<"/kids/[id]">) {
  const { id } = await params;
  const kid = KIDS.find((item) => item.id === id);
  if (!kid) notFound();

  return <KidProfile kid={kid} />;
}
