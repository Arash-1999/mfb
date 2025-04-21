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

type AdvancedBuilderProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TFormId extends string = string,
> = BuilderBaseProps<TConfig, TFields, TFormId> & {
  list: AdvancedList<TConfig, TFields>;
  // list: Array<GetCards<TConfig, TFields, true> | GetInputs<TConfig, TFields>>;
};

type AdvancedMapperProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = {
  list: AdvancedList<TConfig, TFields>;
  name?: string;
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

type BuilderBaseProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TFormId extends string = string,
> = {
  gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
  id: TFormId;
  onSubmit: SubmitHandler<TFields>;
  options?: UseFormProps<TFields>;
};

type BuilderProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TFormId extends string = string,
> = BuilderBaseProps<TConfig, TFields, TFormId> & {
  cards: Array<GetCards<TConfig, TFields>>;
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

type InputMapFnOptions<TFields extends FieldValues> = {
  formMethods: UseFormReturn<TFields>;
  name?: string;
};

type InputMapperProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = {
  inputs: InputArray<TConfig, TFields>;
  name?: string;
};

type RenderCardProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = {
  index: number;
} & (
  | {
      advanced: false;
      card: GetCards<TConfig, TFields, false>;
    }
  | {
      advanced: true;
      card: GetCards<TConfig, TFields, true>;
    }
);

type RenderInputOptions<TFields extends FieldValues> = {
  formMethods: UseFormReturn<TFields>;
};

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
