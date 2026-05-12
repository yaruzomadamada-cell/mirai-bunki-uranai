import type { FutureBranch } from "@/lib/types";

type FutureBranchCardProps = {
  branch: FutureBranch;
  index: number;
};

export function FutureBranchCard({ branch, index }: FutureBranchCardProps) {
  return (
    <article className="fortune-card reveal-card rounded-lg p-5 sm:p-6" style={{ animationDelay: `${index * 90}ms` }}>
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#fff2cf] font-serif text-lg font-bold text-premium">
          {index + 1}
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-lilac">Future Branch</p>
          <h3 className="mt-1 text-xl font-bold text-ink">{branch.title}</h3>
        </div>
      </div>
      <p className="mt-5 leading-8 text-ink/74">{branch.body}</p>
      <div className="mt-5 grid gap-3">
        <div className="rounded-lg border border-gold/20 bg-[#fffaf0] p-4">
          <p className="text-xs font-bold text-[#8a6a1d]">注意点</p>
          <p className="mt-1 text-sm leading-7 text-ink/70">{branch.caution ?? "不安が強い日は、すぐに結論を出さず一晩置いてみてください。"}</p>
        </div>
        <div className="rounded-lg border border-lavender/28 bg-white p-4">
          <p className="text-xs font-bold text-lilac">小さなアドバイス</p>
          <p className="mt-1 text-sm leading-7 text-ink/70">{branch.advice ?? "今できる一歩を小さく整えると、未来の見え方が落ち着きます。"}</p>
        </div>
      </div>
    </article>
  );
}
