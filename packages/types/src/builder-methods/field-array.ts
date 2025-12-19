import type { JSX } from "react";
import type { FieldValues, UseFieldArrayReturn } from "react-hook-form";

import type { FieldArrayOverrideFn } from "../config";
import type { FieldArrayValues } from "../default-value";
import type { MapFn } from "../utils";

interface FieldArrayOverrideProps<
  TFields extends FieldValues,
  TFormId extends string = string,
> extends FieldArrayProps<TFields> {
  id: TFormId;
}

interface FieldArrayProps<TFields extends FieldValues> {
  component?: FieldArrayOverrideFn;
  disabled: boolean | undefined;
  fieldArray: FieldArrayValues<TFields>;
  // TODO: use ArrayPath generic type instead of string
  name: string;
  render: (fields: UseFieldArrayReturn<TFields>["fields"]) => JSX.Element;
  renderItem: MapFn<
    UseFieldArrayReturn<TFields>["fields"][number],
    JSX.Element
  >;
}

export type { FieldArrayOverrideProps, FieldArrayProps };
