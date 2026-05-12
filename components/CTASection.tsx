import Link from "next/link";

type CTASectionProps = {
  title?: string;
  description?: string;
  href?: string;
  buttonLabel?: string;
};

export function CTASection({
  title = "今の迷いを、3つの未来から見てみませんか？",
  description = "登録不要・無料で鑑定できます。生年月日と今の状況から、あなたに現れやすい未来分岐を読み解きます。",
  href = "/fortune",
  buttonLabel = "無料で未来を占う",
}: CTASectionProps) {
  return (
    <section className="star-map px-4 py-14 text-white sm:py-20">
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="section-kicker justify-center text-gold before:bg-gold">Free Reading</p>
        <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-8 text-white/76">{description}</p>
        <Link
          href={href}
          className="button-shine mt-7 inline-flex w-full justify-center rounded-lg bg-gradient-to-r from-[#9b83ff] via-lilac to-gold px-6 py-4 font-semibold text-white shadow-glow sm:w-auto"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
