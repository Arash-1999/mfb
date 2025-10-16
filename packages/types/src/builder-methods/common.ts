import type { FieldValues, SubmitHandler, UseFormProps } from "react-hook-form";

import type { FormBuilderConfig } from "../config";
import type { GetLayoutProps } from "../utils";

interface BuilderBaseProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TFormId extends string = string,
> {
  gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
  id: TFormId;
  onSubmit: SubmitHandler<TFields>;
  options?: UseFormProps<TFields>;
}

export type { BuilderBaseProps };
