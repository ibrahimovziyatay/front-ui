import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const blurBackground =
  "bg-card/50 backdrop-blur-md border border-muted-foreground/60";
