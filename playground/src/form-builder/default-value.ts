import type {
  DependsOnBase,
  FormBuilderConfig,
  GetInputsImpl,
  HideDependency,
  InputArray,
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

interface GetDefaultValuesProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> {
  config: TConfig;
  falseSet: Set<string>;
  list: InputArray<TConfig, TFields>;
  paths: Set<string>;
  prefix?: string;
}

function getDefaultValuesImpl<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
>({
  config,
  list,
  paths,
  prefix,
}: GetDefaultValuesProps<TConfig, TFields>): unknown {
  const result = {};

  const dequeue: Array<GetInputsImpl<TConfig, TFields>> = [];
  // all valid paths
  // paths those have true hidden dependency
  const falseSet = new Set<string>();

  // process items and separate based on dependency
  list.forEach((item) => {
    const resolvedItem = typeof item === "function" ? item() : item;

    const name = mergeName(prefix || "", resolvedItem.name);
    paths.add(name);

    if ("dependsOn" in resolvedItem && resolvedItem.dependsOn) {
      dequeue.push(resolvedItem);
    } else {
      const value = config.input.defaultValues[resolvedItem.type];

      if (typeof value !== "undefined") set(result, name, value) as never;
    }
  });

  while (dequeue.length > 0) {
    for (let i = 0, len = dequeue.length; i < len; i++) {
      const item = dequeue.shift();
      if (!item) continue;

      let flag = false;
      let isHidden = false;

      const deps = (
        Array.isArray(item.dependsOn) ? item.dependsOn : [item.dependsOn]
      )
        .filter((dep) => dep && dep.type === "hide" && paths.has(dep.path))
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

      const name = mergeName(prefix || "", item.name);

      if (!isHidden && !conditionArrayCalculator(deps)) {
        let value: unknown;
        if ("props" in item && "deafultValue" in item.props) {
          value = item.props.defaultValue;
        } else {
          value = config.input.defaultValues[item.type];
        }

        set(result, name, value);
      } else {
        falseSet.add(name);
      }
    }
  }

  return result;
}
/*
  value: unkown
  field array items: Map<ArrayPath<TFields>, unknown>
*/
function getDefaultValues<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
>({ config, list }: { config: TConfig; list: InputArray<TConfig, TFields> }) {
  // const dequeue: Array<
  //   | GetInputsImpl<TConfig, TFields>
  //   | GetCardsImpl<TConfig, TFields>
  //   | GetCardsImpl<TConfig, TFields, true>
  // > = [];
  const falseSet = new Set<string>();
  const paths = new Set<string>();
  // const result = {};

  // function parseItems(
  //   items:
  //     | InputArray<TConfig, TFields>
  //     | GetCardsImpl<TConfig, TFields>[]
  //     | AdvancedList<TConfig, TFields>,
  //   prefix?: string
  // ) {
  //   items.forEach((item) => {
  //     const resolvedItem = typeof item === "function" ? item() : item;

  //     const name = mergeName(prefix || "", resolvedItem.name || "");
  //     paths.add(name);

  //     if ("dependsOn" in resolvedItem && resolvedItem.dependsOn) {
  //       dequeue.push(resolvedItem);
  //     } else {
  //       const value = config.input.defaultValues[resolvedItem.type];

  //       if (typeof value !== "undefined") set(result, name, value) as never;
  //     }
  //   });
  // }

  // parseItems(list);

  // return {};
  return getDefaultValuesImpl({
    config,
    falseSet,
    list,
    paths,
    prefix: "",
  });
}

export { getDefaultValues, testItems };
