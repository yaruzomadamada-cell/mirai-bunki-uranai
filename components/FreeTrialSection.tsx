import { FortuneMenuCard } from "./FortuneMenuCard";
import { themeOptions } from "@/lib/fortune-data";

export function FreeTrialSection() {
  return (
    <section className="bg-[#fffdf8] px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <p className="section-kicker">Free Trial</p>
        <h2 className="ornament-title mt-2 text-3xl font-bold text-ink">まずは無料で試せる占い</h2>
        <p className="mt-5 max-w-2xl leading-8 text-ink/68">
          登録不要で、今のあなたに現れやすい3つの未来を無料で鑑定できます。
          気になるテーマから、いま一番近い迷いを選んでください。
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {themeOptions.map((menu, index) => (
            <div key={menu.id} className="grid gap-3">
              <FortuneMenuCard
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
              <div className="rounded-lg border border-[#e8dcc5] bg-white p-4 text-xs font-bold text-ink/64">
                <div className="grid grid-cols-2 gap-2">
                  <span>無料鑑定あり</span>
                  <span>鑑定時間目安：3分</span>
                  <span>入力：生年月日・今の状況</span>
                  <span>有料深掘り：あり</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
