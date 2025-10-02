import type { ComponentProps, JSX } from "react";
import type { ArrayPath, FieldValues } from "react-hook-form";

import type { FormBuilderConfig } from "./config";
import type { AdvancedList, GetLayoutProps, ListInputArray } from "./utils";
import type { ArrayValidation } from "./validation";

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

type ButtonComponent = (props: ButtonComponentProps & unknown) => JSX.Element;
type ButtonComponentProps = Pick<
  ComponentProps<"button">,
  "disabled" | "onClick" | "type"
>;

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
  validation?: ArrayValidation;
}

export type { ActionInput, ButtonComponent, ButtonComponentProps, ListInput };
