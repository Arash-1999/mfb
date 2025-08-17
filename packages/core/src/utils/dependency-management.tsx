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
  dependencies: Array<TDep>
): Record<string, unknown> => {
  return dependencies.reduce<Record<string, unknown>>(
    (acc, cur) => ({
      ...acc,
      [cur.id]: cur.current,
    }),
    {}
  );
};

const pushDependency = <TFields extends FieldValues, TExtraKey extends string>(
  target: DependencyDict<TFields, TExtraKey>,
  dependsOn: DependsOnSingle<TFields, TExtraKey, false>,
  value: number | PathValue<TFields, Path<TFields>> | undefined
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
  TFields extends FieldValues,
  TExtraKey extends string,
>(
  dependsOn: DependsOn<TFields, TExtraKey>,
  value: readonly PathValue<TFields, Path<TFields>>[],
  fieldArrayContext: FieldArrayContextValue
) => {
  const base: DependencyDict<TFields, TExtraKey> = {
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
        pushDependency<TFields, TExtraKey>(
          acc,
          {
            ...cur,
            value: fieldArrayContext.index,
          },
          fieldArrayContext.index === null ? undefined : fieldArrayContext.index
        );
      } else {
        pushDependency<TFields, TExtraKey>(acc, cur, value[valueIndex]);
        valueIndex += 1;
      }
      return acc;
    }, base);
  } else {
    pushDependency<TFields, TExtraKey>(base, dependsOn, value[0]);
  }
  return base;
};

export { convertDepsToObject, createDependencyDict };
