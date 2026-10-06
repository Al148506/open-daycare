import Link from "next/link";
import { AppShell } from "@/app/components/app-shell";
import { CameraIcon } from "@/app/components/icons";
import { PostCard } from "@/app/components/post-card";
import { CLASSROOM, POSTS, TEACHER } from "@/app/data/feed";

export default function HomePage() {
  return (
    <AppShell>
      <main className="min-w-0 flex-1 md:h-screen md:overflow-y-auto">
        <div className="mx-auto w-full max-w-[760px] px-5 pt-[34px] pb-20 md:px-10">
          <div className="mb-6">
            <div className="mb-1 text-[12.5px] font-extrabold tracking-[0.8px] text-brand-accent">
              GUARDERÍA · {CLASSROOM.name.toUpperCase()}
            </div>
            <h1 className="m-0 font-display text-[30px] font-semibold text-ink">
              Buenas, {TEACHER.firstName}
            </h1>
            <p className="mt-[5px] text-[14.5px] text-ink-soft">
              {CLASSROOM.childCount} niños · martes 17 jun
            </p>
          </div>

          <Link
            href="/new-post"
            className="mb-6 flex items-center gap-[14px] rounded-[18px] border border-line bg-surface px-[18px] py-[14px] shadow-[0_4px_14px_-10px_rgba(120,90,60,0.4)]"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand font-display text-[16px] font-semibold text-white">
              {TEACHER.firstName.charAt(0)}
            </span>
            <span className="flex-1 text-[15px] text-ink-muted">
              Compartí un momento…
            </span>
            <span className="flex size-[38px] shrink-0 items-center justify-center rounded-xl bg-brand-tint text-brand-cta">
              <CameraIcon />
            </span>
          </Link>

          <div className="mb-[14px] flex items-center gap-[14px]">
            <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-ink-label">
              PUBLICADO HOY
            </span>
            <span className="h-px flex-1 bg-line-strong" />
          </div>

          <div className="flex flex-col gap-4">
            {POSTS.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>
    </AppShell>
  );
}