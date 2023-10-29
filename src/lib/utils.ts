import { ReadonlyURLSearchParams } from "next/navigation";

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

export const generateSearchParams = (params: object) => {
  const searchParams = new URLSearchParams();
  for (const key of Object.keys(params)) {
    const value = (params as any)[key];
    if (value) {
      searchParams.append(key, value);
    }
  }
  const paramString = searchParams.size !== 0 ? `?${searchParams}` : "";
  return paramString.toString();
};

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};
