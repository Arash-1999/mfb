// store/atoms/sidebar.ts or add to your existing store file
import { atom } from "jotai";
import type { Category } from "@/statics/items";

export const sidebarTabKeyAtom = atom<Category>("");
export const sidebarFormKeyAtom = atom<string>("");

// Optional: Combined atom for resetting both
export const resetSidebarStateAtom = atom(null, (get, set) => {
  set(sidebarTabKeyAtom, "");
  set(sidebarFormKeyAtom, "");
});
