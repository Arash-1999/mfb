import type { ArrayPath, FieldValues } from "react-hook-form";

import type { FormBuilderConfig } from "../config";
import type { GetLayoutProps } from "../utils";

interface ActionInput<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> {
  actionType: "append" | "prepend" | "remove";
  gridProps?: GetLayoutProps<TConfig, "grid-item">;
  name: ArrayPath<TFields>;
  props?: Parameters<TConfig["button"]["component"]>[0];
  type: "field-array-action";
}

export type { ActionInput };
