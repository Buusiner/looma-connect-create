"use client";

import Image from "next/image";
import { useState } from "react";

/* ─── Types ────────────────────────────────────────────────────────────────── */
type Tab = "for-you" | "following";

/* ─── Static sample data ───────────────────────────────────────────────────── */
const POSTS = [
  {
    id: 1,
    author: "FANCY",
    handle: "@fancy.studio",
    time: "21h",
    text: "Kraving — icon animation",
    image: null as string | null,
    imageBg: "linear-gradient(135deg, #6B21A8 0%, #EC4899 50%, #EF4444 100%)",
    likes: 52,
    comments: 1,
    avatarColor: "#6B21A8",
    initials: "F",
  },
  {
    id: 2,
    author: "KolBioStudio",
    handle: "@kolbiostudio",
    time: "3d",
    text: (
      <>
        Learning <em>motion</em> is so dope.
      </>
    ),
    image: null as string | null,
    imageBg: "#0D0D0D",
    likes: 18,
    comments: 4,
    avatarColor: "#FF6452",
    initials: "K",
  },
];

const SUGGESTED = [
  { id: 1, name: "Nur Mohammad", handle: "@nur-mohammed-synom" },
  { id: 2, name: "Breno Dubiela", handle: "@breno-dubiela" },
  { id: 3, name: "Rahe", handle: "@ahmed-rahad" },
  { id: 4, name: "EYK K", handle: "@eyk-k" },
  { id: 5, name: "Mino Arco", handle: "@bao-chan-tsn0jd" },
];

/* ─── Icons (inline SVG) ───────────────────────────────────────────────────── */
function IconFeed() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
}
function IconHype() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>;
}
function IconActivity() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
}
function IconMarketplace() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>;
}
function IconGallery() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;
}
function IconMembers() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}
function IconSearch() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
}
function IconHeart() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
}
function IconComment() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
}

/* ─── Sidebar nav item ─────────────────────────────────────────────────────── */
function NavItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium transition-colors duration-150"
      style={{
        background: active ? "#1A1A1A" : "transparent",
        color: active ? "#FF6452" : "#A3A3A3",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <span style={{ color: active ? "#FF6452" : "#A3A3A3" }}>{icon}</span>
      {label}
    </button>
  );
}

/* ─── Avatar placeholder ───────────────────────────────────────────────────── */
function Avatar({
  color,
  initials,
  size = 36,
}: {
  color: string;
  initials: string;
  size?: number;
}) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-semibold"
      style={{
        width: size,
        height: size,
        background: color,
        fontSize: size * 0.38,
        color: "#fff",
      }}
    >
      {initials}
    </div>
  );
}

