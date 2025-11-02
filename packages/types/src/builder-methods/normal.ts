import type { FieldValues } from "react-hook-form";

import type { GetCards, GetCardsImpl } from "../card";
import type { FormBuilderConfig } from "../config";
import type { GetInputsImpl } from "../input";
import type { BuilderBaseProps } from "./common";

interface BuilderProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TFormId extends string = string,
> extends BuilderBaseProps<TConfig, TFields, TFormId> {
  // TODO: use single generic type instead function mode
  cards:
    | ((api: {
        defineCard: <TDeps extends FieldValues>(
          func: (props?: {
            deps: TDeps;
          }) => GetCardsImpl<TConfig, TFields, false, true>,
        ) => (props?: {
          deps: TDeps;
        }) => GetCardsImpl<TConfig, TFields, false, true>;
        defineInput: <TDeps extends FieldValues>(
          func: (props?: {
            deps: TDeps;
          }) => GetInputsImpl<TConfig, TFields, false, true>,
        ) => (props?: {
          deps: TDeps;
        }) => GetInputsImpl<TConfig, TFields, false, true>;
      }) => Array<GetCards<TConfig, TFields>>)
    | Array<GetCards<TConfig, TFields>>;
}

export type { BuilderProps };
