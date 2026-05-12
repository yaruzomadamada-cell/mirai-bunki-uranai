import Link from "next/link";

export default function NotFound() {
  return (
    <main className="px-4 py-16">
      <section className="mx-auto max-w-xl rounded-lg bg-white p-8 text-center shadow-soft">
        <h1 className="text-3xl font-bold text-ink">ページが見つかりません</h1>
        <p className="mt-4 leading-8 text-ink/70">URLを確認するか、トップページからもう一度お試しください。</p>
        <Link href="/" className="mt-6 inline-flex rounded-lg bg-midnight px-5 py-3 font-semibold text-white">
          トップへ戻る
        </Link>
      </section>
    </main>
  );
}
