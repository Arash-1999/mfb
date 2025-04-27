import type { ReactNode } from "react";
import type {
  FieldValues,
  SubmitHandler,
  UseFieldArrayReturn,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";

import type { GetCards } from "./card";
import type { FormBuilderConfig } from "./config";
import type { DependsOn } from "./dependency-management";
import type { GetInputs } from "./input";
import type { AdvancedList, GetLayoutProps, InputArray } from "./utils";

interface AdvancedBuilderProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TFormId extends string = string,
> extends BuilderBaseProps<TConfig, TFields, TFormId> {
  list: AdvancedList<TConfig, TFields>;
}

interface AdvancedMapperProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> {
  list: AdvancedList<TConfig, TFields>;
  name?: string;
}

interface BasicBuilderProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TFormId extends string = string,
> {
  gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
  id: TFormId;
  inputs: InputArray<TConfig, TFields>;
  onSubmit: SubmitHandler<TFields>;
  options?: UseFormProps<TFields>;
}

interface BuilderBaseProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TFormId extends string = string,
> {
  gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
  id: TFormId;
  onSubmit: SubmitHandler<TFields>;
  options?: UseFormProps<TFields>;
}

interface BuilderProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TFormId extends string = string,
> extends BuilderBaseProps<TConfig, TFields, TFormId> {
  cards: Array<GetCards<TConfig, TFields>>;
}

interface DependencyManagerProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> {
  dependsOn: DependsOn<TFields>;
  input: GetInputs<TConfig, TFields>;
}

interface FieldArrayProps<TFields extends FieldValues> {
  // TODO: use ArrayPath generic type instead of string
  name: string;
  render: (fields: UseFieldArrayReturn<TFields>["fields"]) => ReactNode;
}

interface FormBuilderProps<TConfig extends FormBuilderConfig> {
  config: TConfig;
}

interface InputMapFnOptions<TFields extends FieldValues> {
  formMethods: UseFormReturn<TFields>;
  name?: string;
}

interface InputMapperProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> {
  inputs: InputArray<TConfig, TFields>;
  name?: string;
}

type RenderCardProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = RenderPropsAdvanced<TConfig, TFields> | RenderPropsNormal<TConfig, TFields>;

type RenderInputOptions<TFields extends FieldValues> = {
  formMethods: UseFormReturn<TFields>;
};
interface RenderPropsAdvanced<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> extends RenderPropsBase {
  advanced: false;
  card: GetCards<TConfig, TFields, false>;
}
interface RenderPropsBase {
  index: number;
}
interface RenderPropsNormal<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> extends RenderPropsBase {
  advanced: true;
  card: GetCards<TConfig, TFields, true> & { mode: "card" };
}

export type {
  AdvancedBuilderProps,
  AdvancedMapperProps,
  BasicBuilderProps,
  BuilderProps,
  DependencyManagerProps,
  FieldArrayProps,
  FormBuilderConfig,
  FormBuilderProps,
  InputMapFnOptions,
  InputMapperProps,
  RenderCardProps,
  RenderInputOptions,
};
