import type { FieldValues } from "react-hook-form";

import type { GetCardsImpl } from "../card";
import type { AdvancedList } from "../common";
import type { FormBuilderConfig } from "../config";
import type { GetInputsImpl } from "../input";
import type { BuilderBaseProps } from "./common";

interface AdvancedBuilderProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TFormId extends string = string,
> extends BuilderBaseProps<TConfig, TFields, TFormId> {
  list:
    | ((api: {
        defineCard: <TDeps extends FieldValues>(
          func: (props?: {
            deps: TDeps;
          }) => GetCardsImpl<TConfig, TFields, false, true> & { mode: "card" },
        ) => (props?: {
          deps: TDeps;
        }) => GetCardsImpl<TConfig, TFields, false, true> & { mode: "card" };
        defineInput: <TDeps extends FieldValues>(
          func: (props?: { deps: TDeps }) => GetInputsImpl<
            TConfig,
            TFields,
            false,
            true
          > & {
            mode: "input";
          },
        ) => (props?: {
          deps: TDeps;
        }) => GetInputsImpl<TConfig, TFields, false, true> & { mode: "input" };
      }) => AdvancedList<TConfig, TFields>)
    | AdvancedList<TConfig, TFields>;
}

export type { AdvancedBuilderProps };
