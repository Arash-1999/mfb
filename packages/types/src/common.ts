import type { JSX } from "react";
import type { FieldValues } from "react-hook-form";

import type { GetCards } from "./card";
import type { FormBuilderConfig } from "./config";
import type { CustomElement } from "./custom-element";
import type { Dependency, DependsOn } from "./dependency-management";
import type { BaseInput, GetInputs } from "./input";
import type { ActionInput } from "./input/action";
import type { Validation } from "./validation";

type AdvancedList<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = Array<
  | CustomElement<TConfig, TFields>
  | GetCards<TConfig, TFields, true, { mode: "card" }>
  | GetInputs<TConfig, TFields, false, { mode: "input" }>
>;

type BaseComponent = (props: any) => JSX.Element;

interface BaseComponentProps {
  disabled?: boolean;
  required?: boolean;
  validation?: Validation<string>;
}

interface DefaultItem<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> extends Dependency<TConfig, TFields> {
  gridProps?: object;
  name?: string;
}

interface DefineFnProps {
  deps: never;
}

type InputArray<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = Array<CustomElement<TConfig, TFields> | GetInputs<TConfig, TFields>>;

type InputObject = Record<PropertyKey, BaseInput>;

interface Item<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TFormat extends string = string,
> {
  dependsOn?: DependsOn<TConfig, TFields>;
  inputs?:
    | Array<{
        list: ItemArray<TConfig, TFields, (string & {}) | TFormat>;
        name?: string;
      }>
    | ItemArray<TConfig, TFields, (string & {}) | TFormat>;
  isGroup?: boolean;
  list?:
    | Array<{
        list: ItemArray<TConfig, TFields, (string & {}) | TFormat>;
        name?: string;
      }>
    | ItemArray<TConfig, TFields, (string & {}) | TFormat>;
  name?: string;
  props?: unknown;
  required?: boolean;
  type?: PropertyKey;
  validation?: Validation<(string & {}) | TFormat>;
  variant?: "list" | "normal";
}

type ItemArray<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TFormat extends string = string,
> = Array<
  | ((props?: DefineFnProps) => Item<TConfig, TFields, (string & {}) | TFormat>)
  | Item<TConfig, TFields, (string & {}) | TFormat>
>;

type LayoutKey = "field" | "grid-container" | "grid-item";

type ListInputArray<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = Array<
  | ActionInput<TConfig, TFields>
  | CustomElement<TConfig, TFields>
  | GetInputs<TConfig, TFields>
>;

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
