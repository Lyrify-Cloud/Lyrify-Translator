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

export async function copyClipboard(text: string) {
  /**
   * Copy text to clipboard
   * @param text Text to copy
   * @example
   * await copyClipboard("Hello world!");
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
   */

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return await navigator.clipboard.writeText(text);
    }

    const el = document.createElement("textarea");
    el.value = text;
    // android may require editable
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.focus();
    el.select();
    el.setSelectionRange(0, text.length);
    document.execCommand("copy");
    document.body.removeChild(el);
  } catch (e) {
    console.warn(e);
  }
}