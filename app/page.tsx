import type { Metadata } from "next";
import Link from "next/link";
import { CategoryTabs } from "@/components/CategoryTabs";
import { FAQSection } from "@/components/FAQSection";
import { FreeTrialSection } from "@/components/FreeTrialSection";
import { HeroSection } from "@/components/HeroSection";
import { PremiumIntroSection } from "@/components/PremiumIntroSection";
import { RankingSection } from "@/components/RankingSection";

export const metadata: Metadata = {
  title: "未来分岐占い｜今の選択から3つの未来を無料鑑定",
  description:
    "恋愛・復縁・仕事・人生の迷いに。今の選択から「このまま進む未来・動いた未来・手放した未来」を読み解く無料鑑定。90日後の未来も深掘りできます。",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "未来分岐占い｜今の選択から3つの未来を無料鑑定",
    description:
      "恋愛・復縁・仕事・人生の迷いに。このまま進む未来、動いた未来、手放した未来を無料で鑑定します。",
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
    question: "未来分岐占いとは？",
    answer:
      "未来分岐占いは、今の選択に対して「このまま進む未来」「動いた未来」「手放した未来」の3つの流れを読み解く占いです。ひとつの答えを決めつけるのではなく、迷いを整理するためのヒントとして楽しめます。",
  },
  {
    question: "無料で占えますか？",
    answer:
      "はい。運命分岐タイプ、今の現在地、3つの未来分岐、30日以内のアドバイスまで無料で占えます。登録不要で、スマホからでも利用できます。",
  },
  {
    question: "恋愛や復縁も占えますか？",
    answer:
      "恋愛、復縁、片思い、連絡するべきか、この恋を続けるべきかなどのテーマに対応しています。仕事や人生の転機、2026年の運勢も鑑定できます。",
  },
  {
    question: "90日後の未来は見られますか？",
    answer:
      "無料鑑定では今現れやすい3つの未来を読み解きます。深掘り鑑定では、90日後の未来、動くべき時期、避けたい行動、相手や環境の影響まで詳しく見られます。",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <HeroSection />
      <RankingSection />
      <CategoryTabs />
      <FreeTrialSection />

      <section className="bg-[#FFF8EE] px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <p className="section-kicker">Future Branch Reading</p>
          <h2 className="ornament-title mt-2 text-3xl font-bold leading-tight text-ink">
            今の選択から、3つの未来を見つめる占い
          </h2>
          <div className="mt-6 grid gap-5 text-ink/74 md:grid-cols-3">
            <div className="fortune-card rounded-lg p-5">
              <h3 className="font-bold text-ink">このまま進む未来</h3>
              <p className="mt-3 text-sm leading-7">
                今の流れを大きく変えずに進んだ場合、恋愛・復縁・仕事・人生の迷いがどの方向へ向かいやすいかを読み解きます。
              </p>
            </div>
            <div className="fortune-card rounded-lg p-5">
              <h3 className="font-bold text-ink">動いた未来</h3>
              <p className="mt-3 text-sm leading-7">
                連絡する、話し合う、転職準備をするなど、あなたが一歩動いたときに起こりやすい変化を見ます。
              </p>
            </div>
            <div className="fortune-card rounded-lg p-5">
              <h3 className="font-bold text-ink">手放した未来</h3>
              <p className="mt-3 text-sm leading-7">
                一度距離を置く、執着をゆるめる、保留することで残るものや軽くなるものを、やさしい言葉で整理します。
              </p>
            </div>
          </div>
          <p className="mt-6 leading-8 text-ink/72">
            未来分岐占いは、「今の選択で未来はどう変わるのか」を知りたい人のための無料鑑定です。
            3つの未来 占い、今の選択 未来 占い、90日後の未来 占いを探している方にも読みやすいよう、
            無料結果では現在地と短期アドバイスを、深掘り鑑定では90日以内の流れを具体的にお伝えします。
          </p>
        </div>
      </section>

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
