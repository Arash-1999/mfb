import type { JSX } from "react";
import type { FieldValues } from "react-hook-form";

import type { GetCards } from "./card";
import type { FormBuilderConfig } from "./config";
import type { Dependency, DependsOn } from "./dependency-management";
import type { BaseInput, GetInputs } from "./input";
import type { ActionInput } from "./input/action";

type AdvancedList<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = Array<
  | GetCards<TConfig, TFields, true, { mode: "card" }>
  | GetInputs<TConfig, TFields, false, { mode: "input" }>
>;

type BaseComponent = (props: any) => JSX.Element;

interface BaseComponentProps {
  disabled?: boolean;
}

interface DefaultItem<TFields extends FieldValues> extends Dependency<TFields> {
  gridProps?: object;
  name?: string;
}

interface DefineFnProps {
  deps: never;
}

type InputArray<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = Array<GetInputs<TConfig, TFields>>;

type InputObject = Record<PropertyKey, BaseInput>;

interface Item<TFields extends FieldValues> {
  dependsOn?: DependsOn<TFields>;
  inputs?: ItemArray<TFields>;
  list?:
    | Array<{
        list: ItemArray<TFields>;
        name?: string;
      }>
    | ItemArray<TFields>;
  name?: string;
  props?: unknown;
  type?: PropertyKey;
  variant?: "list" | "normal";
}

type ItemArray<TFields extends FieldValues> = Array<
  ((props?: DefineFnProps) => Item<TFields>) | Item<TFields>
>;

type LayoutKey = "field" | "grid-container" | "grid-item";

type ListInputArray<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = Array<ActionInput<TConfig, TFields> | GetInputs<TConfig, TFields>>;

export type {
  AdvancedList,
  BaseComponent,
  BaseComponentProps,
  DefaultItem,
  DefineFnProps,
  InputArray,
  InputObject,
  Item,
  ItemArray,
  LayoutKey,
  ListInputArray,
};
