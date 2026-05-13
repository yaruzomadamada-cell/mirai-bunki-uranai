export type Gender = "女性" | "男性" | "その他" | "回答しない";

export type ThemeId =
  | "contact"
  | "reunion"
  | "love"
  | "job"
  | "life"
  | "fortune2026";

export type FortuneInput = {
  nickname: string;
  birthdate: string;
  gender: Gender;
  theme: ThemeId;
  situation: string;
  concern?: string;
};

export type FutureBranch = {
  title: string;
  body: string;
  caution?: string;
  advice?: string;
};

export type FreeResult = {
  title: string;
  typeName: string;
  typeDescription: string;
  currentLocation: string;
  branches: FutureBranch[];
  focus30Days: string;
  avoidAction: string;
  premiumLead: string;
};

export type PremiumResult = {
  future90: string;
  changes3Months: string;
  influence: string;
  activeDetail: string;
  waitingDetail: string;
  releaseDetail: string;
  forbiddenAction: string;
  timing: string;
  neededWords: string;
  finalMessage: string;
};

export type FortuneMenu = {
  id: ThemeId;
  category: string;
  categoryColor: string;
  label: string;
  lead: string;
  emotionalCopy: string;
  description: string;
  tags: string[];
  learn: string[];
  href: string;
  rank?: number;
};

export type FortuneResultRecord = {
  id: string;
  nickname: string;
  birthdate: string;
  gender: string | null;
  theme: ThemeId;
  situation: string;
  concern: string | null;
  type_number: number;
  type_name: string;
  free_result: FreeResult;
  premium_result: PremiumResult;
  paid: boolean;
  stripe_session_id: string | null;
  created_at: string;
};

export type PaymentRecord = {
  fortune_result_id: string;
  stripe_session_id?: string | null;
  provider?: "stripe" | "komoju";
  provider_payment_id?: string | null;
  amount: number;
  currency: string;
  status: string;
};
