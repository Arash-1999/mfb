import type {
  Condition,
  DependsOnBase,
  FieldArrayValues,
  FormBuilderConfig,
  GetExtraConditions,
  HideDependency,
  Item,
  ItemArray,
  ParseItemsOptions,
} from "@mfb/types";
import type {
  ArrayPath,
  DefaultValues,
  FieldArray,
  FieldValues,
} from "react-hook-form";

import { compact, isKey, isNullOrUndefined } from "@mfb/utils";
import { set } from "react-hook-form";

import { mergeName } from "./merge-names";

class DefaultValue<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> {
  public fieldArray: FieldArrayValues<TFields>;
  public result: DefaultValues<TFields>;

  private _paths: Set<string>;
  private conditionCalculator: (
    { condition, value }: Condition<GetExtraConditions<TConfig>>,
    currentValue: unknown,
  ) => boolean;
  private config: TConfig;
  private dequeue: Array<Item<TConfig, TFields>>;
  private falseSet: Set<string>;

  constructor(
    config: TConfig,
    list: ItemArray<TConfig, TFields>,
    conditionCalculator: (
      { condition, value }: Condition<GetExtraConditions<TConfig>>,
      currentValue: unknown,
    ) => boolean,
  ) {
    this.config = config;
    this.dequeue = [];
    this.falseSet = new Set<string>();
    this._paths = new Set<string>();
    this.result = {} as DefaultValues<TFields>;
    this.fieldArray = {} as FieldArrayValues<TFields>;
    this.conditionCalculator = conditionCalculator;

    this.resovle(list);
  }

  conditionArrayCalculator = (
    list: Array<Condition<GetExtraConditions<TConfig>> & { current: unknown }>,
  ) => {
    return list.every((dep) => this.conditionCalculator(dep, dep.current));
  };

  private parseItems = (
    items: ItemArray<TConfig, TFields>,
    options: ParseItemsOptions<TConfig, TFields> = {
      dequeue: [],
      parentDeps: [],
      paths: new Set(),
      prefix: "",
      result: this.result,
    },
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
        options.dequeue.push({ ...item, dependsOn: deps, name });
      } else {
        if ("type" in item && typeof item.type !== "undefined") {
          const value = this.config.input.defaultValues[item.type];

          if (typeof value !== "undefined") set(options.result, name, value);
        }
      }

      let currentItems: ItemArray<TConfig, TFields> = [];
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
          parentDeps: deps.length > 0 ? deps : [],
          paths: options.paths,
          prefix: name,
          result: options.result,
        });
      }
    });
  };

  public resovle = (list: ItemArray<TConfig, TFields>) => {
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
              DependsOnBase<TFields> &
                HideDependency<GetExtraConditions<TConfig>> & {
                  current: unknown;
                }
            >
          >((_deps, dep) => {
            if (dep && dep.type === "hide") {
              const currentValue = (
                isKey(dep.path) ? [dep.path] : this.stringToPath(dep.path)
              ).reduce((acc, key) => {
                if (isNullOrUndefined(acc)) return this.result;

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

        if (!isHidden && !this.conditionArrayCalculator(deps)) {
          let value: unknown;
          if (
            item.props &&
            typeof item.props === "object" &&
            "defaultValue" in item.props
          ) {
            value = item.props.defaultValue;
          } else {
            if ("type" in item && typeof item.type !== "undefined") {
              value = this.config.input.defaultValues[item.type];
            }
          }

          set(this.result, item.name || "", value);
        } else {
          this.falseSet.add(item.name || "");
        }
      }
    }
  };

  private parseFieldArray = (
    items: ItemArray<TConfig, TFields>,
    path: string,
  ) => {
    const fieldArrayItem: FieldValues = {};

    this.parseItems(items, {
      dequeue: [],
      parentDeps: [],
      paths: this._paths,
      prefix: "",
      result: fieldArrayItem,
    });

    this.fieldArray[path as ArrayPath<TFields>] =
      fieldArrayItem as FieldArray<TFields>;
  };

  private stringToPath = (input: string): string[] =>
    compact(input.replace(/["|']|\]/g, "").split(/\.|\[/));
}

export { DefaultValue };
