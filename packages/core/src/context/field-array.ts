import type { FieldArrayContextValue } from "@mfb/types";

import { createContext, useContext } from "react";

const FieldArrayContext = createContext<FieldArrayContextValue | null>(null);

const useFieldArrayContext = () => {
  return useContext(FieldArrayContext) || { index: null, length: null };
};

export { FieldArrayContext, useFieldArrayContext };
