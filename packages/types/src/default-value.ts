import type { ArrayPath, FieldArray, FieldValues } from "react-hook-form";

import type { ItemArray } from "./common";
import type { Condition } from "./condition";
import type { FormBuilderConfig } from "./config";
import type { DependsOnBase } from "./dependency-management";
import type { GetExtraConditions } from "./utils";

type Dep<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = Condition<GetExtraConditions<TConfig>> &
  DependsOnBase<TFields> & { type: "hide" };

type FieldArrayValues<TFields extends FieldValues> = Record<
  ArrayPath<TFields>,
  FieldArray<TFields>
>;

interface ParseItemsOptions<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> {
  dequeue: ItemArray<TConfig, TFields>;
  parentDeps: Array<Dep<TConfig, TFields>>;
  paths: Set<string>;
  prefix: string;
  result: FieldValues;
}

export type { Dep, FieldArrayValues, ParseItemsOptions };
