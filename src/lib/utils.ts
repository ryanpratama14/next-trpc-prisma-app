import { ReadonlyURLSearchParams } from "next/navigation";

export const loadToTop = () => {
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

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const generateStartDate = (date: string): string => {
  const updatedDate = new Date(date);
  updatedDate.setUTCHours(0, 0, 0, 0);
  return updatedDate.toISOString();
};

export const generateEndDate = (date: string): string => {
  const updatedDate = new Date(date);
  updatedDate.setUTCHours(23, 59, 59, 999);
  return updatedDate.toISOString();
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
