import type {
  CalcItem,
  Condition,
  DefaultItem,
  DependencyManagerProps,
  DependencyStructure,
  DependencyType,
  FormBuilderConfig,
  FormBuilderOverrides,
  GetExtraConditions,
  UseDependencyProps,
  UseDependencyReturn,
  UseDependsOnFieldProps,
} from "@mfb/types";
import type { FieldValues, Path } from "react-hook-form";

import { reFieldArrayValue } from "@/constants";
import { defaultConditions } from "@/constants/conditions";
import { useFieldArrayContext, useMfbItemContext } from "@/context";
import { MfbItemProvider } from "@/providers";
import { convertDepsToObject, createDependencyDict, mergeName } from "@/utils";
import { deepEqual, isNullOrUndefined, isObject } from "@mfb/utils";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { Configuration } from "./configuration";

class DependencyManagement<
  TConfig extends FormBuilderConfig,
  TFormId extends string,
> extends Configuration<TConfig, TFormId> {
  constructor(config: TConfig, overrides?: FormBuilderOverrides) {
    super(config, overrides);
  }

  protected conditionCalculator = (
    { condition, value }: Condition<GetExtraConditions<TConfig>>,
    currentValue: unknown,
  ): boolean => {
    // NOTE: in field array comparisions: value -> index, currentValue -> length
    let result: boolean = false;

    if (!isNullOrUndefined(this.options.extraConditions[condition])) {
      result = this.options.extraConditions[condition](value, currentValue);
    } else if (!isNullOrUndefined(defaultConditions[condition])) {
      result = defaultConditions[condition](value, currentValue);
    }

    return result;
  };

  protected useConditionCalculator = () => {
    const calc = useCallback((item: CalcItem<TConfig>) => {
      return this.conditionCalculator(item, item.current);
    }, []);

    const reduceCalc = useCallback(
      (list: Array<CalcItem<TConfig>>) => {
        return list.reduce<boolean>((acc, cur) => {
          return acc || calc(cur);
        }, false);
      },
      [calc],
    );

    return {
      calc,
      reduceCalc,
    };
  };

  protected useDependency = <
    TFields extends FieldValues,
    TItem extends DefaultItem<TConfig, TFields>,
  >({
    component,
    dependencyContext,
    dependsOn,
    name = "",
  }: UseDependencyProps<TConfig, TFields, TItem>): UseDependencyReturn<
    TConfig,
    TFields,
    TItem
  > => {
    const { options } = this;
    const fieldArrayContext = useFieldArrayContext();
    const { reduceCalc } = this.useConditionCalculator();
    const formMethods = useFormContext<TFields>();
    const ref = useRef<Record<DependencyType, boolean | null | FieldValues>>({
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
            : true,
        )
        .map((dep) => {
          return dep.path;
        }),
    });

    const dependencies = useMemo<DependencyStructure<TConfig, TFields>>(() => {
      const {
        disable: disableDict,
        hide: hideDict,
        ...dependencyDict
      } = createDependencyDict<TConfig, TFields>(
        dependsOn,
        value,
        fieldArrayContext,
      );

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
      const resolvedName = mergeName(name, resolvedComponent.name || "");
      // NOTE: detect conditon diff between rerenders to reset field
      if (
        (isNullOrUndefined(resolvedComponent.dependencyShouldReset)
          ? this.options?.dependencyShouldReset
          : resolvedComponent.dependencyShouldReset) &&
        resolvedName &&
        formMethods.getFieldState(resolvedName as Path<TFields>)?.isDirty &&
        !isNullOrUndefined(resolvedComponent.dependsOn)
      ) {
        const _hide = dependencies.hide;
        const _disable = dependencies.disable;

        if (
          (typeof ref.current.hide === "boolean" &&
            _hide &&
            _hide !== ref.current.hide) ||
          (typeof ref.current.disable === "boolean" &&
            _disable &&
            _disable !== ref.current.disable) ||
          ((isObject(ref.current["bind-value"]) ||
            Array.isArray(ref.current["bind-value"])) &&
            !deepEqual(
              dependencies["bind-value"],
              ref.current["bind-value"],
            )) ||
          ((isObject(ref.current["def-props"]) ||
            Array.isArray(ref.current["def-props"])) &&
            !deepEqual(dependencies["def-props"], ref.current["def-props"]))
        ) {
          formMethods.resetField(resolvedName as Path<TFields>);
        }
        ref.current.hide = _hide;
        ref.current.disable = _disable;
        ref.current["bind-value"] = dependencies["bind-value"];
        ref.current["def-props"] = dependencies["def-props"];
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

  protected useDependsOnField = <
    TFields extends FieldValues,
    TItem extends DefaultItem<TConfig, TFields>,
  >({
    component,
    deps,
  }: UseDependsOnFieldProps<TConfig, TFields, TItem>) => {
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

  protected DependencyManager = <
    TFields extends FieldValues,
    TItem extends DefaultItem<TConfig, TFields>,
  >({
    component,
    getItemInfo,
    index,
    name,
    render,
    withGrid,
  }: DependencyManagerProps<TConfig, TFields, TItem>) => {
    const {
      layout: { "grid-item": GridItem },
    } = this.config;
    const { deps: parentDeps } = useMfbItemContext();
    const formMethods = useFormContext<TFields>();
    const dependency = this.useDependsOnField<TFields, TItem>({
      component,
    });

    const [resolvedComponent, dependencies] = this.useDependency<
      TFields,
      TItem
    >({
      component,
      dependencyContext: parentDeps,
      dependsOn: dependency,
      name,
    });

    if (resolvedComponent === null) return null;

    const renderedComponent = render(resolvedComponent, {
      dependsOn: dependencies,
      formMethods,
      index,
      name,
    });

    const children =
      withGrid || "gridProps" in resolvedComponent ? (
        <GridItem {...resolvedComponent.gridProps}>
          {renderedComponent}
        </GridItem>
      ) : (
        renderedComponent
      );

    return (
      <MfbItemProvider<TConfig, TFields, TItem>
        disable={dependencies.disable}
        getItemInfo={getItemInfo}
        index={index}
        item={resolvedComponent}
      >
        {children}
      </MfbItemProvider>
    );
  };
}

export { DependencyManagement };