/* ─── Post card ────────────────────────────────────────────────────────────── */
function PostCard({ post }: { post: typeof POSTS[number] }) {
  const [liked, setLiked] = useState(false);

  return (
    <div
      className="rounded-2xl border"
      style={{ background: "#111111", borderColor: "#222222" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-3">
        <Avatar color={post.avatarColor} initials={post.initials} size={36} />
        <div className="flex-1">
          <p className="text-[13px] font-semibold" style={{ color: "#F5F5F5" }}>
            {post.author}
            <span className="ml-2 font-normal" style={{ color: "#555" }}>
              {post.time}
            </span>
          </p>
        </div>
      </div>

      {/* Text */}
      <p className="px-5 pb-3 text-[14px]" style={{ color: "#E0E0E0", lineHeight: 1.6 }}>
        {post.text}
      </p>

      {/* Image placeholder */}
      <div
        className="mx-5 mb-4 overflow-hidden rounded-xl"
        style={{
          height: "220px",
          background: post.imageBg,
        }}
      />

      {/* Actions */}
      <div
        className="flex items-center gap-5 border-t px-5 py-3"
        style={{ borderColor: "#1E1E1E" }}
      >
        <button
          type="button"
          onClick={() => setLiked((v) => !v)}
          className="flex items-center gap-1.5 text-[13px] transition-colors"
          style={{ color: liked ? "#FF6452" : "#666", background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <IconHeart />
          {post.likes + (liked ? 1 : 0)}
        </button>
        <button
          type="button"
          className="flex items-center gap-1.5 text-[13px]"
          style={{ color: "#666", background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <IconComment />
          {post.comments}
        </button>
      </div>
    </div>
  );
}

/* ─── Dashboard page ───────────────────────────────────────────────────────── */
export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("feed");
  const [activeTab, setActiveTab] = useState<Tab>("for-you");
  const [followed, setFollowed] = useState<number[]>([]);
  const [postText, setPostText] = useState("");

  function toggleFollow(id: number) {
    setFollowed((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }

  return (
    <div
      className="flex min-h-screen"
      style={{ background: "#0A0A0A", color: "#FFFFFF" }}
    >
      {/* ── Sidebar ────────────────────────────────────────────────────────── */}
      <aside
        className="fixed top-0 left-0 flex h-screen flex-col px-3 py-5"
        style={{ width: "240px", background: "#0A0A0A", borderRight: "1px solid #1A1A1A" }}
      >
        {/* Logo */}
        <div className="mb-6 flex items-center gap-2 px-3">
          <Image src="/looma-logo2.png" alt="Looma" width={28} height={28} className="object-contain" />
          <span className="font-bold" style={{ color: "#FF6452", fontSize: "18px" }}>
            looma
          </span>
        </div>

        {/* Search */}
        <div
          className="mb-5 flex items-center gap-2 rounded-xl border px-3 py-2"
          style={{ background: "#111111", borderColor: "#222" }}
        >
          <IconSearch />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-[#444]"
            style={{ color: "#CCC" }}
          />
        </div>

        {/* Explore section */}
        <p className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#444" }}>
          Explore
        </p>
        <NavItem icon={<IconFeed />} label="Feed" active={activeNav === "feed"} onClick={() => setActiveNav("feed")} />
        <NavItem icon={<IconHype />} label="Hype" active={activeNav === "hype"} onClick={() => setActiveNav("hype")} />
        <NavItem icon={<IconActivity />} label="Activity" active={activeNav === "activity"} onClick={() => setActiveNav("activity")} />

        {/* Community section */}
        <p className="mb-1 mt-5 px-3 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#444" }}>
          Community
        </p>
        <NavItem icon={<IconMarketplace />} label="Marketplace" active={activeNav === "marketplace"} onClick={() => setActiveNav("marketplace")} />
        <NavItem icon={<IconGallery />} label="Gallery" active={activeNav === "gallery"} onClick={() => setActiveNav("gallery")} />
        <NavItem icon={<IconMembers />} label="Members" active={activeNav === "members"} onClick={() => setActiveNav("members")} />
      </aside>

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <main
        className="flex-1 px-6 py-6"
        style={{ marginLeft: "240px", marginRight: "300px", maxWidth: "680px" }}
      >
        {/* Tabs */}
        <div
          className="mb-5 flex items-center gap-6 border-b pb-3"
          style={{ borderColor: "#1E1E1E" }}
        >
          {(["for-you", "following"] as Tab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className="text-[14px] font-medium pb-1 transition-colors"
              style={{
                color: activeTab === tab ? "#FFFFFF" : "#555",
                background: "none",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                borderBottom: activeTab === tab ? "2px solid #FF6452" : "2px solid transparent",
                cursor: "pointer",
                padding: "0 0 8px 0",
              }}
            >
              {tab === "for-you" ? "For You" : "Following"}
            </button>
          ))}

          {/* Post button — top right of tabs row */}
          <div className="ml-auto">
            <button
              type="button"
              className="rounded-full px-5 py-2 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "#FF6452" }}
            >
              Post
            </button>
          </div>
        </div>

        {/* Share input */}
        <div
          className="mb-5 flex items-center gap-3 rounded-2xl border px-4 py-3"
          style={{ background: "#111111", borderColor: "#222222" }}
        >
          <Avatar color="#333" initials="?" size={32} />
          <input
            type="text"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Share something..."
            className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-[#444]"
            style={{ color: "#E0E0E0" }}
          />
        </div>

        {/* Feed posts */}
        <div className="flex flex-col gap-5">
          {POSTS.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>

      {/* ── Right panel ────────────────────────────────────────────────────── */}
      <aside
        className="fixed top-0 right-0 hidden h-screen overflow-y-auto px-4 py-6 lg:block"
        style={{ width: "300px", borderLeft: "1px solid #1A1A1A" }}
      >
        {/* Welcome card */}
        <div
          className="rounded-2xl border p-5 mb-5"
          style={{ background: "#111111", borderColor: "#222222" }}
        >
          <p className="mb-1 text-[14px] font-semibold" style={{ color: "#F5F5F5" }}>
            Welcome to the Community
          </p>
          <p className="mb-4 text-[12px] leading-relaxed" style={{ color: "#A3A3A3" }}>
            We&apos;re glad you made it!{" "}
            <span style={{ color: "#FF6452" }}>Introduce yourself</span> and let
            people know what you&apos;re working on.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex-1 rounded-full py-2 text-[12px] font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "#FF6452" }}
            >
              Say Hello
            </button>
            <button
              type="button"
              className="flex-1 rounded-full border py-2 text-[12px] font-medium transition-colors hover:border-white"
              style={{ color: "#A3A3A3", borderColor: "#333", background: "none" }}
            >
              Open Framer
            </button>
          </div>
        </div>

        {/* Suggested for you */}
        <div
          className="rounded-2xl border p-5"
          style={{ background: "#111111", borderColor: "#222222" }}
        >
          <p className="mb-4 text-[13px] font-semibold" style={{ color: "#F5F5F5" }}>
            Suggested for you
          </p>
          <div className="flex flex-col gap-3">
            {SUGGESTED.map((person) => {
              const isFollowing = followed.includes(person.id);
              return (
                <div key={person.id} className="flex items-center gap-2">
                  <Avatar
                    color={`hsl(${(person.id * 67) % 360}, 55%, 40%)`}
                    initials={person.name[0]}
                    size={30}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-[12px] font-medium" style={{ color: "#F0F0F0" }}>
                      {person.name}
                    </p>
                    <p className="truncate text-[11px]" style={{ color: "#555" }}>
                      {person.handle}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleFollow(person.id)}
                    className="shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold transition-all"
                    style={{
                      background: isFollowing ? "transparent" : "#FF6452",
                      color: isFollowing ? "#A3A3A3" : "#fff",
                      border: isFollowing ? "1px solid #333" : "1px solid #FF6452",
                      cursor: "pointer",
                    }}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
}
