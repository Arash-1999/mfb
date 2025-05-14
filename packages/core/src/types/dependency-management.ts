import type { FieldValues, Path } from "react-hook-form";

type BindValueDependency = {
  type: "bind-value";
};

type Condition = {
  condition: "eq" | "not-eq";
  value: number | string;
};

type DefPropsDependency = {
  type: "def-props";
};
type Dependency<
  TFields extends FieldValues,
  TFunc extends boolean = false,
  TOnlyBoolean extends boolean = false,
> = TFunc extends true
  ? Required<DependencyObject<TFields, TOnlyBoolean>>
  : Partial<DependencyObject<TFields, TOnlyBoolean>>;

interface DependencyObject<
  TFields extends FieldValues,
  TOnlyBoolean extends boolean = false,
> {
  dependsOn: DependsOn<TFields, TOnlyBoolean>;
}

type DependencyStructure<TFields extends FieldValues> = {
  [TKey in DependsOnUnion<false, true> as TKey["type"]]: Array<
    DependsOnBase<TFields> &
      TKey & {
        current: unknown;
      }
  >;
};

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
  TFunc extends boolean = false,
> = DependsOnBase<TFields> & DependsOnUnion<TOnlyBoolean, TFunc>;

type DependsOnUnion<
  TOnlyBoolean extends boolean = false,
  TFunc extends boolean = false,
> =
  | DisableDependency
  | (TFunc extends true ? DefPropsDependency : never)
  | (TOnlyBoolean extends false ? BindValueDependency : never)
  | VisibilityDependency;

type DisableDependency = Condition & {
  type: "disable";
};

type VisibilityDependency = Condition & {
  type: "visibility";
};

export type {
  BindValueDependency,
  Condition,
  Dependency,
  DependencyStructure,
  DependsOn,
  DependsOnBase,
  DependsOnSingle,
  DisableDependency,
  VisibilityDependency,
};
