import type { ChildrenPathResult } from "../children-path";

interface MfbItemContextValue {
  childrenPath: ChildrenPathResult;
  deps: ParentDeps;
  mode: "advanced" | "normal";
  path: string;
}

// TODO: extend ParentDeps type to support user defined boolean dependency types (e.g. readonly)
interface ParentDeps {
  disable: boolean;
}

export type { MfbItemContextValue, ParentDeps };
