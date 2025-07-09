import type {
  Condition,
  DefineFnProps,
  DependsOn,
  DependsOnBase,
  FormBuilderConfig,
} from "@/types";
import type { DeepPartial, DefaultValues, FieldValues } from "react-hook-form";

import { mergeName } from "./merge-names";
import { set } from "react-hook-form";

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

class DefaultValue<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> {
  dequeue: Array<Item<TFields>>;
  falseSet: Set<string>;
  paths: Set<string>;
  result: DefaultValues<TFields>;
  config: TConfig;

  constructor(config: TConfig) {
    this.config = config;
    this.dequeue = [];
    this.falseSet = new Set<string>();
    this.paths = new Set<string>();
    this.result = {} as DefaultValues<TFields>;
  }

  private compact = <TValue>(value: TValue[]) =>
    Array.isArray(value) ? value.filter(Boolean) : [];

  private isKey = (value: string) => /^\w*$/.test(value);

  private isNullOrUndefined = (value: unknown): value is null | undefined =>
    value == null;

  private stringToPath = (input: string): string[] =>
    this.compact(input.replace(/["|']|\]/g, "").split(/\.|\[/));

  private parseItems = (
    items: ItemArray<TFields>,
    prefix?: string,
    parentDeps: Array<Dep<TFields>> = []
  ) => {
    items.forEach((_item) => {
      const item = typeof _item === "function" ? _item() : _item;

      const name = mergeName(prefix || "", item.name || "");
      this.paths.add(name);

      const deps = (
        typeof item.dependsOn !== "undefined"
          ? Array.isArray(item.dependsOn)
            ? item.dependsOn
            : [item.dependsOn]
          : []
      )
        .filter((item) => item.type === "hide")
        .concat(parentDeps);

      if (deps.length > 0) {
        this.dequeue.push({ ...item, name, dependsOn: deps });
      } else {
        const value = this.config.input.defaultValues[item.type];

        if (typeof value !== "undefined")
          set(this.result, name, value) as never;
      }

      if (Array.isArray(item.inputs)) {
        this.parseItems(item.inputs, name, deps.length > 0 ? deps : undefined);
      }
      if (Array.isArray(item.list)) {
        this.parseItems(item.list, name, deps.length > 0 ? deps : undefined);
      }
    });
  };
}

export { DefaultValue };
