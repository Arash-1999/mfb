import type { FieldValues, SubmitHandler, UseFormProps } from "react-hook-form";

import type { InputArray } from "../common";
import type { FormBuilderConfig } from "../config";
import type { GetInputsImpl } from "../input";
import type { GetLayoutProps } from "../utils";

interface BasicBuilderProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TFormId extends string = string,
> {
  gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
  id: TFormId;
  inputs: // TODO: use single generic type instead function mode
  | ((api: {
        define: <TDeps extends FieldValues>(
          func: (props?: {
            deps: TDeps;
          }) => GetInputsImpl<TConfig, TFields, false, true>,
        ) => (props?: {
          deps: TDeps;
        }) => GetInputsImpl<TConfig, TFields, false, true>;
      }) => InputArray<TConfig, TFields>)
    | InputArray<TConfig, TFields>;
  onSubmit: SubmitHandler<TFields>;
  options?: UseFormProps<TFields>;
}

export type { BasicBuilderProps };
