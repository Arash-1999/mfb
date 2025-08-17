import type { FieldValues, Path } from "react-hook-form";

type BindValueDependency = {
  type: "bind-value";
};

type ConditionKey =
  | "eq"
  | "is-first-index"
  | "is-last-index"
  | "not-eq"
  | "not-first-index"
  | "not-last-index";

type Condition<TExtraKey extends string> = {
  condition: ConditionKey | TExtraKey;
  value: boolean | null | number | string;
};

type DefPropsDependency = {
  type: "def-props";
};
type Dependency<
  TFields extends FieldValues,
  TExtraKey extends string,
  TFunc extends boolean = false,
  TOnlyBoolean extends boolean = false,
> = (TFunc extends true
  ? Required<DependencyObject<TFields, TExtraKey, TOnlyBoolean>>
  : Partial<DependencyObject<TFields, TExtraKey, TOnlyBoolean>>) & {
  dependencyShouldReset?: boolean;
};

type DependencyDict<TFields extends FieldValues, TExtraKey extends string> = {
  [TKey in DependsOnUnion<TExtraKey, false> as TKey["type"]]: Array<
    DependsOnBase<TFields> &
      TKey & {
        current: unknown;
      }
  >;
};
interface DependencyObject<
  TFields extends FieldValues,
  TExtraKey extends string,
  TOnlyBoolean extends boolean = false,
> {
  dependsOn: DependsOn<TFields, TExtraKey, TOnlyBoolean>;
}

type DependencyStructure<
  TFields extends FieldValues,
  TExtraKey extends string,
> = Omit<
  {
    [TKey in DependsOnUnion<TExtraKey, false> as TKey["type"]]: Array<
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

type DependencyType<TExtraKey extends string> =
  DependsOnUnion<TExtraKey, false> extends { type: infer TType }
    ? TType
    : never;

type DependsOn<
  TFields extends FieldValues,
  TExtraKey extends string,
  TOnlyBoolean extends boolean = false,
> =
  | Array<DependsOnSingle<TFields, TExtraKey, TOnlyBoolean>>
  | DependsOnSingle<TFields, TExtraKey, TOnlyBoolean>;

type DependsOnBase<TFields extends FieldValues> = {
  id: string;
  path: Path<TFields>;
};

type DependsOnSingle<
  TFields extends FieldValues,
  TExtraKey extends string,
  TOnlyBoolean extends boolean = false,
> = DependsOnBase<TFields> & DependsOnUnion<TExtraKey, TOnlyBoolean>;

type DependsOnUnion<
  TExtraKey extends string,
  TOnlyBoolean extends boolean = false,
> =
  | DefPropsDependency
  | DisableDependency<TExtraKey>
  | (TOnlyBoolean extends false ? BindValueDependency : never)
  | HideDependency<TExtraKey>;

type DisableDependency<TExtraKey extends string> = Condition<TExtraKey> & {
  type: "disable";
};

type HideDependency<TExtraKey extends string> = Condition<TExtraKey> & {
  type: "hide";
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
  HideDependency,
};
