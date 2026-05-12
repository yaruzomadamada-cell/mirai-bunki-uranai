import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "決済をキャンセルしました",
};

export default function CancelPage() {
  return (
    <main className="px-4 py-16">
      <section className="mx-auto max-w-xl rounded-lg bg-white p-8 text-center shadow-soft">
        <p className="text-sm font-semibold text-lilac">Payment Canceled</p>
        <h1 className="mt-3 text-3xl font-bold text-ink">決済をキャンセルしました</h1>
        <p className="mt-4 leading-8 text-ink/70">無料鑑定の結果はそのまま確認できます。必要な時だけ深掘り鑑定へ進めます。</p>
        <Link href="/" className="mt-6 inline-flex rounded-lg bg-midnight px-5 py-3 font-semibold text-white">
          トップへ戻る
        </Link>
      </section>
    </main>
  );
}
