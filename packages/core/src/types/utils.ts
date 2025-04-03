import type { JSX } from "react";
import type { FieldValues } from "react-hook-form";

import type { ActionInput } from "./components";
import type { FormBuilderConfig } from "./config";
import type { GetInputs } from "./input";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseComponent = (props: any) => JSX.Element;
//
// type FbComponent = Record<PropertyKey, BaseComponent>;

type GetLayoutProps<
  TConfig extends FormBuilderConfig,
  TItem extends LayoutKey,
> = Parameters<TConfig["layout"][TItem]>[0];

type InputArray<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = Array<GetInputs<TConfig, TFields>>;

type LayoutKey = "field" | "grid-container" | "grid-item";

type ListInputArray<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = Array<ActionInput | GetInputs<TConfig, TFields>>;

export type {
  BaseComponent,
  GetLayoutProps,
  InputArray,
  LayoutKey,
  ListInputArray,
};
