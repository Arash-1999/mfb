import type { FieldValues, UseFormReturn } from "react-hook-form";

import type { AdvancedList, ListInputArray } from "../common";
import type { FormBuilderConfig } from "../config";
import type { DependsOn } from "../dependency-management";

interface AdvancedMapperProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> {
  list: AdvancedList<TConfig, TFields>;
  name?: string;
}

interface InputMapFnOptions<TFields extends FieldValues> {
  deps?: DependsOn<TFields>;
  formMethods: UseFormReturn<TFields>;
  name?: string;
}

interface InputMapperProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> {
  deps?: DependsOn<TFields>;
  inputs: ListInputArray<TConfig, TFields>;
  name?: string;
}

export type { AdvancedMapperProps, InputMapFnOptions, InputMapperProps };
