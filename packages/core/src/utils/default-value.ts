import type {
  Condition,
  DefineFnProps,
  DependsOn,
  DependsOnBase,
} from "@/types";
import type { DefaultValues, FieldValues } from "react-hook-form";

type Dep<TFields extends FieldValues> = Condition &
  DependsOnBase<TFields> & { type: "hide" };

interface Item<TFields extends FieldValues> {
  dependsOn?: DependsOn<TFields>;
  inputs?: ItemArray<TFields>;
  list?: ItemArray<TFields>;
  name?: string;
  props?: unknown;
  type: string;
}
type ItemArray<TFields extends FieldValues> = Array<
  ((props?: DefineFnProps) => Item<TFields>) | Item<TFields>
>;

class DefaultValue<TFields extends FieldValues> {
  dequeue: Array<Item<TFields>>;
  falseSet: Set<string>;
  paths: Set<string>;
  result: DefaultValues<TFields>;

  constructor() {
    this.dequeue = [];
    this.falseSet = new Set<string>();
    this.paths = new Set<string>();
    this.result = {};
  }

  private compact = <TValue>(value: TValue[]) =>
    Array.isArray(value) ? value.filter(Boolean) : [];

  private isKey = (value: string) => /^\w*$/.test(value);

  private isNullOrUndefined = (value: unknown): value is null | undefined =>
    value == null;

  private stringToPath = (input: string): string[] =>
    this.compact(input.replace(/["|']|\]/g, "").split(/\.|\[/));
}

export { DefaultValue };
