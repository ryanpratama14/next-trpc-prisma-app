export const LoadToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const BASE_URL = process.env.NEXT_PUBLIC_API;

export const getBaseUrl = (): string => {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  return `http://localhost:${process.env.PORT ?? 3000}`;
};
