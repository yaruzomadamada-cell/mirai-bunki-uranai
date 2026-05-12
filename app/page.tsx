import type { Metadata } from "next";
import Link from "next/link";
import { CategoryTabs } from "@/components/CategoryTabs";
import { FAQSection } from "@/components/FAQSection";
import { FreeTrialSection } from "@/components/FreeTrialSection";
import { HeroSection } from "@/components/HeroSection";
import { PremiumIntroSection } from "@/components/PremiumIntroSection";
import { RankingSection } from "@/components/RankingSection";

export const metadata: Metadata = {
  title: "未来分岐占い｜今の選択で変わる3つの未来を無料診断",
  description:
    "恋愛、復縁、仕事、人生の迷いに。生年月日と今の悩みから「このまま進む未来」「動いた未来」「手放した未来」を無料で占います。",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "未来分岐占い｜今の選択で変わる3つの未来を無料診断",
    description:
      "恋愛、復縁、仕事、人生の迷いに。生年月日と今の悩みから3つの未来分岐を無料で占います。",
    images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
  },
};

const knowItems = [
  "今の迷いが生まれている理由",
  "このまま進んだ場合の流れ",
  "動いた場合に起きやすい変化",
  "手放した場合に残るもの",
  "30日以内に意識すること",
  "避けた方がいい行動",
  "深掘り鑑定でわかる90日後の未来",
];

const faqItems = [
  {
    question: "無料でどこまで見られますか？",
    answer: "運命分岐タイプ、現在地、3つの未来、30日以内のアドバイスまで無料で見られます。",
  },
  {
    question: "有料鑑定では何が深くなりますか？",
    answer: "90日後の流れ、動くべき時期、避けたい行動、相手や環境の影響まで詳しく読めます。",
  },
  {
    question: "登録は必要ですか？",
    answer: "登録不要で無料鑑定を利用できます。結果URLを保存しておくと、あとから見返せます。",
  },
  {
    question: "占い結果は絶対ですか？",
    answer: "いいえ。未来分岐占いはエンタメ目的の占いです。最終的な判断はご自身で行ってください。",
  },
];

export default function Home() {
  return (
    <main>
      <HeroSection />
      <RankingSection />
      <CategoryTabs />
      <FreeTrialSection />

      <section className="bg-white px-4 py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="section-kicker">About</p>
            <h2 className="ornament-title mt-2 text-3xl font-bold leading-tight text-ink">未来分岐占いとは</h2>
            <p className="mt-5 leading-8 text-ink/72">
              未来分岐占いは、今の迷いに対して、ひとつの答えだけを出す占いではありません。
              このまま進んだ場合。自分から動いた場合。一度手放した場合。
              3つの未来の流れを見ながら、今のあなたに必要な選択を読み解きます。
            </p>
            <Link
              href="/fortune"
              className="button-shine mt-6 inline-flex w-full justify-center rounded-lg bg-purple px-5 py-4 font-semibold text-white shadow-glow sm:w-auto"
            >
              無料で占ってみる
            </Link>
          </div>
          <div>
            <p className="section-kicker">What You Get</p>
            <h2 className="ornament-title mt-2 text-3xl font-bold text-ink">鑑定でわかること</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {knowItems.map((item, index) => (
                <div key={item} className="fortune-card rounded-lg p-4">
                  <div className="flex gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#fff2cf] font-serif text-gold">
                      {index + 1}
                    </span>
                    <p className="text-sm font-bold leading-7 text-ink/78">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PremiumIntroSection />

      <section className="bg-[#fffdf8] px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <FAQSection items={faqItems} />
        </div>
      </section>
    </main>
  );
}
