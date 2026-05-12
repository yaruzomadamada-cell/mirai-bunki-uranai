# 未来分岐占い

「未来分岐占い」は、恋愛・復縁・仕事・人生の迷いに対して、以下の3つの未来を無料で読み解く占いサイトです。

- このまま進む未来
- 動いた未来
- 手放した未来

無料鑑定後、希望するユーザーだけが Stripe Checkout で「未来分岐 深掘り鑑定（980円）」へ進めます。Stripe本番キーが未設定でも、無料鑑定までは動作する構成です。

## 技術構成

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase
- Stripe Checkout / Stripe webhook
- SEO / OGP / sitemap / robots.txt

## ローカルセットアップ

```bash
npm.cmd install
copy .env.example .env.local
npm.cmd run dev
```

PowerShellで `npm` が実行ポリシーにより止まる場合は、`npm.cmd` を使ってください。

## 環境変数一覧

`.env.local` または Vercel の Environment Variables に設定します。

| 変数名 | 必須 | 公開可否 | 説明 |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 必須 | 公開 | 本番URL。例: `https://example.com`。OGP、canonical、Stripeの戻り先URLに使います。 |
| `NEXT_PUBLIC_SUPABASE_URL` | 本番必須 | 公開 | Supabase Project URL。 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 推奨 | 公開 | Supabase anon key。現在の主要DB処理はサーバー側Service Role経由ですが、将来の公開クライアント処理用に保持します。 |
| `SUPABASE_SERVICE_ROLE_KEY` | 本番必須 | 非公開 | サーバー側だけで使うService Role Key。クライアント側や `NEXT_PUBLIC_` 付き変数には絶対に入れないでください。 |
| `STRIPE_SECRET_KEY` | 有料公開時必須 | 非公開 | StripeのSecret Key。本番は `sk_live_...`、テストは `sk_test_...`。未設定でも無料鑑定は動きます。 |
| `STRIPE_WEBHOOK_SECRET` | 有料公開時必須 | 非公開 | Stripe webhook endpoint の Signing secret。`whsec_...`。 |
| `STRIPE_PRICE_ID` | 任意 | 非公開 | Stripeで作成した980円商品のPrice ID。未設定時はCheckout作成時に `price_data` で980円を指定します。 |

## Vercelに設定する値

Vercel Dashboard の Project Settings > Environment Variables に、Production環境向けとして以下を設定してください。

```env
NEXT_PUBLIC_SITE_URL=https://your-production-domain.example
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_PRICE_ID=price_xxx
```

Stripe本番キーをまだ入れない場合は、以下だけでも無料鑑定は本番で動きます。

```env
NEXT_PUBLIC_SITE_URL=https://your-production-domain.example
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

この状態では、無料鑑定・無料結果表示・有料ロック表示までは動作します。購入ボタンを押した場合は、Stripe未設定の案内付きで有料ページへ戻ります。

環境変数を変更した後は、必ずVercelで再デプロイしてください。Vercelの環境変数は既存デプロイには自動反映されません。

## Vercel公開手順

1. GitHubにこのリポジトリをpushする。
2. Vercelで New Project を作成し、GitHubリポジトリをImportする。
3. Framework Preset は Next.js を選択する。
4. Build Command は `npm run build` のままでよい。
5. Environment Variables に上記の値を設定する。
6. Deploy を実行する。
7. 本番URLが確定したら、`NEXT_PUBLIC_SITE_URL` をその本番URLに更新して再デプロイする。
8. Stripe本番WebhookのEndpoint URLにも同じ本番URLを使う。

## Supabaseセットアップ

Supabase SQL Editorで `supabase.sql` を実行してください。

作成されるテーブル:

- `fortune_results`
- `payments`

### Supabaseで確認すべきRLS

本番では、以下を確認してください。

- `fortune_results` と `payments` の RLS が有効になっている。
- `anon` / `authenticated` 向けのSELECT/INSERT/UPDATE/DELETEポリシーを作らない。
- DB操作は Next.js サーバー側の `SUPABASE_SERVICE_ROLE_KEY` のみで行う。
- `SUPABASE_SERVICE_ROLE_KEY` がブラウザに露出していない。
- SupabaseのService Role KeyをVercelのPreview/Productionで必要な環境だけに設定している。

確認用SQL:

```sql
select relname, relrowsecurity
from pg_class
where relname in ('fortune_results', 'payments');

