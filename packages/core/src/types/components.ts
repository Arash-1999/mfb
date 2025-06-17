// import type { JSX } from "react";
import type { ArrayPath, FieldValues } from "react-hook-form";

import type { FormBuilderConfig } from "./config";
// import type { FieldArrayActions } from "./event";
// import type { GetInputs } from "./input";
import type { AdvancedList, GetLayoutProps, ListInputArray } from "./utils";

type ActionInput<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = {
  actionType: "append" | "prepend" | "remove";
  gridProps?: GetLayoutProps<TConfig, "grid-item">;
  name: ArrayPath<TFields>;
  type: "field-array-action";
};
// type ActionRenderProps<TFields extends FieldValues> = {
//   methods: FieldArrayActions<TFields>;
// };

// type AdvancedFieldArrayList<
//   TConfig extends FormBuilderConfig,
//   // TFields extends FieldValues,
// > = {
//   gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
//   gridProps?: GetLayoutProps<TConfig, "grid-item">;
//   // TODO: change unknown type
//   list?: Array<unknown>;
//   name: string;
//   type: 'advanced-list';
// }

// TODO: add ActionInput type to ListInput inputs
type ListInput<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = {
  gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
  gridProps?: GetLayoutProps<TConfig, "grid-item">;
  name: string;
  type: "list";
} & (
  | {
      inputs: ListInputArray<TConfig, TFields>;
    }
  | {
      list: AdvancedList<TConfig, TFields>;
    }
);

export type { ActionInput, ListInput };
