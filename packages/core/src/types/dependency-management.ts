import type { FieldValues, Path } from "react-hook-form";

type BindValueDependency = {
  type: "bind-value";
};

type Condition = {
  condition: "eq" | "not-eq";
  value: number | string;
};

type Dependency<
  TFields extends FieldValues,
  TOnlyBoolean extends boolean = false,
> = {
  dependsOn?: DependsOn<TFields, TOnlyBoolean>;
};

type DependencyStructure<TFields extends FieldValues> = {
  [TKey in DependsOnUnion as TKey["type"]]: Array<
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
> = DependsOnBase<TFields> & DependsOnUnion<TOnlyBoolean>;

type DependsOnUnion<TOnlyBoolean extends boolean = false> =
  | DisableDependency
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
