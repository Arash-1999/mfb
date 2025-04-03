import type { FieldValues, Path } from "react-hook-form";

type BindValueDependency = {
  type: "bind-value";
};

type Condition = {
  condition: "eq" | "not-eq";
  value: number | string;
};

type Dependency<TFields extends FieldValues> = {
  dependsOn?: DependsOn<TFields>;
};

type DependsOn<TFields extends FieldValues> = DependsOnBase<TFields> &
  DependsOnUnion;

type DependsOnBase<TFields extends FieldValues> = {
  path: Path<TFields>;
};

type DependsOnUnion =
  | BindValueDependency
  | DisableDependency
  | VisibilityDependency;

type DisableDependency = Condition & {
  type: "disable";
};

type VisibilityDependency = Condition & {
  type: "visibility";
};

export type {
  Condition,
  Dependency,
  DependsOn,
  DisableDependency,
  VisibilityDependency,
};
