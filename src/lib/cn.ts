import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge our custom font sizes (--text-* in global.css), otherwise
// "text-title" and "text-text" look like two colours and one gets dropped.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "title", "heading", "button"] }],
    },
  },
});

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
