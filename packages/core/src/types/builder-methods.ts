import type { ReactNode } from "react";
import type {
  FieldValues,
  UseFieldArrayReturn,
  UseFormReturn,
} from "react-hook-form";

import type { GetCards } from "./card";
import type { FormBuilderConfig } from "./config";
import type { BindValueDependency, DependsOn } from "./dependency-management";
import type { GetInputs } from "./input";
import type { GetLayoutProps, InputArray } from "./utils";

type BasicBuilderProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = {
  gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
  id: string;
  inputs: InputArray<TConfig, TFields>;
};

type BuilderProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = {
  cards: Array<GetCards<TConfig, TFields>>;
  gridProps?: GetLayoutProps<TConfig, "grid-container">;
  id: string;
};

type DependencyManagerProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = {
  dependsOn: BindValueDependency<TFields> | DependsOn<TFields>;
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
  BasicBuilderProps,
  BuilderProps,
  DependencyManagerProps,
  FieldArrayProps,
  FormBuilderConfig,
  FormBuilderProps,
  InputMapperProps,
  RenderInputOptions,
};
