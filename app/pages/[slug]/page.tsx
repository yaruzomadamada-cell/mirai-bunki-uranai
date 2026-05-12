import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { FAQSection } from "@/components/FAQSection";
import { SEOContentSection } from "@/components/SEOContentSection";
import { seoPages, themeLabels, themeOptions } from "@/lib/fortune-data";
import type { ThemeId } from "@/lib/types";

type SeoPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(seoPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: SeoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = seoPages[slug as keyof typeof seoPages];
  if (!page) {
    return { title: "ページが見つかりません" };
  }

  return {
    title: page.title,
    description: page.intro,
    alternates: {
      canonical: `/pages/${slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.intro,
      images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
    },
  };
}

function makeFaqItems(worries: readonly string[]) {
  return worries.map((worry) => ({
    question: `${worry}時はどう考えればいいですか？`,
    answer:
      "今は焦って答えを出すより、流れを見極める時期です。未来分岐占いでは、このまま進む未来、動いた未来、手放した未来を分けて見ることで、気持ちを整理しやすくします。",
  }));
}

export default async function SeoLandingPage({ params }: SeoPageProps) {
  const { slug } = await params;
  const page = seoPages[slug as keyof typeof seoPages];

  if (!page) {
    notFound();
  }

  const theme = page.theme as ThemeId;
  const currentMenu = themeOptions.find((menu) => menu.id === theme);
  const heroPoints = currentMenu?.learn ?? ["今の迷いの理由", "このまま進む未来", "動いた未来", "手放した未来"];
  const faqItems = makeFaqItems(page.worries);
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

  return (
    <main className="bg-[#FFFDF8]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="bg-cream px-4 py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-7 lg:grid-cols-[1fr_0.74fr] lg:items-center">
          <div>
            <p className="section-kicker">{themeLabels[theme]}</p>
            <h1 className="serif-title mt-4 text-3xl font-bold leading-tight text-ink sm:text-5xl">{page.h1}</h1>
            <p className="mt-5 max-w-3xl leading-8 text-ink/72">{page.intro}</p>
            <div className="mt-7 grid gap-3 sm:flex">
              <Link
                href={`/fortune?theme=${theme}`}
                className="button-shine rounded-lg bg-purple px-6 py-4 text-center font-semibold text-white shadow-glow"
              >
                無料鑑定フォームへ進む
              </Link>
              <Link href="/#ranking" className="rounded-lg border border-purple/20 bg-white px-6 py-4 text-center font-semibold text-purple">
                人気鑑定を見る
              </Link>
            </div>
          </div>
          <div className="fortune-card category-rail rounded-lg p-5" style={{ "--category-color": currentMenu?.categoryColor ?? "#4B2E83" } as CSSProperties}>
            <p className="inline-flex rounded-full px-3 py-1 text-xs font-bold text-white" style={{ backgroundColor: currentMenu?.categoryColor ?? "#4B2E83" }}>
              無料鑑定あり
            </p>
            <h2 className="serif-title mt-4 text-2xl font-bold text-ink">{currentMenu?.label ?? themeLabels[theme]}</h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-[#7a4f77]">{currentMenu?.emotionalCopy}</p>
            <div className="mt-5 grid gap-2 text-sm text-ink/70">
              {heroPoints.slice(0, 4).map((item) => (
                <span key={item} className="rounded-lg border border-[#e8dcc5] bg-[#fff8ee] px-4 py-3">
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs font-bold text-premium">深掘り鑑定 980円 / 希望者のみ</p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-4xl gap-6 px-4 py-10 sm:py-14">
        <SEOContentSection theme={theme} intro={page.intro} />
        <FAQSection items={faqItems} />

        <section className="rounded-lg border border-lavender/36 bg-white p-5 shadow-soft sm:p-8">
          <p className="section-kicker">Notice</p>
          <h2 className="ornament-title mt-2 text-xl font-bold text-ink">免責事項</h2>
          <p className="mt-5 leading-8 text-ink/72">
            未来分岐占いはエンタメ目的の占いです。鑑定結果は、人生・恋愛・仕事・金銭・健康などに関する判断を保証するものではありません。
            重要な決定を行う際は、必要に応じて専門家や信頼できる人に相談してください。
          </p>
        </section>
      </div>
    </main>
  );
}
