import type { FieldValues, UseFormReturn } from "react-hook-form";

import type { FormBuilderConfig } from "./config";
import type { GetLayoutProps, InputArray } from "./utils";

type BasicBuilderProps<TConfig extends FormBuilderConfig> = {
  gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
  inputs: InputArray<TConfig>;
};

type BuilderProps<TConfig extends FormBuilderConfig> = {
  inputs: InputArray<TConfig>;
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
};

type RenderInputOptions<TFields extends FieldValues> = {
  formMethods: UseFormReturn<TFields>;
};

export type {
  BasicBuilderProps,
  BuilderProps,
  FormBuilderConfig,
  FormBuilderProps,
  InputMapperProps,
  RenderInputOptions,
};
