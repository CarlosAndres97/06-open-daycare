import { Avatar } from "@/components/shared/Avatar";
import {
  IconHeart,
  IconComment,
  IconImage,
  IconMegaphone,
} from "@/components/shared/Icons";
import { PostBadge } from "@/components/home/PostBadge";
import type { Post } from "@/data/mock";

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  const isAnnouncement = post.kind === "announcement";
  const avatarBg = isAnnouncement ? "bg-indigo-100" : "bg-sky-300";
  const avatarText = isAnnouncement ? "text-indigo-700" : "text-sky-900";
  const displayName = isAnnouncement ? "Anuncio general" : post.childName;

  return (
    <div className="bg-cream-soft border border-beige-200 rounded-[20px] p-5 shadow-[0_4px_16px_-12px_rgba(120,90,60,0.5)]">
      <div className="flex items-center gap-3 mb-3.5">
        {isAnnouncement ? (
          <Avatar color={avatarBg} size={44} className={avatarText}>
            <IconMegaphone width={20} height={20} />
          </Avatar>
        ) : (
          <Avatar
            color={avatarBg}
            size={44}
            className={avatarText}
            initial={post.childName?.[0]}
          />
        )}
        <div className="flex-1">
          <div className="font-fredoka font-semibold text-[16.5px] text-ink-900">
            {displayName}
          </div>
          <div className="text-[12.5px] text-ink-200">
            {post.time} · {post.publishedBy}
          </div>
        </div>
        <PostBadge kind={post.kind} />
      </div>

      <div className="text-[12.5px] text-ink-200 mb-2.5">
        Para: {post.audience}
      </div>

      <p className="text-[15.5px] leading-[1.55] text-ink-700 m-0">
        {post.body}
      </p>

      {post.photoCaption && (
        <div className="flex flex-col items-center justify-center gap-2 mt-3.5 border-[1.5px] border-dashed border-beige-700 rounded-2xl bg-beige-600 h-[200px] text-ink-100">
          <IconImage width={30} height={30} />
          <span className="text-[13.5px]">{post.photoCaption}</span>
        </div>
      )}

      <div className="flex items-center gap-[18px] mt-4 pt-3.5 border-t border-beige-500">
        <span className="flex items-center gap-1.5 text-coral-800 font-bold text-sm">
          <IconHeart width={19} height={19} />
          {post.likes}
        </span>
        <a
          href="#"
          className="flex items-center gap-1.5 text-ink-300 font-bold text-sm"
        >
          <IconComment width={18} height={18} />
          {post.comments}
        </a>
        <span className="flex-1" />
        <a href="#" className="text-coral-900 font-extrabold text-sm">
          Editar
        </a>
      </div>
    </div>
  );
}