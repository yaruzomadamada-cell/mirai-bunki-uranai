import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-midnight px-4 py-12 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 text-sm text-white/70 lg:grid-cols-[1fr_auto]">
        <div>
          <div className="flex items-center gap-3">
            <span className="moon-seal grid h-10 w-10 place-items-center rounded-full border border-gold/42 bg-white/8 text-gold">
              <span className="relative z-10 h-2.5 w-2.5 rounded-full bg-gold" />
            </span>
            <div>
              <p className="font-semibold text-white">未来分岐占い</p>
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/42">Mirai Bunki Uranai</p>
            </div>
          </div>
          <p className="mt-4 max-w-xl leading-7">
            未来分岐占いは、エンタメ目的の占いサービスです。大切な判断は、ご自身の意思と必要な相談先を大切にしてください。
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-5 lg:flex lg:items-start lg:gap-5">
          <Link href="/privacy" className="hover:text-white">
            プライバシーポリシー
          </Link>
          <Link href="/terms" className="hover:text-white">
            利用規約
          </Link>
          <Link href="/disclaimer" className="hover:text-white">
            免責事項
          </Link>
          <Link href="/commercial-law" className="hover:text-white">
            特定商取引法に基づく表記
          </Link>
          <Link href="/contact" className="hover:text-white">
            お問い合わせ
          </Link>
        </div>
      </div>
    </footer>
  );
}
