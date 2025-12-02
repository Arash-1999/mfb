import type {
  Condition,
  DependencyStructure,
  DependsOn,
  DependsOnSingle,
} from "@/types/dependency-management";
import type { PropsWithChildren } from "react";
import type { FieldValues, Path, PathValue } from "react-hook-form";

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

const handleRenderDep = <TFields extends FieldValues, TItem>({
  children,
  dependency,
}: {
  children: TItem;
  dependency: DependencyStructure<TFields>["visibility"];
}): null | TItem => {
  const condition =
    dependency.length === 0 || conditionArrayCalculator(dependency);
  return condition ? children : null;
};

// TODO: check usage and remove
type RenderHoCProps<TFields extends FieldValues> = PropsWithChildren<{
  dependency: DependencyStructure<TFields>["visibility"];
}>;

// TODO: check usage and remove
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
  currentValue: unknown,
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
  list: Array<Condition & { current: unknown }>,
) => {
  return list.every((dep) => conditionCalculator(dep, dep.current));
};

const pushDependency = <TFields extends FieldValues>(
  target: DependencyStructure<TFields>,
  dependsOn: DependsOnSingle<TFields, false>,
  value: PathValue<TFields, Path<TFields>> | undefined,
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
  value: readonly PathValue<TFields, Path<TFields>>[],
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
  convertDepsToObject,
  createDependencyStructure,
  handleRenderDep,
  RenderHoC,
};
