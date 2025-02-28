import type { ArrayPath, FieldValues, UseFormReturn } from "react-hook-form";

import type { GetCards } from "./card";
import type { FormBuilderConfig } from "./config";
import type { GetLayoutProps, InputArray } from "./utils";

type BasicBuilderProps<TConfig extends FormBuilderConfig> = {
  gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
  inputs: InputArray<TConfig>;
};

type BuilderProps<TConfig extends FormBuilderConfig> = {
  cards: Array<GetCards<TConfig>>;
};
type FieldArrayProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = {
  gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
  gridProps?: GetLayoutProps<TConfig, "grid-item">;
  inputs: InputArray<TConfig>;
  name: ArrayPath<TFields>;
};

interface FormBuilderProps<TConfig extends FormBuilderConfig> {
  config: TConfig;
}

type InputMapperProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = {
  formMethods: UseFormReturn<TFields>;
  inputs: InputArray<TConfig>;
  name?: string;
};

type RenderInputOptions<TFields extends FieldValues> = {
  formMethods: UseFormReturn<TFields>;
};

export type {
  BasicBuilderProps,
  BuilderProps,
  FieldArrayProps,
  FormBuilderConfig,
  FormBuilderProps,
  InputMapperProps,
  RenderInputOptions,
};
