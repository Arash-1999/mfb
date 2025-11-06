import type { FieldValues, Resolver } from "react-hook-form";

import type { ItemArray } from "../common";

interface Validator {
  resolve: <TFields extends FieldValues>(
    items: ItemArray<TFields>,
  ) => Resolver<TFields>;
}

export type { Validator };
