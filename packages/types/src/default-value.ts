import type { ArrayPath, FieldArray, FieldValues } from "react-hook-form";

import type { ItemArray } from "./common";
import type { Condition } from "./condition";
import type { DependsOnBase } from "./dependency-management";

type Dep<TFields extends FieldValues> = Condition &
  DependsOnBase<TFields> & { type: "hide" };

type FieldArrayValues<TFields extends FieldValues> = Record<
  ArrayPath<TFields>,
  FieldArray<TFields>
>;

interface ParseItemsOptions<TFields extends FieldValues> {
  dequeue: ItemArray<TFields>;
  parentDeps: Array<Dep<TFields>>;
  paths: Set<string>;
  prefix: string;
  result: FieldValues;
}

export type { Dep, FieldArrayValues, ParseItemsOptions };
