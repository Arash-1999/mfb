import type { ChildrenPathResult } from "@/types";

import { createContext, useContext } from "react";

interface ItemContextValue {
  path: string;
  mode: "advanced" | "normal";
  childrenPath: ChildrenPathResult;
}

const ItemContext = createContext<ItemContextValue | null>(null);

const useItemContext = () => {
  return useContext(ItemContext);
};

export { ItemContext, useItemContext };
export type { ItemContextValue };
