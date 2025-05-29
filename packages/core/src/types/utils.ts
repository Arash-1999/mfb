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
  | (GetCards<TConfig, TFields, true> & { mode: "card" })
  | (GetInputs<TConfig, TFields> & { mode: "input" })
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseComponent = (props: any) => JSX.Element;

interface BaseComponentProps {
  disabled?: boolean;
}

type BaseInput = (
  // TODO: use unknown instead of any for 'name' and 'formMethods' type-safety
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any & BaseComponentProps,
) => JSX.Element;

interface DefaultItem<TFields extends FieldValues> extends Dependency<TFields> {
  name?: string;
}

interface DefineFnProps {
  deps: never;
}

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

type RenderFn<
  TFields extends FieldValues,
  TItem extends DefaultItem<TFields>,
> = (item: TItem, options: RenderFnOptions<TFields>) => JSX.Element | null;
interface RenderFnOptions<TFields extends FieldValues> {
  dependsOn: DependencyStructure<TFields>;
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
  GetLayoutProps,
  HasDependencyField,
  InputArray,
  LayoutKey,
  ListInputArray,
  RenderFn,
  RenderFnOptions,
};
