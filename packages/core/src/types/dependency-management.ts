import type { FieldValues, Path } from "react-hook-form";

type BindValueDependency<TFields extends FieldValues> =
  DependsOnBase<TFields> & {
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
  // TODO: make id optional(if it's not provided use path as dependency id)
  id: string;
  path: Path<TFields>;
};

type DependsOnUnion = DisableDependency | VisibilityDependency;

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
