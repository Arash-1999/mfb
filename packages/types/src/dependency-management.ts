import type { FieldValues, Path } from "react-hook-form";

import type { Condition } from "./condition";

type BindValueDependency = {
  type: "bind-value";
};

type DefPropsDependency = {
  type: "def-props";
};

type Dependency<
  TFields extends FieldValues,
  TFunc extends boolean = false,
  TOnlyBoolean extends boolean = false,
> = (TFunc extends true
  ? Required<DependencyObject<TFields, TOnlyBoolean>>
  : Partial<DependencyObject<TFields, TOnlyBoolean>>) & {
  dependencyShouldReset?: boolean;
};

type DependencyDict<TFields extends FieldValues> = {
  [TKey in DependsOnUnion<false> as TKey["type"]]: Array<
    DependsOnBase<TFields> &
      TKey & {
        current: unknown;
      }
  >;
};

interface DependencyObject<
  TFields extends FieldValues,
  TOnlyBoolean extends boolean = false,
> {
  dependsOn: DependsOn<TFields, TOnlyBoolean>;
}

type DependencyStructure<TFields extends FieldValues> = Omit<
  {
    [TKey in DependsOnUnion<false> as TKey["type"]]: Array<
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
  DependsOnUnion<false> extends { type: infer TType } ? TType : never;

type DependsOn<
  TFields extends FieldValues,
  TOnlyBoolean extends boolean = false,
> =
  | Array<DependsOnSingle<TFields, TOnlyBoolean>>
  | DependsOnSingle<TFields, TOnlyBoolean>;

type DependsOnBase<TFields extends FieldValues> = {
  id: string;
  path: Path<TFields>;
};

type DependsOnSingle<
  TFields extends FieldValues,
  TOnlyBoolean extends boolean = false,
> = DependsOnBase<TFields> & DependsOnUnion<TOnlyBoolean>;

type DependsOnUnion<TOnlyBoolean extends boolean = false> =
  | DefPropsDependency
  | DisableDependency
  | HideDependency
  | (TOnlyBoolean extends false ? BindValueDependency : never);

type DisableDependency = Condition & {
  type: "disable";
};

type HideDependency = Condition & {
  type: "hide";
};

export type {
  BindValueDependency,
  Dependency,
  DependencyDict,
  DependencyStructure,
  DependencyType,
  DependsOn,
  DependsOnBase,
  DependsOnSingle,
  DisableDependency,
  HideDependency,
};
