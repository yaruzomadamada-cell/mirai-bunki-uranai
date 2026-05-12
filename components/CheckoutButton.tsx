type CheckoutButtonProps = {
  resultId: string;
  className?: string;
};

export function CheckoutButton({ resultId, className = "" }: CheckoutButtonProps) {
  return (
    <form action="/api/checkout" method="post">
      <input type="hidden" name="resultId" value={resultId} />
      <button
        type="submit"
        className={`button-shine w-full rounded-lg bg-premium px-5 py-4 text-base font-semibold text-white shadow-glow transition hover:-translate-y-0.5 ${className}`}
      >
        980円で深掘り鑑定を見る
      </button>
    </form>
  );
}
