"use client";

import { useState } from "react";
import { MobileDrawer } from "@/components/home/MobileDrawer";
import { Sidebar } from "@/components/home/Sidebar";
import { FeedHeader } from "@/components/home/FeedHeader";
import { ComposerTile } from "@/components/home/ComposerTile";
import { PostCard } from "@/components/home/PostCard";
import { CreatePostModal } from "@/components/publications/CreatePostModal";
import { POSTS } from "@/data/mock";

export default function Home() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const openCreate = () => setIsCreateModalOpen(true);

  return (
    <div className="min-h-screen bg-cream flex">
      <MobileDrawer onCreatePost={openCreate} />
      <div className="hidden md:flex">
        <Sidebar activeKey="feed" onCreatePost={openCreate} />
      </div>

      <main className="flex-1 min-w-0 h-screen overflow-y-auto">
        <div className="max-w-[760px] w-full mx-auto pt-20 md:pt-[34px] px-5 md:px-10 pb-20">
          <FeedHeader />
          <ComposerTile onClick={() => setIsCreateModalOpen(true)} />

          <CreatePostModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
          />

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