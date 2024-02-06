import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setMemory(key: string, value: string) {
  const data = value.trim();
  localStorage.setItem(key, data);
}

export function getMemory(key: string): string {
  return (localStorage.getItem(key) || "").trim();
}
