import type { FieldValues, Resolver } from "react-hook-form";

import type { ItemArray } from "../common";
import type { FormBuilderConfig } from "../config";

interface Validator<TFormats extends string> {
  resolve: <TConfig extends FormBuilderConfig, TFields extends FieldValues>(
    items: ItemArray<TConfig, TFields, TFormats>,
  ) => Resolver<TFields>;
}

export type { Validator };
