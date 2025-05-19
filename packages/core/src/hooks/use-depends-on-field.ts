import type { Dependency, DependsOn } from "@/types";
import type { FieldValues } from "react-hook-form";

import { useMemo } from "react";

interface DefaultItem<TFields extends FieldValues> extends Dependency<TFields> {
  name?: string;
}

interface UseDependsOnFieldProps<
  TFields extends FieldValues,
  TItem extends DefaultItem<TFields>,
> {
  component: ((props?: { deps: never }) => TItem) | TItem;
  deps?: DependsOn<TFields>;
}

const useDependsOnField = <
  TFields extends FieldValues,
  TItem extends DefaultItem<TFields>,
>({
  component,
  deps,
}: UseDependsOnFieldProps<TFields, TItem>) => {
  return useMemo(() => {
    let { dependsOn } =
      typeof component === "function" ? component() : component;
    dependsOn = dependsOn
      ? Array.isArray(dependsOn)
        ? dependsOn
        : [dependsOn]
      : [];
    const resolvedDeps = deps ? (Array.isArray(deps) ? deps : [deps]) : [];

    return [...resolvedDeps, ...dependsOn];
  }, [component, deps]);
};

export { useDependsOnField };
