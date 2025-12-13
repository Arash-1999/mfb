import type { FieldValues } from "react-hook-form";

import type { GetCards, GetCardsImpl } from "../card";
import type { FormBuilderConfig } from "../config";
import type { CustomElement } from "../custom-element";
import type { GetInputsImpl } from "../input";
import type { BuilderBaseProps } from "./common";

// TODO: use single generic type instead function mode
type BuilderCardsFn<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = (api: {
  defineCard: <TDeps extends FieldValues>(
    func: (props?: {
      deps: TDeps;
    }) => GetCardsImpl<TConfig, TFields, false, true>,
  ) => (props?: { deps: TDeps }) => GetCardsImpl<TConfig, TFields, false, true>;
  defineInput: <TDeps extends FieldValues>(
    func: (props?: {
      deps: TDeps;
    }) => GetInputsImpl<TConfig, TFields, false, true>,
  ) => (props?: {
    deps: TDeps;
  }) => GetInputsImpl<TConfig, TFields, false, true>;
}) => ItemsList<TConfig, TFields>;

interface BuilderProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TFormId extends string = string,
> extends BuilderBaseProps<TConfig, TFields, TFormId> {
  cards: BuilderCardsFn<TConfig, TFields> | ItemsList<TConfig, TFields>;
}

type ItemsList<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = Array<CustomElement<TConfig, TFields> | GetCards<TConfig, TFields>>;

export type { BuilderCardsFn, BuilderProps };
