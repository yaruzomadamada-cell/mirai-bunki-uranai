"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "無料占い", href: "/fortune" },
  { label: "恋愛", href: "/pages/contact-or-wait" },
  { label: "復縁", href: "/pages/reunion-give-up" },
  { label: "仕事", href: "/pages/quit-job" },
  { label: "人生", href: "/pages/life-turning-point" },
  { label: "2026年運勢", href: "/pages/fortune-2026" },
  { label: "人気ランキング", href: "/#ranking" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#eee4cf] bg-white/94 text-ink shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="moon-seal grid h-10 w-10 place-items-center rounded-full border border-gold/50 bg-[#fff8e6] text-gold shadow-glow">
            <span className="relative z-10 h-2.5 w-2.5 rounded-full bg-gold" />
          </span>
          <span>
            <span className="block text-base font-semibold tracking-wide">未来分岐占い</span>
            <span className="block text-[10px] uppercase tracking-[0.24em] text-ink/40">MIRAI BUNKI URANAI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm text-ink/68 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-lilac">
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="メニューを開く"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-lg border border-ink/10 bg-[#fff8e6] lg:hidden"
        >
          <span className="grid w-5 gap-1.5">
            <span className="h-px bg-ink" />
            <span className="h-px bg-ink" />
            <span className="h-px bg-ink" />
          </span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-[#eee4cf] bg-white px-4 pb-4 lg:hidden">
          <nav className="mx-auto grid max-w-6xl gap-2 pt-3 text-sm text-ink/82">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg border border-ink/8 bg-[#fffaf0] px-4 py-3"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
