import type { FieldArrayContextValue } from "@/context";
import type {
  Condition,
  DependencyDict,
  DependsOn,
  DependsOnSingle,
} from "@/types/dependency-management";
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

const conditionCalculator = (
  { condition, value }: Condition,
  currentValue: unknown,
): boolean => {
  // NOTE: in field array comparisions: value -> index, currentValue -> length
  let result: boolean = false;

  switch (condition) {
    case "eq":
      result = value === currentValue;
      break;
    case "is-first-index":
      result = value === 0;
      break;
    case "is-last-index":
      if (typeof currentValue === "number") result = value === currentValue - 1;
      break;
    case "not-eq":
      result = value !== currentValue;
      break;
    case "not-first-index":
      result = value !== 0;
      break;
    case "not-last-index":
      if (typeof currentValue === "number") result = value !== currentValue - 1;
      break;
  }
  return result;
};

const conditionArrayCalculator = (
  list: Array<Condition & { current: unknown }>,
) => {
  return list.every((dep) => conditionCalculator(dep, dep.current));
};

const pushDependency = <TFields extends FieldValues>(
  target: DependencyDict<TFields>,
  dependsOn: DependsOnSingle<TFields, false>,
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
    case "visibility": {
      target[dependsOn.type].push({ ...dependsOn, current: value });
      break;
    }
  }
};
const createDependencyDict = <TFields extends FieldValues>(
  dependsOn: DependsOn<TFields>,
  value: readonly PathValue<TFields, Path<TFields>>[],
  fieldArrayContext: FieldArrayContextValue,
) => {
  const base: DependencyDict<TFields> = {
    "bind-value": [],
    "def-props": [],
    disable: [],
    visibility: [],
  };

  if (Array.isArray(dependsOn)) {
    let valueIndex = 0;

    return dependsOn.reduce((acc, cur) => {
      if (
        (cur.type === "disable" || cur.type === "visibility") &&
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

export {
  conditionArrayCalculator,
  conditionCalculator,
  convertDepsToObject,
  createDependencyDict,
};
