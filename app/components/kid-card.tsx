import Link from "next/link";
import type { Kid, KidAvatar, KidBadge } from "@/app/data/kids";
import { ChevronRightIcon } from "@/app/components/icons";

const AVATAR_CLASSES: Record<KidAvatar, string> = {
  blue: "bg-kid-blue text-kid-blue-ink",
  pink: "bg-kid-pink text-kid-pink-ink",
  green: "bg-kid-green text-kid-green-ink",
  yellow: "bg-kid-yellow text-kid-yellow-ink",
  purple: "bg-kid-purple text-kid-purple-ink",
};

const BADGE_LABELS: Record<KidBadge, string> = {
  peanut: "MANÍ",
  lactose: "LACTOSA",
  linkParent: "VINCULAR",
};

const BADGE_CLASSES: Record<KidBadge, string> = {
  peanut: "bg-badge-allergy text-badge-allergy-ink",
  lactose: "bg-badge-allergy text-badge-allergy-ink",
  linkParent: "bg-badge-link text-badge-link-ink",
};

export function KidAvatarBadge({
  kid,
  className,
}: {
  kid: Kid;
  className: string;
}) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full font-display font-semibold ${AVATAR_CLASSES[kid.avatar]} ${className}`}
    >
      {kid.initial}
    </span>
  );
}

export function kidSubtitle(kid: Kid) {
  const parents =
    kid.parents.length === 0
      ? "sin padres vinculados"
      : `${kid.parents.length} padres vinculados`;
  return `${kid.age} años · ${parents}`;
}

type KidCardProps = {
  kid: Kid;
};

export function KidCard({ kid }: KidCardProps) {
  return (
    <Link
      href={`/kids/${kid.id}`}
      className="flex min-w-0 items-center gap-[14px] rounded-[18px] border border-line bg-surface p-4 shadow-[0_4px_14px_-12px_rgba(120,90,60,0.5)] transition hover:-translate-y-0.5 hover:border-kid-hover-line"
    >
      <KidAvatarBadge kid={kid} className="size-12 text-[19px]" />

      <span className="min-w-0 flex-1">
        <span className="block truncate font-display text-[16px] font-semibold text-ink">
          {kid.name}
        </span>
        <span className="block text-[13px] text-ink-muted">
          {kidSubtitle(kid)}
        </span>
      </span>

      {kid.badge ? (
        <span
          className={`flex-none rounded-full px-[9px] py-[5px] text-[11px] font-extrabold ${BADGE_CLASSES[kid.badge]}`}
        >
          {BADGE_LABELS[kid.badge]}
        </span>
      ) : (
        <ChevronRightIcon className="flex-none text-chevron-idle" />
      )}
    </Link>
  );
}