select schemaname, tablename, policyname, roles, cmd
from pg_policies
where tablename in ('fortune_results', 'payments');
```

`relrowsecurity` が `true` で、公開ユーザー向けの不要なポリシーがなければOKです。Service Role KeyはRLSをバイパスできますが、ブラウザや公開コードに出してはいけません。

## Stripe本番Webhook設定手順

1. Stripe Dashboardを本番モードに切り替える。
2. Product「未来分岐 深掘り鑑定」を作成する。
3. Priceを `980 JPY` で作成し、Price ID（`price_...`）を控える。
4. Developers > Webhooks で Endpoint を追加する。
5. Endpoint URLに `https://your-production-domain.example/api/webhook` を設定する。
6. 受信イベントに `checkout.session.completed` を追加する。
7. 作成したEndpointの Signing secret（`whsec_...`）を控える。
8. Vercel Production Environment Variables に以下を設定する。
   - `STRIPE_SECRET_KEY=sk_live_...`
   - `STRIPE_WEBHOOK_SECRET=whsec_...`
   - `STRIPE_PRICE_ID=price_...`
9. VercelでProductionを再デプロイする。
10. 本番決済テストを行い、決済後に `fortune_results.paid=true` になることを確認する。

WebhookはStripe署名を検証してから処理します。署名検証に失敗したリクエストでは `paid=true` に更新されません。

## 公開後の動作確認チェックリスト

### 基本表示

- `/` が表示される。
- `/fortune` が表示される。
- `/privacy` `/terms` `/disclaimer` `/commercial-law` `/contact` が200で表示される。
- `/sitemap.xml` が200で表示され、主要URLが含まれている。
- `/robots.txt` が200で表示され、sitemap URLが含まれている。

### 無料鑑定

- フォームでテーマ、ニックネーム、生年月日、性別、状況、相談内容を入力できる。
- 送信後 `/result/[id]` に遷移する。
- 生年月日から9タイプ判定される。
- 無料結果に「現在地」「3つの未来」「30日以内のアドバイス」「避けたい選択」が表示される。
- 自由入力の全文が目立つ形で表示されていない。
- Xシェアボタンが表示される。

### 有料ロック

- `paid=false` の結果では `/result/[id]/premium` に有料本文が表示されない。
- `paid=false` の結果では購入ボタンが表示される。
- Stripe未設定時でも無料結果ページは壊れない。
- Stripe未設定時に購入ボタンを押しても、アプリ全体が500にならない。

### Stripe決済

- Stripe本番キー設定後、購入ボタンからStripe Checkoutへ遷移する。
- Checkout完了後 `/result/[id]/premium?session_id=...` に戻る。
- Stripe webhookで `checkout.session.completed` を受け取る。
- `fortune_results.paid=true` に更新される。
- `payments` に決済レコードが作成される。
- `paid=true` の場合、有料鑑定本文が表示され、購入ボタンは表示されない。

### SEO / OGP

- トップページのtitleが `未来分岐占い｜今の選択で変わる3つの未来を無料診断` になっている。
- 各SEOページにtitle、description、OGP、canonicalが入っている。
- OGP画像 `/og-image.svg` が表示できる。
- Xでシェアしたときに意図した文言が入る。

### スマホ表示

- 360px幅で横スクロールが出ない。
- ヘッダー、CTA、フォーム、結果ページの本文が見切れない。
- 結果ページが鑑定書として読みやすい。
- 有料ロック部分がチラ見せ表示として自然に読める。

## 主要URL

- `/`
- `/fortune`
- `/result/[id]`
- `/result/[id]/premium`
- `/api/checkout`
- `/api/webhook`
- `/pages/contact-or-wait`
- `/pages/reunion-give-up`
- `/pages/love-continue`
- `/pages/quit-job`
- `/pages/life-turning-point`
- `/pages/fortune-2026`
- `/privacy`
- `/terms`
- `/disclaimer`
- `/commercial-law`
- `/contact`

## 参考公式ドキュメント

- Vercel Environment Variables: https://vercel.com/docs/environment-variables
- Supabase Row Level Security: https://supabase.com/docs/guides/database/postgres/row-level-security
- Stripe Checkout fulfillment / webhooks: https://docs.stripe.com/checkout/fulfillment
- Stripe webhook signature verification: https://docs.stripe.com/webhooks

## 注意

未来分岐占いはエンタメ目的の占いサービスです。鑑定結果は、人生・恋愛・仕事・金銭・健康などに関する判断を保証するものではありません。重要な決定を行う際は、必要に応じて専門家や信頼できる人に相談してください。
