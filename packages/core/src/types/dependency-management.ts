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

type DependsOn<
  TFields extends FieldValues,
  TOnlyBoolean extends boolean = false,
> = DependsOnBase<TFields> & DependsOnUnion<TOnlyBoolean>;

type DependsOnBase<TFields extends FieldValues> = {
  // TODO: make id optional(if it's not provided use path as dependency id)
  id: string;
  path: Path<TFields>;
};

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
  DependsOn,
  DisableDependency,
  VisibilityDependency,
};
