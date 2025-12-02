import type {
  DefaultItem,
  DependencyContextValue,
  DependencyStructure,
  DependsOn,
} from "@/types";
import type { FieldValues } from "react-hook-form";

import { createDependencyStructure, handleRenderDep } from "@/utils";
import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";

interface UseDependencyProps<
  TFields extends FieldValues,
  TItem extends DefaultItem<TFields>,
> {
  component: ((props?: { deps: never }) => TItem) | TItem;
  dependsOn: DependsOn<TFields>;
  dependencyContext: DependencyContextValue;
}

type UseDependencyReturn<
  TFields extends FieldValues,
  TItem extends DefaultItem<TFields>,
> = [null | TItem, DependencyStructure<TFields>];

const useDependency = <
  TFields extends FieldValues,
  TItem extends DefaultItem<TFields>,
>({
  component,
  dependsOn,
  dependencyContext,
}: UseDependencyProps<TFields, TItem>): UseDependencyReturn<TFields, TItem> => {
  const formMethods = useFormContext<TFields>();

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
    if (component.name === "card-1.akbar") {
      console.log("watch, ", "card-1.akbar", value);
    }
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

  return [
    handleRenderDep({
      children: resolvedComponent,
      dependency: dependencies["visibility"],
    }),
    dependencies,
  ];
};

export { useDependency };
