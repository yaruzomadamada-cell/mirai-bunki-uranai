import Link from "next/link";
import { FortuneMenuCard } from "./FortuneMenuCard";
import { themeOptions } from "@/lib/fortune-data";
import type { ThemeId } from "@/lib/types";

type SEOContentSectionProps = {
  theme: ThemeId;
  intro: string;
};

export function SEOContentSection({ theme, intro }: SEOContentSectionProps) {
  const related = themeOptions.filter((item) => item.id !== theme).slice(0, 3);

  return (
    <>
      <section className="rounded-lg bg-white p-5 shadow-soft sm:p-8">
        <p className="section-kicker">About</p>
        <h2 className="ornament-title mt-2 text-2xl font-bold text-ink">この占いでわかること</h2>
        <p className="mt-5 leading-8 text-ink/72">{intro}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            "今の迷いが生まれている理由",
            "このまま進んだ場合の流れ",
            "自分から動いた場合の可能性",
            "一度手放した場合の変化",
            "30日以内に意識すること",
            "深掘り鑑定でわかる90日後の未来",
          ].map((item) => (
            <div key={item} className="rounded-lg border border-lavender/32 bg-pearl p-4 text-sm font-semibold text-ink/76">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg bg-pearl p-5 shadow-soft sm:p-8">
        <p className="section-kicker">Three Futures</p>
        <h2 className="ornament-title mt-2 text-2xl font-bold text-ink">未来分岐の説明</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["このまま進む未来", "今の流れを続けた時、気持ちや状況がどう変わりやすいかを読みます。"],
            ["動いた未来", "連絡、相談、準備など、小さく動いた場合に見えやすい可能性を占います。"],
            ["手放した未来", "一度離れる、保留する、執着をゆるめることで戻る余白を見ます。"],
          ].map(([title, body]) => (
            <div key={title} className="rounded-lg bg-white p-5">
              <h3 className="font-bold text-ink">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-ink/70">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg bg-white p-5 shadow-soft sm:p-8">
        <p className="section-kicker">Related</p>
        <h2 className="ornament-title mt-2 text-2xl font-bold text-ink">人気の関連鑑定</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {related.map((menu, index) => (
            <FortuneMenuCard
              key={menu.id}
              title={menu.label}
              lead={menu.lead}
              href={`/fortune?theme=${menu.id}`}
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
        <Link
          href={`/fortune?theme=${theme}`}
          className="button-shine mt-7 inline-flex w-full justify-center rounded-lg bg-gradient-to-r from-[#9b83ff] via-lilac to-gold px-5 py-4 font-semibold text-white shadow-glow sm:w-auto"
        >
          無料鑑定フォームへ進む
        </Link>
      </section>
    </>
  );
}
