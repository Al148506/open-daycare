import Link from "next/link";
import type { Post, PostType } from "@/app/data/feed";
import {
  CommentIcon,
  HeartIcon,
  MegaphoneIcon,
  PhotoIcon,
} from "@/app/components/icons";

type PostCardProps = {
  post: Post;
};

const TYPE_LABELS: Record<PostType, string> = {
  achievement: "LOGRO",
  activity: "ACTIVIDAD",
  announcement: "ANUNCIO",
};

const TYPE_CHIP_CLASSES: Record<PostType, string> = {
  achievement: "bg-achievement-soft text-achievement",
  activity: "bg-activity-soft text-activity",
  announcement: "bg-announcement-soft text-announcement",
};

export function PostCard({ post }: PostCardProps) {
  const { child, photo, type } = post;
  const chipClass = TYPE_CHIP_CLASSES[type];

  return (
    <article className="rounded-[20px] border border-line bg-surface px-[22px] py-5 shadow-[0_4px_16px_-12px_rgba(120,90,60,0.5)]">
      <div className="mb-[14px] flex items-center gap-3">
        {child ? (
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-avatar-child font-display text-[17px] font-semibold text-avatar-child-ink">
            {child.initial}
          </span>
        ) : (
          <span
            className={`flex size-11 shrink-0 items-center justify-center rounded-full ${chipClass}`}
          >
            <MegaphoneIcon />
          </span>
        )}

        <div className="min-w-0 flex-1">
          <div className="font-display text-[16.5px] font-semibold text-ink">
            {post.title}
          </div>
          <div className="text-[12.5px] text-ink-muted">
            {post.time} · {post.author}
          </div>
        </div>

        <span
          className={`flex items-center gap-[7px] rounded-full px-3 py-1.5 ${chipClass}`}
        >
          <span className="size-2 rounded-full bg-current" />
          <span className="text-[12px] font-extrabold tracking-[0.5px]">
            {TYPE_LABELS[type]}
          </span>
        </span>
      </div>

      <div className="mb-2.5 text-[12.5px] text-ink-muted">
        Para: {post.audience}
      </div>

      <p className="m-0 text-[15.5px] leading-[1.55] text-ink-body">{post.body}</p>

      {photo && (
        <Link
          href="/foto"
          className="mt-[14px] flex h-[200px] flex-col items-center justify-center gap-2 rounded-[16px] border-[1.5px] border-dashed border-line-placeholder bg-surface-muted text-ink-placeholder"
        >
          <PhotoIcon />
          <span className="text-[13.5px]">{photo.label}</span>
        </Link>
      )}

      <div className="mt-4 flex items-center gap-[18px] border-t border-line-soft pt-[14px]">
        <span className="flex items-center gap-[7px] text-[14px] font-bold text-brand-cta">
          <HeartIcon />
          {post.reactions}
        </span>

        <Link
          href="/detalle-publicacion"
          className="flex items-center gap-[7px] text-[14px] font-bold text-ink-soft"
        >
          <CommentIcon />
          {post.comments}
        </Link>

        {post.own && (
          <>
            <span className="flex-1" />
            <Link
              href="/nueva-publicacion"
              className="text-[14px] font-extrabold text-brand-edit"
            >
              Editar
            </Link>
          </>
        )}
      </div>
    </article>
  );
}