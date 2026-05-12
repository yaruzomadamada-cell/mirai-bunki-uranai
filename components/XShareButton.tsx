type XShareButtonProps = {
  typeName: string;
  resultUrl: string;
};

export function XShareButton({ typeName, resultUrl }: XShareButtonProps) {
  const text = `私は「${typeName}」でした。\n\nこのまま進む未来。\n動いた未来。\n手放した未来。\n\n今の選択で未来がどう変わるか占える\n#未来分岐占い`;
  const href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(resultUrl)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex w-full items-center justify-center rounded-lg border border-ink/15 bg-white px-5 py-3 text-sm font-semibold text-ink shadow-sm transition hover:border-lilac sm:w-auto"
    >
      Xで結果をシェアする
    </a>
  );
}
