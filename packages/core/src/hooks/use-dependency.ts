import type {
  DefaultItem,
  DependencyContextValue,
  DependencyStructure,
  DependencyType,
  DependsOn,
} from "@/types";
import type { FieldValues, Path } from "react-hook-form";

import {
  conditionArrayCalculator,
  createDependencyStructure,
  handleRenderDep,
  mergeName,
} from "@/utils";
import { useEffect, useMemo, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";

interface UseDependencyOptions {
  dependencyShouldReset?: boolean;
}

interface UseDependencyProps<
  TFields extends FieldValues,
  TItem extends DefaultItem<TFields>,
> {
  component: ((props?: { deps: never }) => TItem) | TItem;
  dependencyContext: DependencyContextValue;
  dependsOn: DependsOn<TFields>;
  name: string | undefined;
}

type UseDependencyReturn<
  TFields extends FieldValues,
  TItem extends DefaultItem<TFields>,
> = [null | TItem, DependencyStructure<TFields>];

const useDependency = <
  TFields extends FieldValues,
  TItem extends DefaultItem<TFields>,
>(
  {
    component,
    dependencyContext,
    dependsOn,
    name = "",
  }: UseDependencyProps<TFields, TItem>,
  options?: UseDependencyOptions,
): UseDependencyReturn<TFields, TItem> => {
  const formMethods = useFormContext<TFields>();
  const ref = useRef<Record<DependencyType, boolean | null>>({
    "bind-value": null,
    "def-props": null,
    disable: null,
    visibility: null,
  });

  // TODO: provide default value (it's will be undefined when defaultValue passed to Controller)
  const value = useWatch<TFields>({
    control: formMethods.control,
    name: Array.isArray(dependsOn)
      ? dependsOn.map((dep) => dep.path)
      : [dependsOn.path],
  });

  const dependencies = useMemo(() => {
    const dependencyStructure = createDependencyStructure<TFields>(
      dependsOn,
      value,
    );
    dependencyStructure.disable.push(...dependencyContext.disable);
    return dependencyStructure;
  }, [value, dependsOn, dependencyContext]);

  const resolvedComponent = useMemo(() => {
    if (typeof component === "function") {
      // TODO: move this function to dependency manager file as a helper function
      const resolvedDeps = dependencies["def-props"].reduce<
        Record<string, unknown>
      >(
        (acc, cur) => ({
          ...acc,
          [cur.id]: cur.current,
        }),
        {},
      );
      return component({ deps: resolvedDeps as never });
    }
    return component;
  }, [component, dependencies]);

  useEffect(() => {
    if (
      typeof resolvedComponent.dependencyShouldReset === "undefined"
        ? options?.dependencyShouldReset
        : resolvedComponent.dependencyShouldReset
    ) {
      const resolvedName = mergeName(name, resolvedComponent.name || "");

      const _visibility =
        dependencies.visibility.length === 0 ||
        conditionArrayCalculator(dependencies.visibility);

      const _disable =
        dependencies.disable.length > 0 &&
        conditionArrayCalculator(dependencies.disable);

      if (
        (typeof ref.current.visibility === "boolean" &&
          _visibility &&
          _visibility !== ref.current.visibility) ||
        (typeof ref.current.disable === "boolean" &&
          _disable &&
          _disable !== ref.current.disable) ||
        dependencies["bind-value"].length > 0 ||
        dependencies["def-props"].length > 0
      ) {
        formMethods.resetField(resolvedName as Path<TFields>);
      }
      ref.current.visibility = _visibility;
      ref.current.disable = _disable;
    }
  }, [
    dependencies,
    formMethods,
    name,
    options?.dependencyShouldReset,
    resolvedComponent,
    value,
  ]);

  return [
    handleRenderDep({
      children: resolvedComponent,
      dependency: dependencies["visibility"],
    }),
    dependencies,
  ];
};

export { useDependency };
