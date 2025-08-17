import type { MfbItemContextValue } from "@/context";
import type {
  ChildrenPathResult,
  DefaultItem,
  FormBuilderConfig,
} from "@/types";
import type { PropsWithChildren } from "react";
import type { FieldValues } from "react-hook-form";

import { MfbItemContext, useMfbItemContext } from "@/context";
import { useMemo } from "react";

interface ItemProviderProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TItem extends DefaultItem<TConfig, TFields>,
> {
  disable?: boolean;
  getItemInfo?: (item: TItem) => ChildrenPathResult;
  index?: number;
  item?: TItem;
}

const MfbItemProvider = <
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TItem extends DefaultItem<TConfig, TFields>,
>({
  children,
  disable = false,
  getItemInfo,
  index,
  item,
}: PropsWithChildren<ItemProviderProps<TConfig, TFields, TItem>>) => {
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
      childrenPath: getItemInfo && item ? getItemInfo(item) : null,
      mode: "normal",
      path,
      deps: { disable: Boolean(disable) },
    };
  }, [disable, getItemInfo, index, item, parent]);

  return (
    <MfbItemContext.Provider value={contextValue}>
      {children}
    </MfbItemContext.Provider>
  );
};

export { MfbItemProvider };
