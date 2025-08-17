import type {
  Condition,
  DefineFnProps,
  DependsOn,
  DependsOnBase,
  FormBuilderConfig,
  GetExtraConditionKey,
} from "@/types";
import type { ArrayPath, FieldArray, FieldValues } from "react-hook-form";

type Dep<
  TFields extends FieldValues,
  TExtraKey extends string,
> = Condition<TExtraKey> & DependsOnBase<TFields> & { type: "hide" };

type FieldArrayValues<TFields extends FieldValues> = Record<
  ArrayPath<TFields>,
  FieldArray<TFields>
>;
interface Item<TConfig extends FormBuilderConfig, TFields extends FieldValues> {
  dependsOn?: DependsOn<TFields, GetExtraConditionKey<TConfig>>;
  inputs?: ItemArray<TConfig, TFields>;
  list?:
    | Array<{
        list: ItemArray<TConfig, TFields>;
        name?: string;
      }>
    | ItemArray<TConfig, TFields>;
  name?: string;
  props?: unknown;
  type?: PropertyKey;
  variant?: "list" | "normal";
}
type ItemArray<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = Array<
  ((props?: DefineFnProps) => Item<TConfig, TFields>) | Item<TConfig, TFields>
>;

interface ParseItemsOptions<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> {
  dequeue: ItemArray<TConfig, TFields>;
  parentDeps: Array<Dep<TFields, GetExtraConditionKey<TConfig>>>;
  paths: Set<string>;
  prefix: string;
  result: FieldValues;
}

export type { Dep, FieldArrayValues, Item, ItemArray, ParseItemsOptions };
