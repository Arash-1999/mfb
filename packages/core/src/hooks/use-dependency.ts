import type { DependencyContextValue } from "@/context";
import type {
  DefaultItem,
  DependencyStructure,
  DependencyType,
  DependsOn,
} from "@/types";
import type { FieldValues, Path } from "react-hook-form";

import { reFieldArrayValue } from "@/constants";
import { useFieldArrayContext } from "@/context";
import { useConditionCalculator } from "@/hooks";
import { convertDepsToObject, createDependencyDict, mergeName } from "@/utils";
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
  options?: UseDependencyOptions
): UseDependencyReturn<TFields, TItem> => {
  const fieldArrayContext = useFieldArrayContext();
  const { reduceCalc } = useConditionCalculator();
  const formMethods = useFormContext<TFields>();
  const ref = useRef<Record<DependencyType, boolean | null>>({
    "bind-value": null,
    "def-props": null,
    disable: null,
    hide: null,
  });

  // TODO: provide default value (it's will be undefined when defaultValue passed to Controller)
  const value = useWatch<TFields>({
    control: formMethods.control,
    name: (Array.isArray(dependsOn) ? dependsOn : [dependsOn])
      .filter((dep) =>
        dep.type === "disable" || dep.type === "hide"
          ? typeof dep.value === "string"
            ? !reFieldArrayValue.test(dep.value)
            : true
          : true
      )
      .map((dep) => {
        return dep.path;
      }),
  });

  const dependencies = useMemo<DependencyStructure<TFields>>(() => {
    const {
      disable: disableDict,
      hide: hideDict,
      ...dependencyDict
    } = createDependencyDict<TFields>(dependsOn, value, fieldArrayContext);

    return {
      ...dependencyDict,
      disable: dependencyContext.disable || reduceCalc(disableDict),
      hide: reduceCalc(hideDict),
    };
  }, [fieldArrayContext, reduceCalc, value, dependsOn, dependencyContext]);

  const resolvedComponent = useMemo(() => {
    if (typeof component === "function") {
      const resolvedDeps = convertDepsToObject(dependencies["def-props"]);
      return component({ deps: resolvedDeps as never });
    }
    return component;
  }, [component, dependencies]);

  useEffect(() => {
    // NOTE: detect conditon diff between rerenders to reset field
    if (
      typeof resolvedComponent.dependencyShouldReset === "undefined"
        ? options?.dependencyShouldReset
        : resolvedComponent.dependencyShouldReset
    ) {
      const resolvedName = mergeName(name, resolvedComponent.name || "");

      const _hide = dependencies.hide;
      const _disable = dependencies.disable;

      if (
        (typeof ref.current.hide === "boolean" &&
          _hide &&
          _hide !== ref.current.hide) ||
        (typeof ref.current.disable === "boolean" &&
          _disable &&
          _disable !== ref.current.disable) ||
        dependencies["bind-value"].length > 0 ||
        dependencies["def-props"].length > 0
      ) {
        formMethods.resetField(resolvedName as Path<TFields>);
      }
      ref.current.hide = _hide;
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

  return [dependencies.hide ? null : resolvedComponent, dependencies];
};

export { useDependency };
