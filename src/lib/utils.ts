import { ReadonlyURLSearchParams } from "next/navigation";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const loadToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
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

export const formatDate = (dateString: Date): string => {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const formatDateLong = (date: Date): string => {
  return date.toLocaleDateString([], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getTodayDate = () => {
  const date = new Date();
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const generateNewDate = (dateString?: string): Date => {
  if (dateString) return new Date(dateString);
  return new Date();
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
