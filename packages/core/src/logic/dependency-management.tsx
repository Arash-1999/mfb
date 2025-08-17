import type { ParentDeps } from "@/context";
import type {
  Condition,
  DefaultItem,
  DependencyManagerProps,
  DependencyStructure,
  DependencyType,
  DependsOn,
  FormBuilderConfig,
  FormBuilderOptions,
  FormBuilderOverrides,
  GetExtraConditionKey,
  ItemArray,
} from "@/types";
import type { FieldValues, Path } from "react-hook-form";

import { useFieldArrayContext, useMfbItemContext } from "@/context";
import { MfbItemProvider } from "@/providers";
import { useFormContext, useWatch } from "react-hook-form";
import { useCallback, useEffect, useMemo, useRef } from "react";

import { Configuration } from "./configuration";
import { reFieldArrayValue } from "@/constants";
import {
  convertDepsToObject,
  createDependencyDict,
  DefaultValue,
  mergeName,
} from "@/utils";

interface CalcItem<TConfig extends FormBuilderConfig>
  extends Condition<GetExtraConditionKey<TConfig>> {
  current: unknown;
}

interface UseDependencyOptions {
  dependencyShouldReset?: boolean;
}

interface UseDependencyProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TItem extends DefaultItem<TConfig, TFields>,
> {
  component: ((props?: { deps: never }) => TItem) | TItem;
  dependencyContext: ParentDeps;
  dependsOn: DependsOn<TFields, GetExtraConditionKey<TConfig>>;
  name: string | undefined;
}

type UseDependencyReturn<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TItem extends DefaultItem<TConfig, TFields>,
> = [null | TItem, DependencyStructure<TFields, GetExtraConditionKey<TConfig>>];

interface UseDependsOnFieldProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TItem extends DefaultItem<TConfig, TFields>,
> {
  component: ((props?: { deps: never }) => TItem) | TItem;
  deps?: DependsOn<TFields, GetExtraConditionKey<TConfig>>;
}

class DependencyManagement<
  TConfig extends FormBuilderConfig,
  TFormId extends string,
> extends Configuration<TConfig, TFormId> {
  constructor(
    config: TConfig,
    options?: Partial<FormBuilderOptions>,
    overrides?: FormBuilderOverrides
  ) {
    super(config, options, overrides);
  }

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
    >(
      {
        component,
        dependencyContext: parentDeps,
        dependsOn: dependency,
        name,
      },
      {
        dependencyShouldReset: this.options.dependencyShouldReset,
      }
    );

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

  protected conditionCalculator = (
    { condition, value }: Condition<GetExtraConditionKey<TConfig>>,
    currentValue: unknown
  ): boolean => {
    // NOTE: in field array comparisions: value -> index, currentValue -> length
    const { extraConditions } = this.options;
    if (typeof extraConditions[condition] !== "undefined") {
      return extraConditions[condition](value, currentValue);
    }

    let result: boolean = false;

    switch (condition) {
      case "eq":
        result = value === currentValue;
        break;
      case "is-first-index":
        result = value === 0;
        break;
      case "is-last-index":
        if (typeof currentValue === "number")
          result = value === currentValue - 1;
        break;
      case "not-eq":
        result = value !== currentValue;
        break;
      case "not-first-index":
        result = value !== 0;
        break;
      case "not-last-index":
        if (typeof currentValue === "number")
          result = value !== currentValue - 1;
        break;
    }
    return result;
  };

  protected conditionArrayCalculator = (
    list: Array<Condition<GetExtraConditionKey<TConfig>> & { current: unknown }>
  ) => {
    return list.every((dep) => this.conditionCalculator(dep, dep.current));
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
      [calc]
    );

    return {
      calc,
      reduceCalc,
    };
  };

  protected useDefaultValue = <TFields extends FieldValues>(
    config: TConfig,
    list: ItemArray<TConfig, TFields>
  ) => {
    return useMemo(() => {
      const _defaultValues = new DefaultValue<TConfig, TFields>(
        config,
        list,
        this.conditionArrayCalculator
      );
      return {
        defaultValues: _defaultValues.result,
        fieldArray: _defaultValues.fieldArray,
      };
    }, [config, list]);
  };

  protected useDependency = <
    TFields extends FieldValues,
    TItem extends DefaultItem<TConfig, TFields>,
  >(
    {
      component,
      dependencyContext,
      dependsOn,
      name = "",
    }: UseDependencyProps<TConfig, TFields, TItem>,
    options?: UseDependencyOptions
  ): UseDependencyReturn<TConfig, TFields, TItem> => {
    const fieldArrayContext = useFieldArrayContext();
    const { reduceCalc } = this.useConditionCalculator();
    const formMethods = useFormContext<TFields>();
    const ref = useRef<
      Record<DependencyType<GetExtraConditionKey<TConfig>>, boolean | null>
    >({
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

    const dependencies = useMemo<
      DependencyStructure<TFields, GetExtraConditionKey<TConfig>>
    >(() => {
      const {
        disable: disableDict,
        hide: hideDict,
        ...dependencyDict
      } = createDependencyDict<TFields, GetExtraConditionKey<TConfig>>(
        dependsOn,
        value,
        fieldArrayContext
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
}

export { DependencyManagement };
