import type { ReactNode } from "react";
import type {
  FieldValues,
  UseFieldArrayReturn,
  UseFormReturn,
} from "react-hook-form";

import type { GetCards } from "./card";
import type { FormBuilderConfig } from "./config";
import type { GetLayoutProps, InputArray } from "./utils";

type BasicBuilderProps<TConfig extends FormBuilderConfig> = {
  gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
  inputs: InputArray<TConfig>;
};

type BuilderProps<TConfig extends FormBuilderConfig> = {
  cards: Array<GetCards<TConfig>>;
  gridProps?: GetLayoutProps<TConfig, "grid-container">;
};

type FieldArrayProps<TFields extends FieldValues> = {
  // TODO: use ArrayPath generic type instead of string
  name: string;
  render: (fields: UseFieldArrayReturn<TFields>["fields"]) => ReactNode;
};

interface FormBuilderProps<TConfig extends FormBuilderConfig> {
  config: TConfig;
}

type InputMapperProps<TConfig extends FormBuilderConfig> = {
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
