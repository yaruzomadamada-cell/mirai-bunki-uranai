import { FortuneMenuCard } from "./FortuneMenuCard";
import { rankingItems } from "@/lib/fortune-data";

export function RankingSection() {
  return (
    <section id="ranking" className="menu-shelf px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">Ranking</p>
            <h2 className="ornament-title mt-2 text-3xl font-bold text-ink">今よく占われている未来分岐</h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-ink/62">
            迷いが深い時ほど、似た悩みの人が読んでいる鑑定から選ぶと入りやすくなります。
          </p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-5">
          {rankingItems.map((item, index) => (
            <div key={item.id} className={index === 0 ? "lg:col-span-2" : ""}>
              <FortuneMenuCard
                title={item.label}
                lead={item.description}
                href={item.href}
                tags={item.tags}
                category={item.category}
                categoryColor={item.categoryColor}
                emotionalCopy={item.emotionalCopy}
                learn={item.learn}
                index={index}
                compact={index > 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const PopularRanking = RankingSection;
