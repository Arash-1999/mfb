import type { FieldValues, Path } from "react-hook-form";

import type { DefaultItem } from "./common";
import type { Condition } from "./condition";
import type { FormBuilderConfig } from "./config";
import type { ParentDeps } from "./context";
import type { GetExtraConditions } from "./utils";

type BindValueDependency = {
  type: "bind-value";
};

type ConditionCalcFn = (target: unknown, current: unknown) => boolean;

type ConditionsMap = Record<PropertyKey, ConditionCalcFn>;

type DefPropsDependency = {
  type: "def-props";
};

type Dependency<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TFunc extends boolean = false,
  TOnlyBoolean extends boolean = false,
> = (TFunc extends true
  ? Required<DependencyObject<TConfig, TFields, TOnlyBoolean>>
  : Partial<DependencyObject<TConfig, TFields, TOnlyBoolean>>) & {
  dependencyShouldReset?: boolean;
};

type DependencyDict<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = {
  [TKey in DependsOnUnion<
    GetExtraConditions<TConfig>,
    false
  > as TKey["type"]]: Array<
    DependsOnBase<TFields> &
      TKey & {
        current: unknown;
      }
  >;
};

interface DependencyObject<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TOnlyBoolean extends boolean = false,
> {
  dependsOn: DependsOn<TConfig, TFields, TOnlyBoolean>;
}

type DependencyStructure<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = Omit<
  {
    [TKey in DependsOnUnion<
      GetExtraConditions<TConfig>,
      false
    > as TKey["type"]]: Array<
      DependsOnBase<TFields> &
        TKey & {
          current: unknown;
        }
    >;
  },
  "disable" | "hide"
> & {
  disable: boolean;
  hide: boolean;
};

type DependencyType =
  DependsOnUnion<string, false> extends { type: infer TType } ? TType : never;

type DependsOn<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TOnlyBoolean extends boolean = false,
> =
  | Array<DependsOnSingle<TConfig, TFields, TOnlyBoolean>>
  | DependsOnSingle<TConfig, TFields, TOnlyBoolean>;

type DependsOnBase<TFields extends FieldValues> = {
  id: string;
  path: Path<TFields>;
};

type DependsOnSingle<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TOnlyBoolean extends boolean = false,
> = DependsOnBase<TFields> &
  DependsOnUnion<GetExtraConditions<TConfig>, TOnlyBoolean>;

type DependsOnUnion<
  TExtraKey extends string,
  TOnlyBoolean extends boolean = false,
> =
  | DefPropsDependency
  | DisableDependency<TExtraKey>
  | HideDependency<TExtraKey>
  | (TOnlyBoolean extends false ? BindValueDependency : never);

type DisableDependency<TExtraKey extends string> = Condition<TExtraKey> & {
  type: "disable";
};

type HideDependency<TExtraKey extends string> = Condition<TExtraKey> & {
  type: "hide";
};

interface UseDependencyProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TItem extends DefaultItem<TConfig, TFields>,
> {
  component: ((props?: { deps: never }) => TItem) | TItem;
  dependencyContext: ParentDeps;
  dependsOn: DependsOn<TConfig, TFields>;
  name: string | undefined;
}

type UseDependencyReturn<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TItem extends DefaultItem<TConfig, TFields>,
> = [null | TItem, DependencyStructure<TConfig, TFields>];

interface UseDependsOnFieldProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TItem extends DefaultItem<TConfig, TFields>,
> {
  component: ((props?: { deps: never }) => TItem) | TItem;
  deps?: DependsOn<TConfig, TFields>;
}

export type {
  BindValueDependency,
  ConditionCalcFn,
  ConditionsMap,
  Dependency,
  DependencyDict,
  DependencyStructure,
  DependencyType,
  DependsOn,
  DependsOnBase,
  DependsOnSingle,
  DisableDependency,
  HideDependency,
  UseDependencyProps,
  UseDependencyReturn,
  UseDependsOnFieldProps,
};
