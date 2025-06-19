import { createContext, useContext } from "react";

interface DependencyContextValue {
  disable: boolean;
}

const DependencyContext = createContext<DependencyContextValue | null>(null);

const useDependencyContext = () => {
  return useContext(DependencyContext) || { disable: false };
};

export { DependencyContext, useDependencyContext };
export type { DependencyContextValue };
