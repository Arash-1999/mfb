import { createContext, useContext } from "react";

interface FieldArrayContextValue {
  index: null | number;
  length: null | number;
}

const FieldArrayContext = createContext<FieldArrayContextValue | null>(null);

const useFieldArrayContext = () => {
  return useContext(FieldArrayContext) || { index: null, length: null };
};

export { FieldArrayContext, useFieldArrayContext };
export type { FieldArrayContextValue };
