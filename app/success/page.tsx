import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "決済が完了しました",
};

export default function SuccessPage() {
  return (
    <main className="px-4 py-16">
      <section className="mx-auto max-w-xl rounded-lg bg-white p-8 text-center shadow-soft">
        <p className="text-sm font-semibold text-lilac">Payment Completed</p>
        <h1 className="mt-3 text-3xl font-bold text-ink">決済が完了しました</h1>
        <p className="mt-4 leading-8 text-ink/70">
          深掘り鑑定ページに戻ると、決済済みの鑑定結果が表示されます。
        </p>
        <Link href="/fortune" className="mt-6 inline-flex rounded-lg bg-midnight px-5 py-3 font-semibold text-white">
          新しく占う
        </Link>
      </section>
    </main>
  );
}
