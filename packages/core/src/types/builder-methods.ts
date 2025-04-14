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
import type { GetLayoutProps, InputArray } from "./utils";

type AdvancedBuilderProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TFormId extends string = string,
> = BuilderBaseProps<TConfig, TFields, TFormId> & {
  gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
  id: TFormId;
  list: Array<unknown>;
};

type BasicBuilderProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TFormId extends string = string,
> = {
  gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
  id: TFormId;
  inputs: InputArray<TConfig, TFields>;
  onSubmit: SubmitHandler<TFields>;
  options?: UseFormProps<TFields>;
};

type BuilderBaseProps<TConfig extends FormBuilderConfig, TFields extends FieldValues, 
TFormId extends string = string,
> = {
  gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
  id: TFormId;
  onSubmit: SubmitHandler<TFields>;
  options?: UseFormProps<TFields>;
}

type BuilderProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TFormId extends string = string,
> = {
  cards: Array<GetCards<TConfig, TFields>>;
  gridProps?: GetLayoutProps<TConfig, "grid-container">;
  id: TFormId;
  onSubmit: SubmitHandler<TFields>;
  options?: UseFormProps<TFields>;
};

type DependencyManagerProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = {
  dependsOn: DependsOn<TFields>;
  input: GetInputs<TConfig, TFields>;
};

type FieldArrayProps<TFields extends FieldValues> = {
  // TODO: use ArrayPath generic type instead of string
  name: string;
  render: (fields: UseFieldArrayReturn<TFields>["fields"]) => ReactNode;
};

interface FormBuilderProps<TConfig extends FormBuilderConfig> {
  config: TConfig;
}

type InputMapperProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = {
  inputs: InputArray<TConfig, TFields>;
  name?: string;
};

type RenderInputOptions<TFields extends FieldValues> = {
  formMethods: UseFormReturn<TFields>;
};

export type {
  AdvancedBuilderProps,
  BasicBuilderProps,
  BuilderProps,
  DependencyManagerProps,
  FieldArrayProps,
  FormBuilderConfig,
  FormBuilderProps,
  InputMapperProps,
  RenderInputOptions,
};
