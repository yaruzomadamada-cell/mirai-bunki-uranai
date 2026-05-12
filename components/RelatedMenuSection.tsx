import { FortuneMenuCard } from "./FortuneMenuCard";
import { relatedMenus, themeOptions } from "@/lib/fortune-data";

export function RelatedMenuSection() {
  const menus = relatedMenus
    .map((related) => themeOptions.find((menu) => menu.href === related.href))
    .filter((menu): menu is (typeof themeOptions)[number] => Boolean(menu));

  return (
    <section className="mt-8 rounded-lg bg-white p-5 shadow-soft sm:p-8">
      <p className="section-kicker">Recommended</p>
      <h2 className="ornament-title mt-2 text-2xl font-bold text-ink">この結果を見た人におすすめ</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {menus.map((menu, index) => (
          <FortuneMenuCard
            key={menu.id}
            title={menu.label}
            lead={menu.lead}
            href={menu.href}
            tags={menu.tags}
            category={menu.category}
            categoryColor={menu.categoryColor}
            emotionalCopy={menu.emotionalCopy}
            learn={menu.learn}
            index={index}
            compact
          />
        ))}
      </div>
    </section>
  );
}

export const RelatedFortuneMenus = RelatedMenuSection;
