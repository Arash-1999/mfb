import type { MfbItemContextValue } from "@mfb/types";

import { createContext, useContext } from "react";

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
