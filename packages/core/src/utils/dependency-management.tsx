import type {
  DependencyDict,
  DependsOn,
  DependsOnSingle,
  FieldArrayContextValue,
  FormBuilderConfig,
} from "@mfb/types";
import type { FieldValues, Path, PathValue } from "react-hook-form";

import { reFieldArrayValue } from "@/constants";

interface DefaultDep {
  current: unknown;
  id: string;
}
const convertDepsToObject = <TDep extends DefaultDep = DefaultDep>(
  dependencies: Array<TDep>,
): Record<string, unknown> => {
  return dependencies.reduce<Record<string, unknown>>(
    (acc, cur) => ({
      ...acc,
      [cur.id]: cur.current,
    }),
    {},
  );
};

const pushDependency = <
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
>(
  target: DependencyDict<TConfig, TFields>,
  dependsOn: DependsOnSingle<TConfig, TFields, false>,
  value: number | PathValue<TFields, Path<TFields>> | undefined,
) => {
  switch (dependsOn.type) {
    case "bind-value": {
      target[dependsOn.type].push({ ...dependsOn, current: value });
      break;
    }
    case "def-props": {
      target[dependsOn.type].push({ ...dependsOn, current: value });
      break;
    }
    case "disable": {
      target[dependsOn.type].push({ ...dependsOn, current: value });
      break;
    }
    case "hide": {
      target[dependsOn.type].push({ ...dependsOn, current: value });
      break;
    }
  }
};
const createDependencyDict = <
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
>(
  dependsOn: DependsOn<TConfig, TFields>,
  value: readonly PathValue<TFields, Path<TFields>>[],
  fieldArrayContext: FieldArrayContextValue,
) => {
  const base: DependencyDict<TConfig, TFields> = {
    "bind-value": [],
    "def-props": [],
    disable: [],
    hide: [],
  };

  if (Array.isArray(dependsOn)) {
    let valueIndex = 0;

    return dependsOn.reduce((acc, cur) => {
      if (
        (cur.type === "disable" || cur.type === "hide") &&
        typeof cur.value === "string" &&
        reFieldArrayValue.test(cur.value)
      ) {
        // NOTE: value -> index, currentValue -> length
        pushDependency(
          acc,
          {
            ...cur,
            value: fieldArrayContext.index,
          },
          fieldArrayContext.index === null
            ? undefined
            : fieldArrayContext.index,
        );
      } else {
        pushDependency(acc, cur, value[valueIndex]);
        valueIndex += 1;
      }
      return acc;
    }, base);
  } else {
    pushDependency(base, dependsOn, value[0]);
  }
  return base;
};

export { convertDepsToObject, createDependencyDict };
