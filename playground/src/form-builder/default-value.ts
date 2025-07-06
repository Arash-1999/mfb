import type {
  Condition,
  DependsOn,
  DefineFnProps,
  DependsOnBase,
  FormBuilderConfig,
  HideDependency,
  InputArray,
  AdvancedList,
} from "@mfb/core";
import type { FieldValues } from "react-hook-form";

import { conditionArrayCalculator, mergeName } from "@mfb/core";
import { set } from "react-hook-form";

import type { Config } from "./index";

const isKey = (value: string) => /^\w*$/.test(value);
const compact = <TValue>(value: TValue[]) =>
  Array.isArray(value) ? value.filter(Boolean) : [];
const stringToPath = (input: string): string[] =>
  compact(input.replace(/["|']|\]/g, "").split(/\.|\[/));
const isNullOrUndefined = (value: unknown): value is null | undefined =>
  value == null;

interface TestForm {
  a: string;
  b: string;
  c: {
    d: string;
    e: {
      f: number;
      g: string;
      h: boolean;
    };
  };
}

interface TestForm2 {
  size: string | { [key in "xs" | "md"]: string };
  is_size_responsive: string;
}
const testForm2: InputArray<Config, TestForm2> = [
  {
    name: "is_size_responsive",
    type: "text",
    props: {
      defaultValue: "fuck",
    },
  },
  {
    dependsOn: {
      path: "is_size_responsive",
      condition: "eq",
      value: "fuck",
      id: "is_size_responsive",
      type: "hide",
    },
    name: "size",
    type: "text",
    props: {},
  },
  {
    dependsOn: {
      path: "is_size_responsive",
      condition: "not-eq",
      value: "fuck",
      id: "is_size_responsive",
      type: "hide",
    },
    name: "size.xs",
    type: "text",
    props: {},
  },
  {
    dependsOn: {
      path: "is_size_responsive",
      condition: "not-eq",
      value: "fuck",
      id: "is_size_responsive",
      type: "hide",
    },
    name: "size.md",
    type: "text",
    props: {},
  },
];

const testItems: InputArray<Config, TestForm> = [
  {
    name: "a",
    props: {},
    type: "text",
  },
  {
    name: "b",
    props: {},
    type: "text",
  },
  {
    name: "c.d",
    props: {},
    type: "text",
  },
  {
    dependsOn: {
      condition: "eq",
      id: "c.e.g",
      path: "c.e.g",
      type: "hide",
      value: "hide",
    },
    name: "c.e.f",
    props: {},
    type: "text",
  },
  {
    dependsOn: {
      condition: "eq",
      id: "c.e.h",
      path: "c.e.h",
      type: "hide",
      value: "",
    },
    name: "c.e.g",
    props: {},
    type: "text",
  },
  {
    name: "c.e.h",
    props: {},
    type: "text",
  },
];

const testAdvancedList: AdvancedList<Config, TestForm> = [
  {
    mode: "input",
    name: "a",
    props: {},
    type: "text",
  },
  {
    mode: "input",
    name: "b",
    props: {},
    type: "text",
  },
  {
    isGroup: false,
    name: "c",
    list: [
      {
        mode: "input",
        name: "d",
        type: "text",
        props: {},
      },
      {
        dependsOn: {
          type: "hide",
          path: "a",
          condition: "not-eq",
          id: "a",
          value: "",
        },
        mode: "card",
        name: "e",
        isGroup: false,
        list: [
          {
            mode: "input",
            name: "f",
            type: "text",
            props: {},
          },
          {
            mode: "input",
            name: "g",
            type: "text",
            props: {},
          },
          {
            mode: "input",
            name: "h",
            type: "text",
            props: {},
          },
        ],
        header: "e",
        type: "paper",
      },
    ],
    header: "c",
    type: "paper",
    mode: "card",
  },
];
/*
  value: unkown
  field array items: Map<ArrayPath<TFields>, unknown>
*/
interface Item<TFields extends FieldValues> {
  dependsOn?: DependsOn<TFields>;
  name?: string;
  inputs?: ItemArray<TFields>;
  list?: ItemArray<TFields>;
  type: string;
  props?: unknown;
}
type ItemArray<TFields extends FieldValues> = Array<
  Item<TFields> | ((props?: DefineFnProps) => Item<TFields>)
>;
type Dep<TFields extends FieldValues> = DependsOnBase<TFields> &
  Condition & { type: "hide" };

function getDefaultValues<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TList extends ItemArray<TFields> = ItemArray<TFields>,
>({ config, list }: { config: TConfig; list: TList }) {
  const dequeue: Array<Item<TFields>> = [];
  const falseSet = new Set<string>();
  const paths = new Set<string>();
  const result = {};

  function parseItems(
    items: ItemArray<TFields>,
    prefix?: string,
    parentDeps: Array<Dep<TFields>> = [],
  ) {
    items.forEach((_item) => {
      const item = typeof _item === "function" ? _item() : _item;

      const name = mergeName(prefix || "", item.name || "");
      paths.add(name);

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
        dequeue.push({ ...item, name, dependsOn: deps });
      } else {
        const value = config.input.defaultValues[item.type];

        if (typeof value !== "undefined") set(result, name, value) as never;
      }

      if (Array.isArray(item.inputs)) {
        parseItems(item.inputs, name, deps.length > 0 ? deps : undefined);
      }
      if (Array.isArray(item.list)) {
        parseItems(item.list, name, deps.length > 0 ? deps : undefined);
      }
    });
  }

  parseItems(list);

  while (dequeue.length > 0) {
    for (let i = 0, len = dequeue.length; i < len; i++) {
      const item = dequeue.shift();
      if (!item) continue;

      let flag = false;
      let isHidden = false;

      const deps = (
        Array.isArray(item.dependsOn) ? item.dependsOn : [item.dependsOn]
      )
        .filter((dep) => dep && paths.has(dep.path))
        .reduce<
          Array<DependsOnBase<TFields> & HideDependency & { current: unknown }>
        >((_deps, dep) => {
          if (dep && dep.type === "hide") {
            const currentValue = (
              isKey(dep.path) ? [dep.path] : stringToPath(dep.path)
            ).reduce((acc, key) => {
              if (isNullOrUndefined(acc)) return result;

              // check dep is not calculated yet
              if (!(key in acc) && !falseSet.has(dep.path)) {
                flag = true;
              }
              // check dep is calculated and its value is false
              if (falseSet.has(dep.path)) isHidden = true;

              return acc[key as never];
            }, result);

            _deps.push({ ...dep, current: currentValue });
          }
          return _deps;
        }, []);

      if (!deps) continue;
      if (flag) {
        dequeue.push(item);
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
          value = config.input.defaultValues[item.type];
        }

        set(result, item.name || "", value);
      } else {
        falseSet.add(item.name || "");
      }
    }
  }

  return result;
}

export { getDefaultValues, testItems, testForm2, testAdvancedList };
export type { TestForm, TestForm2 };
