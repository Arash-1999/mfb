import type { ChildrenPathResult } from "@mfb/types";

import { createContext, useContext } from "react";

interface MfbItemContextValue {
  childrenPath: ChildrenPathResult;
  deps: ParentDeps;
  mode: "advanced" | "normal";
  path: string;
}
interface ParentDeps {
  disable: boolean;
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
