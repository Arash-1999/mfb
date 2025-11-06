import type { JSX } from "react";
import type { DeepPartial, FieldValues } from "react-hook-form";

import type { FieldArrayOverrideProps } from "./builder-methods/field-array";
import type { GroupCardComponent, SimpleCardObject } from "./card/component";
import type { BaseComponent, InputObject, LayoutKey } from "./common";
import type { FieldArrayValues } from "./default-value";
import type { ButtonComponent } from "./input";
import type { Validator } from "./validation";

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
  validator?: Validator;
}

interface FormBuilderContext<TFormId extends string = string> {
  defaultValues: FieldValues;
  fieldArray: FieldValues;
  id: TFormId;
}

interface FormBuilderOptions {
  dependencyShouldReset: boolean;
  genDefaultValues: boolean;
}

interface FormBuilderOverrides {
  FieldArray: <TFields extends FieldValues, TFormId extends string>(
    props: FieldArrayOverrideProps<TFields, TFormId>,
  ) => JSX.Element;
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
