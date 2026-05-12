"use client";

import { useMemo, useState } from "react";
import { FortuneMenuCard } from "./FortuneMenuCard";
import { categoryTabs, themeOptions } from "@/lib/fortune-data";

export function CategoryTabs() {
  const [active, setActive] = useState(categoryTabs[0].id);
  const selected = useMemo(() => categoryTabs.find((tab) => tab.id === active) ?? categoryTabs[0], [active]);
  const menus = selected.menus
    .map((id) => themeOptions.find((menu) => menu.id === id))
    .filter((menu): menu is (typeof themeOptions)[number] => Boolean(menu));

  return (
    <section className="bg-white px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <p className="section-kicker">Category</p>
        <h2 className="ornament-title mt-2 text-3xl font-bold text-ink">悩みから占いを探す</h2>
        <div className="mt-7 flex gap-2 overflow-x-auto pb-2">
          {categoryTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition ${
                active === tab.id
                  ? "border-purple bg-purple text-white"
                  : "border-[#e8dcc5] bg-[#fffaf0] text-ink/72 hover:border-lilac"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {menus.map((menu, index) => (
            <FortuneMenuCard
              key={menu.id}
              title={menu.label}
              lead={menu.description}
              href={menu.href}
              tags={menu.tags}
              category={menu.category}
              categoryColor={menu.categoryColor}
              emotionalCopy={menu.emotionalCopy}
              learn={menu.learn}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
