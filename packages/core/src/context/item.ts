import type { ChildrenPathResult } from "@/types";

import { createContext, useContext } from "react";

interface ParentDeps {
  disable: boolean;
}
interface MfbItemContextValue {
  childrenPath: ChildrenPathResult;
  mode: "advanced" | "normal";
  path: string;
  deps: ParentDeps;
}

const MfbItemContext = createContext<MfbItemContextValue | null>(null);

const itemContextDefaultValue: MfbItemContextValue = {
  childrenPath: null,
  deps: {
    disable: false,
  },
  mode: "normal",
  path: "",
};
const useMfbItemContext = () => {
  return useContext(MfbItemContext) || itemContextDefaultValue;
};

export { MfbItemContext, useMfbItemContext };
export type { MfbItemContextValue, ParentDeps };
