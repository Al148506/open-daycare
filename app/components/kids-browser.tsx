"use client";

import { useState } from "react";
import { KidCard } from "@/app/components/kid-card";
import { SearchIcon } from "@/app/components/icons";
import { CLASSROOM } from "@/app/data/feed";
import type { Kid } from "@/app/data/kids";

type KidsBrowserProps = {
  kids: Kid[];
};

export function KidsBrowser({ kids }: KidsBrowserProps) {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const visible =
    normalized === ""
      ? kids
      : kids.filter((kid) => kid.name.toLowerCase().includes(normalized));

  return (
    <>
      <div className="mb-[22px] flex items-center gap-[11px] rounded-[14px] border border-line bg-surface px-4 py-3">
        <SearchIcon className="flex-none text-ink-placeholder" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar niño…"
          aria-label="Buscar niño"
          className="min-w-0 flex-1 border-none bg-transparent text-[15px] text-ink outline-none"
        />
      </div>

      <div className="mb-[14px] flex items-center gap-3">
        <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-ink">
          {CLASSROOM.name.toUpperCase()}
        </span>
        <span className="text-[13px] text-ink-muted">{kids.length} niños</span>
        <span className="h-px flex-1 bg-line-strong" />
      </div>

      <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2">
        {visible.map((kid) => (
          <KidCard key={kid.id} kid={kid} />
        ))}
      </div>
    </>
  );
}
