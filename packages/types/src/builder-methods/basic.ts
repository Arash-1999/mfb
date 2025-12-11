import type { FieldValues } from "react-hook-form";

import type { InputArray } from "../common";
import type { FormBuilderConfig } from "../config";
import type { GetInputsImpl } from "../input";
import type { BuilderBaseProps } from "./common";

type BasicBuilderInputsFn<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = (api: {
  define: <TDeps extends FieldValues>(
    func: (props?: {
      deps: TDeps;
    }) => GetInputsImpl<TConfig, TFields, false, true>,
  ) => (props?: {
    deps: TDeps;
  }) => GetInputsImpl<TConfig, TFields, false, true>;
}) => InputArray<TConfig, TFields>;

interface BasicBuilderProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TFormId extends string = string,
> extends BuilderBaseProps<TConfig, TFields, TFormId> {
  // TODO: use single generic type instead function mode
  inputs: BasicBuilderInputsFn<TConfig, TFields> | InputArray<TConfig, TFields>;
}

export type { BasicBuilderInputsFn, BasicBuilderProps };
