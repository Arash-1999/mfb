import type { MfbItemContextValue } from "@/context";
import type { ChildrenPathResult, DefaultItem } from "@/types";
import type { PropsWithChildren } from "react";
import type { FieldValues } from "react-hook-form";

import { MfbItemContext, useMfbItemContext } from "@/context";
import { useMemo } from "react";

interface PathProviderProps<
  TFields extends FieldValues,
  TItem extends DefaultItem<TFields>,
> {
  getItemInfo: (item: TItem) => ChildrenPathResult;
  index: null | number;
  item: TItem;
}

const MfbItemProvider = <
  TFields extends FieldValues,
  TItem extends DefaultItem<TFields>,
>({
  children,
  getItemInfo,
  index,
  item,
}: PropsWithChildren<PathProviderProps<TFields, TItem>>) => {
  const parent = useMfbItemContext();

  const contextValue = useMemo<MfbItemContextValue | null>(() => {
    const path = [
      parent?.path ?? null,
      parent?.childrenPath?.hasChild ? parent.childrenPath.path : null,
      index,
    ]
      .filter((subpath) => Boolean(subpath) || typeof subpath === "number")
      .join(".");

    return {
      childrenPath: getItemInfo(item),
      mode: "normal",
      path,
    };
  }, [getItemInfo, index, item, parent]);

  return (
    <MfbItemContext.Provider value={contextValue}>
      {children}
    </MfbItemContext.Provider>
  );
};

export { MfbItemProvider };
