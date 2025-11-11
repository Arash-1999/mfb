import type { FieldValues, Resolver } from "react-hook-form";

import type { ItemArray } from "../common";

interface Validator<TFormats extends string> {
  resolve: <TFields extends FieldValues>(
    items: ItemArray<TFields, TFormats>,
  ) => Resolver<TFields>;
}

export type { Validator };
