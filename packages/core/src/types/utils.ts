import type { JSX } from "react";
import type { FieldValues } from "react-hook-form";

import type { GetCards } from "./card";
import type { ActionInput } from "./components";
import type { FormBuilderConfig } from "./config";
import type { GetInputs } from "./input";

type AdvancedList<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = Array<GetCards<TConfig, TFields, true> | GetInputs<TConfig, TFields>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseComponent = (props: any) => JSX.Element;

type BaseInput = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any & BaseInputParameters
) => JSX.Element;

type BaseInputParameters = {
  disabled?: boolean;
};

type GetLayoutProps<
  TConfig extends FormBuilderConfig,
  TItem extends LayoutKey,
> = Parameters<TConfig["layout"][TItem]>[0];

type HasDependencyField<TInput extends BaseInput> =
  "deps" extends keyof Parameters<TInput>[0] ? false : true;

type InputArray<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = Array<GetInputs<TConfig, TFields>>;

type LayoutKey = "field" | "grid-container" | "grid-item";

type ListInputArray<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = Array<ActionInput | GetInputs<TConfig, TFields>>;

export type {
  AdvancedList,
  BaseComponent,
  BaseInput,
  BaseInputParameters,
  GetLayoutProps,
  HasDependencyField,
  InputArray,
  LayoutKey,
  ListInputArray,
};
