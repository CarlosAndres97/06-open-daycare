import { MobileDrawer } from "@/components/home/MobileDrawer";
import { Sidebar } from "@/components/home/Sidebar";
import { FeedHeader } from "@/components/home/FeedHeader";
import { ComposerTile } from "@/components/home/ComposerTile";
import { PostCard } from "@/components/home/PostCard";
import { POSTS } from "@/data/mock";

export default function Home() {
  return (
    <div className="min-h-screen bg-cream flex">
      <MobileDrawer />
      <div className="hidden md:flex">
        <Sidebar activeKey="feed" />
      </div>

      <main className="flex-1 min-w-0 h-screen overflow-y-auto">
        <div className="max-w-[760px] w-full mx-auto pt-20 md:pt-[34px] px-5 md:px-10 pb-20">
          <FeedHeader />
          <ComposerTile />

          <div className="flex items-center gap-[14px] mb-3.5">
            <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-ink-400">
              PUBLICADO HOY
            </span>
            <span className="flex-1 h-px bg-beige-400" />
          </div>

          <div className="flex flex-col gap-4">
            {POSTS.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}