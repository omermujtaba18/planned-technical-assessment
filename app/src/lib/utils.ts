import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const base64ToFile = (
  base64String: string,
  fileName: string,
  mimeType = "image/jpeg",
) => {
  const byteCharacters = atob(base64String.split(",")[1]);
  const byteArrays = [];

  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays.push(byteCharacters.charCodeAt(i));
  }

  const byteArray = new Uint8Array(byteArrays);
  return new File([byteArray], fileName, { type: mimeType });
};
