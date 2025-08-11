import type { ChildrenPathResult } from "@/types";

import { createContext, useContext } from "react";

interface MfbItemContextValue {
  childrenPath: ChildrenPathResult;
  mode: "advanced" | "normal";
  path: string;
}

const MfbItemContext = createContext<MfbItemContextValue | null>(null);

const useMfbItemContext = () => {
  return useContext(MfbItemContext);
};

export { MfbItemContext, useMfbItemContext };
export type { MfbItemContextValue };
