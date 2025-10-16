import type { ComponentProps, JSX } from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

import type { BaseComponentProps } from "../common";

type BaseInput = (
  // TODO: use unknown instead of any for 'name' and 'formMethods' type-safety
  props: any & BaseInputProps,
) => JSX.Element;

interface BaseInputProps extends BaseComponentProps {
  defaultValue?: never;
}

type ButtonComponent = (props: ButtonComponentProps & unknown) => JSX.Element;

type ButtonComponentProps = Pick<
  ComponentProps<"button">,
  "disabled" | "onClick" | "type"
>;

// TODO: add required and other rules
type InputProps<TFields extends FieldValues, TProps> = BaseComponentProps &
  TProps & {
    formMethods: UseFormReturn<TFields>;
    name: Path<TFields>;
  };

export type { BaseInput, ButtonComponent, ButtonComponentProps, InputProps };
