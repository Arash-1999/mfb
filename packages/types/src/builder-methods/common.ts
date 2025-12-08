import type { JSX } from "react";
import type {
  FieldValues,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";

import type { FormBuilderConfig } from "../config";
import type { GetLayoutProps } from "../utils";

interface BuilderBaseProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TFormId extends string = string,
> {
  footer?: (props: BuilderLayoutComponentProps<TFields>) => JSX.Element;
  gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
  header?: (props: BuilderLayoutComponentProps<TFields>) => JSX.Element;
  id: TFormId;
  onSubmit: SubmitHandler<TFields>;
  options?: UseFormProps<TFields>;
}

interface BuilderLayoutComponentProps<TFields extends FieldValues> {
  formMethods: UseFormReturn<TFields>;
}

interface FormLayoutProps<TFields extends FieldValues> {
  footer:
    | ((props: BuilderLayoutComponentProps<TFields>) => JSX.Element)
    | undefined;
  header:
    | ((props: BuilderLayoutComponentProps<TFields>) => JSX.Element)
    | undefined;
}

export type { BuilderBaseProps, BuilderLayoutComponentProps, FormLayoutProps };
