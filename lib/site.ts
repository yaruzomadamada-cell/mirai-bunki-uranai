import "server-only";

export function getSiteUrl(requestUrl?: string): string {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configuredUrl?.startsWith("http://") || configuredUrl?.startsWith("https://")) {
    return configuredUrl.replace(/\/$/, "");
  }

  if (requestUrl) {
    return new URL(requestUrl).origin;
  }

  return "http://localhost:3000";
}
