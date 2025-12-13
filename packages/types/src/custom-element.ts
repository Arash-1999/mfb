import type { JSX } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

import type { BaseComponentProps } from "./common";
import type { FormBuilderConfig } from "./config";
import type { Dependency } from "./dependency-management";
import type { GetFormats, GetLayoutProps } from "./utils";
import type { Validation } from "./validation";

type CustomElement<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = CustomElementBase<TConfig> & Dependency<TConfig, TFields, false, false>;

interface CustomElementBase<TConfig extends FormBuilderConfig> {
  defaultValue?: unknown;
  element: <TFields extends FieldValues>(
    props: CustomElementProps<TFields>,
  ) => JSX.Element;
  gridProps?: GetLayoutProps<TConfig, "grid-item">;
  name: string;
  required?: boolean;
  type: "custom-element";
  validation?: Validation<GetFormats<TConfig>>;
}

interface CustomElementProps<
  TFields extends FieldValues,
  TDeps extends FieldValues = FieldValues,
> extends BaseComponentProps {
  deps?: TDeps;
  formMethods: UseFormReturn<TFields>;
  index: number | undefined;
  name: string | undefined;
}

export type { CustomElement, CustomElementProps };
