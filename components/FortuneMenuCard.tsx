import Link from "next/link";
import type { CSSProperties } from "react";

type FortuneMenuCardProps = {
  title: string;
  lead: string;
  href: string;
  tags: string[];
  category?: string;
  categoryColor?: string;
  emotionalCopy?: string;
  learn?: string[];
  index?: number;
  compact?: boolean;
};

export function FortuneMenuCard({
  title,
  lead,
  href,
  tags,
  category,
  categoryColor = "#4B2E83",
  emotionalCopy,
  learn = [],
  index,
  compact = false,
}: FortuneMenuCardProps) {
  return (
    <article className="fortune-card category-rail group relative overflow-hidden rounded-lg" style={{ "--category-color": categoryColor } as CSSProperties}>
      <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-[64px] bg-gradient-to-br from-[#fff3cf] to-lavender/25" />
      <div className="relative p-5 pl-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {category ? (
              <span className="rounded-full px-3 py-1 text-xs font-bold text-white" style={{ backgroundColor: categoryColor }}>
                {category}
              </span>
            ) : null}
            {tags.map((tag) => (
              <span key={tag} className="rounded-full border border-gold/30 bg-[#fff8e6] px-3 py-1 text-xs font-bold text-[#8a6a1d]">
                {tag}
              </span>
            ))}
          </div>
          {typeof index === "number" ? (
            <span className="font-serif text-4xl leading-none text-gold/40">{String(index + 1).padStart(2, "0")}</span>
          ) : null}
        </div>

        <h3 className="mt-5 text-xl font-bold leading-snug text-ink">{title}</h3>
        {emotionalCopy ? <p className="mt-3 text-sm font-semibold leading-7 text-[#7a4f77]">{emotionalCopy}</p> : null}
        <p className="mt-3 text-sm leading-7 text-ink/68">{lead}</p>

        {learn.length > 0 ? (
          <div className={`rounded-lg border border-ink/8 bg-white p-4 ${compact ? "mt-4" : "mt-5"}`}>
            <p className="text-xs font-bold text-lilac">この鑑定でわかること</p>
            <ul className="mt-3 grid gap-2 text-sm text-ink/72">
              {learn.slice(0, compact ? 3 : 4).map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold">
          <span className="rounded-md bg-[#fff2cf] px-3 py-1.5 text-[#8a6a1d]">無料鑑定あり</span>
          <span className="rounded-md bg-lavender/20 px-3 py-1.5 text-lilac">深掘り鑑定 980円</span>
        </div>

        <Link
          href={href}
          className="button-shine mt-5 inline-flex w-full justify-center rounded-lg bg-purple px-5 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5"
        >
          無料で占う
        </Link>
      </div>
    </article>
  );
}
