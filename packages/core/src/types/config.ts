import type { ReactNode } from "react";
import type { DeepPartial, FieldValues } from "react-hook-form";

import type { FieldArrayOverrideProps } from "./builder-methods";
import type { GroupCardComponent, SimpleCardObject } from "./card";
import type { ButtonComponent } from "./components";
import type { FieldArrayValues } from "./default-value";
import type { InputObject } from "./input";
import type { BaseComponent, LayoutKey } from "./utils";

interface FormBuilderConfig {
  button: {
    component: ButtonComponent;
  };
  card: {
    group?: Record<PropertyKey, GroupCardComponent>;
    simple: SimpleCardObject;
  };
  input: {
    components: InputObject;
    defaultValues: Record<PropertyKey, unknown>;
  };
  layout: Record<LayoutKey, BaseComponent>;
  options?: Partial<FormBuilderOptions>;
}

interface FormBuilderContext<TFormId extends string = string> {
  defaultValues: FieldValues;
  fieldArray: FieldValues;
  id: TFormId;
}

interface FormBuilderOptions {
  dependencyShouldReset: boolean;
  extraConditions: Record<
    PropertyKey,
    (target: unknown, current: unknown) => boolean
  >;
}

interface FormBuilderOverrides {
  FieldArray: <TFields extends FieldValues, TFormId extends string>(
    props: FieldArrayOverrideProps<TFields, TFormId>
  ) => ReactNode;
}

interface MfbContextValue<
  TFields extends FieldValues,
  TFormId extends string = string,
> {
  defaultValues: DeepPartial<TFields>;
  fieldArray: FieldArrayValues<TFields>;
  id: TFormId;
}

export type {
  FormBuilderConfig,
  FormBuilderContext,
  FormBuilderOptions,
  FormBuilderOverrides,
  MfbContextValue,
};
