import type { ItemContextValue } from "@/context";
import type { PropsWithChildren } from "react";
import type { FieldValues } from "react-hook-form";

import { useMemo } from "react";

import { ItemContext, useItemContext } from "@/context";
import type { ChildrenPathResult, DefaultItem } from "@/types";

interface PathProviderProps<
  TFields extends FieldValues,
  TItem extends DefaultItem<TFields>,
> {
  getItemInfo: (item: TItem) => ChildrenPathResult;
  index: number | null;
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
  const parent = useItemContext();

  const contextValue = useMemo<ItemContextValue | null>(() => {
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
  }, [getItemInfo, item, parent]);

  return (
    <ItemContext.Provider value={contextValue}>{children}</ItemContext.Provider>
  );
};

export { MfbItemProvider };
