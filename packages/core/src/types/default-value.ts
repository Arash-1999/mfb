import type {
  Condition,
  DefineFnProps,
  DependsOn,
  DependsOnBase,
} from "@/types";
import type { ArrayPath, FieldArray, FieldValues } from "react-hook-form";

type Dep<TFields extends FieldValues> = Condition &
  DependsOnBase<TFields> & { type: "hide" };

type FieldArrayValues<TFields extends FieldValues> = Record<
  ArrayPath<TFields>,
  FieldArray<TFields>
>;
interface Item<TFields extends FieldValues> {
  dependsOn?: DependsOn<TFields>;
  inputs?: ItemArray<TFields>;
  list?:
    | Array<{
        list: ItemArray<TFields>;
        name?: string;
      }>
    | ItemArray<TFields>;
  name?: string;
  props?: unknown;
  type?: PropertyKey;
  variant?: "list" | "normal";
}
type ItemArray<TFields extends FieldValues> = Array<
  ((props?: DefineFnProps) => Item<TFields>) | Item<TFields>
>;

interface ParseItemsOptions<TFields extends FieldValues> {
  dequeue: ItemArray<TFields>;
  parentDeps: Array<Dep<TFields>>;
  paths: Set<string>;
  prefix: string;
  result: FieldValues;
}

export type { Dep, FieldArrayValues, Item, ItemArray, ParseItemsOptions };
