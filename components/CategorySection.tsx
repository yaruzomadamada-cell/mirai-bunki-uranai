import Link from "next/link";
import { categoryGroups } from "@/lib/fortune-data";

export function CategorySection() {
  return (
    <section className="bg-white px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="section-kicker">Category</p>
        <h2 className="ornament-title mt-2 text-3xl font-bold text-ink">悩み別カテゴリ</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {categoryGroups.map((group) => (
            <div key={group.title} className="fortune-card rounded-lg p-5 transition hover:-translate-y-1">
              <h3 className="text-lg font-bold text-ink">{group.title}</h3>
              <p className="mt-3 min-h-20 text-sm leading-7 text-ink/68">{group.description}</p>
              <div className="mt-5 grid gap-2">
                {group.links.map((link) => (
                  <Link key={link.label} href={link.href} className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-ink/82 transition hover:text-lilac">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
