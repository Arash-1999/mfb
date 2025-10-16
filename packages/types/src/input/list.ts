import type { FieldValues } from "react-hook-form";

import type { AdvancedList, ListInputArray } from "../common";
import type { FormBuilderConfig } from "../config";
import type { GetLayoutProps } from "../utils";

type ListInput<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = ListInputBase<TConfig> &
  (
    | {
        inputs: ListInputArray<TConfig, TFields>;
      }
    | {
        list: AdvancedList<TConfig, TFields>;
      }
  );

interface ListInputBase<TConfig extends FormBuilderConfig> {
  gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
  gridProps?: GetLayoutProps<TConfig, "grid-item">;
  name: string;
  type: "list";
}

export type { ListInput };
