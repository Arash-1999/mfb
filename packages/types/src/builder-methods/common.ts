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
  footer?: () => JSX.Element;
  gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
  header?: () => JSX.Element;
  id: TFormId;
  onSubmit: SubmitHandler<TFields>;
  options?: UseFormProps<TFields>;
}

interface BuilderLayoutComponentProps<TFields extends FieldValues> {
  formMethods: UseFormReturn<TFields>;
}

interface FormLayoutProps {
  footer: (() => JSX.Element) | undefined;
  header: (() => JSX.Element) | undefined;
}

export type { BuilderBaseProps, BuilderLayoutComponentProps, FormLayoutProps };
