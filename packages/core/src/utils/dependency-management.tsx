import type {
  Condition,
  DependencyStructure,
  DependsOn,
  DependsOnSingle,
} from "@/types/dependency-management";
import type { PropsWithChildren } from "react";
import type { FieldValues, Path, PathValue } from "react-hook-form";

type RenderHoCProps<TFields extends FieldValues> = PropsWithChildren<{
  dependency: DependencyStructure<TFields>["visibility"];
}>;

const RenderHoC = <TFields extends FieldValues>({
  children,
  dependency,
}: RenderHoCProps<TFields>) => {
  const condition =
    dependency.length === 0 || conditionArrayCalculator(dependency);

  return condition ? children : null;
};

const conditionCalculator = (
  { condition, value }: Condition,
  currentValue: unknown
): boolean => {
  let result: boolean = false;

  switch (condition) {
    case "eq":
      result = value === currentValue;
      break;
    case "not-eq":
      result = value !== currentValue;
      break;
  }
  return result;
};

const conditionArrayCalculator = (
  list: Array<Condition & { current: unknown }>
) => {
  return list.every((dep) => conditionCalculator(dep, dep.current));
};

const pushDependency = <TFields extends FieldValues>(
  target: DependencyStructure<TFields>,
  dependsOn: DependsOnSingle<TFields, false>,
  value: PathValue<TFields, Path<TFields>> | undefined
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
    case "disable":
      target[dependsOn.type].push({ ...dependsOn, current: value });
      break;

    case "visibility":
      target[dependsOn.type].push({ ...dependsOn, current: value });
      break;
  }
};
const createDependencyStructure = <TFields extends FieldValues>(
  dependsOn: DependsOn<TFields>,
  value: readonly PathValue<TFields, Path<TFields>>[]
) => {
  const base: DependencyStructure<TFields> = {
    "bind-value": [],
    "def-props": [],
    disable: [],
    visibility: [],
  };

  if (Array.isArray(dependsOn)) {
    return dependsOn.reduce((acc, cur, index) => {
      pushDependency(acc, cur, value[index]);
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
  createDependencyStructure,
  RenderHoC,
};
