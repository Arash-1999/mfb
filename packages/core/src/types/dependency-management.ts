import type { FieldValues, Path } from "react-hook-form";

type BindValueDependency = {
  type: "bind-value";
};

type Condition = {
  condition:
    | "eq"
    | "is-first-index"
    | "is-last-index"
    | "not-eq"
    | "not-first-index"
    | "not-last-index";
  value: boolean | null | number | string;
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
  "disable" | "visibility"
> & {
  disable: boolean;
  visibility: boolean;
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
  DependencyDict,
  DependencyStructure,
  DependencyType,
  DependsOn,
  DependsOnBase,
  DependsOnSingle,
  DisableDependency,
  VisibilityDependency,
};
