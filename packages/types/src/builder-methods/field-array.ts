import type { JSX } from "react";
import type { FieldValues, UseFieldArrayReturn } from "react-hook-form";

import type { FieldArrayValues } from "../default-value";

interface FieldArrayOverrideProps<
  TFields extends FieldValues,
  TFormId extends string = string,
> extends FieldArrayProps<TFields> {
  id: TFormId;
}

interface FieldArrayProps<TFields extends FieldValues> {
  disabled: boolean | undefined;
  fieldArray: FieldArrayValues<TFields>;
  // TODO: use ArrayPath generic type instead of string
  name: string;
  render: (fields: UseFieldArrayReturn<TFields>["fields"]) => JSX.Element;
}

export type { FieldArrayOverrideProps, FieldArrayProps };
