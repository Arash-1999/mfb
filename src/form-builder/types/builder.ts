import type { FieldValues, UseFormReturn } from "react-hook-form";
import type { BaseComponent, FbComponent, GetInputs } from "./utils";

type LayoutKey = "grid-container" | "grid-item" | "field";

interface FormBuilderConfig {
  input: FbComponent;
  field: BaseComponent;
  layout?: Record<LayoutKey, BaseComponent>;
}

interface FormBuilderProps<TConfig extends FormBuilderConfig> {
  config: TConfig;
}

/* FromBuilder class methods */
type RenderInputOptions<TFields extends FieldValues> = {
  formMethods: UseFormReturn<TFields>;
};

type InputMapperProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = {
  formMethods: UseFormReturn<TFields>;
  inputs: Array<GetInputs<TConfig>>;
};

type BasicBuilderProps<TConfig extends FormBuilderConfig> = {
  inputs: Array<GetInputs<TConfig>>;
};

export type {
  FormBuilderConfig,
  FormBuilderProps,
  RenderInputOptions,
  InputMapperProps,
  BasicBuilderProps,
};
