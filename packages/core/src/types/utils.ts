import type { JSX } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

import type { GetCards } from "./card";
import type { ActionInput } from "./components";
import type { FormBuilderConfig } from "./config";
import type { Dependency, DependencyStructure } from "./dependency-management";
import type { GetInputs } from "./input";

type AdvancedList<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = Array<
  | GetCards<TConfig, TFields, true, { mode: "card" }>
  | GetInputs<TConfig, TFields, false, { mode: "input" }>
>;

type BaseComponent = (props: any) => JSX.Element;

interface BaseComponentProps {
  disabled?: boolean;
}

type BaseInput = (
  // TODO: use unknown instead of any for 'name' and 'formMethods' type-safety
  props: any & BaseInputProps
) => JSX.Element;
interface BaseInputProps extends BaseComponentProps {
  defaultValue?: never;
}

interface DefaultItem<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> extends Dependency<TFields, GetExtraConditionKey<TConfig>> {
  gridProps?: object;
  name?: string;
}

interface DefineFnProps {
  deps: never;
}

type GetExtraConditionKey<TConfig extends FormBuilderConfig> =
  TConfig["options"] extends { extraConditions: infer TExtra }
    ? keyof TExtra
    : never;

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
> = Array<ActionInput<TConfig, TFields> | GetInputs<TConfig, TFields>>;

type RenderFn<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TItem extends DefaultItem<TConfig, TFields>,
> = (
  item: TItem,
  options: RenderFnOptions<TConfig, TFields>
) => JSX.Element | null;
interface RenderFnOptions<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> {
  dependsOn: DependencyStructure<TFields, GetExtraConditionKey<TConfig>>;
  formMethods: UseFormReturn<TFields>;
  index: number;
  name?: string;
}

export type {
  AdvancedList,
  BaseComponent,
  BaseComponentProps,
  BaseInput,
  DefaultItem,
  DefineFnProps,
  GetExtraConditionKey,
  GetLayoutProps,
  HasDependencyField,
  InputArray,
  LayoutKey,
  ListInputArray,
  RenderFn,
  RenderFnOptions,
};
