import type {
  Condition,
  DefineFnProps,
  DependsOn,
  DependsOnBase,
  FormBuilderConfig,
  HideDependency,
} from "@/types";
import type {
  ArrayPath,
  DeepPartial,
  DefaultValues,
  FieldArray,
  FieldValues,
} from "react-hook-form";

import { mergeName } from "./merge-names";
import { set } from "react-hook-form";
import { conditionArrayCalculator } from "./dependency-management";

type Dep<TFields extends FieldValues> = Condition &
  DependsOnBase<TFields> & { type: "hide" };

interface Item<TFields extends FieldValues> {
  dependsOn?: DependsOn<TFields>;
  name?: string;
  inputs?: ItemArray<TFields>;
  list?: ItemArray<TFields>;
  type: string;
  props?: unknown;
  variant?: "list" | "normal";
}
type ItemArray<TFields extends FieldValues> = Array<
  ((props?: DefineFnProps) => Item<TFields>) | Item<TFields>
>;
type FieldArrayValues<TFields extends FieldValues> = Record<
  ArrayPath<TFields>,
  FieldArray<TFields>
>;

interface ParseItemsOptions<TFields extends FieldValues> {
  prefix: string;
  parentDeps: Array<Dep<TFields>>;
  paths: Set<string>;
  dequeue: ItemArray<TFields>;
  result: FieldValues;
}

class DefaultValue<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> {
  private dequeue: Array<Item<TFields>>;
  private falseSet: Set<string>;
  private _paths: Set<string>;
  private config: TConfig;

  public result: DefaultValues<TFields>;
  public fieldArray: FieldArrayValues<TFields>;

  constructor(config: TConfig, list: ItemArray<TFields>) {
    this.config = config;
    this.dequeue = [];
    this.falseSet = new Set<string>();
    this._paths = new Set<string>();
    this.result = {} as DefaultValues<TFields>;
    this.fieldArray = {} as FieldArrayValues<TFields>;

    this.resovle(list);
  }

  private compact = <TValue>(value: TValue[]) =>
    Array.isArray(value) ? value.filter(Boolean) : [];

  private isKey = (value: string) => /^\w*$/.test(value);

  private isNullOrUndefined = (value: unknown): value is null | undefined =>
    value == null;

  private stringToPath = (input: string): string[] =>
    this.compact(input.replace(/["|']|\]/g, "").split(/\.|\[/));

  private parseFieldArray = (items: ItemArray<TFields>, path: string) => {
    const fieldArrayItem: FieldValues = {};

    this.parseItems(items, {
      paths: this._paths,
      prefix: "",
      dequeue: [],
      parentDeps: [],
      result: fieldArrayItem,
    });

    this.fieldArray[path as ArrayPath<TFields>] =
      fieldArrayItem as FieldArray<TFields>;
  };

  private parseItems = (
    items: ItemArray<TFields>,
    // TODO: pass result, dequeue, falseSet
    options: ParseItemsOptions<TFields> = {
      prefix: "",
      dequeue: [],
      parentDeps: [],
      paths: new Set(),
      result: this.result,
    }
  ) => {
    items.forEach((_item) => {
      const item = typeof _item === "function" ? _item() : _item;

      const name = mergeName(options.prefix || "", item.name || "");
      options.paths.add(name);

      const deps = (
        typeof item.dependsOn !== "undefined"
          ? Array.isArray(item.dependsOn)
            ? item.dependsOn
            : [item.dependsOn]
          : []
      )
        .filter((item) => item.type === "hide")
        .concat(options.parentDeps);

      if (deps.length > 0) {
        options.dequeue.push({ ...item, name, dependsOn: deps });
      } else {
        const value = this.config.input.defaultValues[item.type];

        if (typeof value !== "undefined") set(options.result, name, value);
      }

      let currentItems: ItemArray<TFields> = [];
      if (Array.isArray(item.inputs)) {
        currentItems = item.inputs;
      }
      if (Array.isArray(item.list)) {
        currentItems = item.list;
      }

      if (item.type === "list" || item.variant === "list") {
        set(options.result, name, []);
        this.parseFieldArray(currentItems, name);
      } else {
        this.parseItems(currentItems, {
          dequeue: options.dequeue,
          paths: options.paths,
          prefix: name,
          parentDeps: deps.length > 0 ? deps : [],
          result: options.result,
        });
      }
    });
  };

  public resovle = (list: ItemArray<TFields>) => {
    this.parseItems(list, {
      dequeue: this.dequeue,
      parentDeps: [],
      paths: this._paths,
      prefix: "",
      result: this.result,
    });

    while (this.dequeue.length > 0) {
      for (let i = 0, len = this.dequeue.length; i < len; i++) {
        const item = this.dequeue.shift();
        if (!item) continue;

        let flag = false;
        let isHidden = false;

        const deps = (
          Array.isArray(item.dependsOn) ? item.dependsOn : [item.dependsOn]
        )
          .filter((dep) => dep && this._paths.has(dep.path))
          .reduce<
            Array<
              DependsOnBase<TFields> & HideDependency & { current: unknown }
            >
          >((_deps, dep) => {
            if (dep && dep.type === "hide") {
              const currentValue = (
                this.isKey(dep.path) ? [dep.path] : this.stringToPath(dep.path)
              ).reduce((acc, key) => {
                if (this.isNullOrUndefined(acc)) return this.result;

                // check dep is not calculated yet
                if (!(key in acc) && !this.falseSet.has(dep.path)) {
                  flag = true;
                }
                // check dep is calculated and its value is false
                if (this.falseSet.has(dep.path)) isHidden = true;

                return acc[key as never];
              }, this.result);

              _deps.push({ ...dep, current: currentValue });
            }
            return _deps;
          }, []);

        if (!deps) continue;
        if (flag) {
          this.dequeue.push(item);
          continue;
        }

        if (!isHidden && !conditionArrayCalculator(deps)) {
          let value: unknown;
          if (
            item.props &&
            typeof item.props === "object" &&
            "defaultValue" in item.props
          ) {
            value = item.props.defaultValue;
          } else {
            value = this.config.input.defaultValues[item.type];
          }

          set(this.result, item.name || "", value);
        } else {
          this.falseSet.add(item.name || "");
        }
      }
    }
  };
}

export { DefaultValue };
