import type { JSX } from "react";

import type { ListInput } from "./components";
import type { FormBuilderConfig } from "./config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseComponent = (props: any) => JSX.Element;
type FbComponent = Record<PropertyKey, BaseComponent>;

type GetInputParameter<
  TConfig extends FormBuilderConfig,
  TInput extends PropertyKey,
> = Parameters<TConfig["input"]["components"][TInput]>[0];

type GetInputs<
  TConfig extends FormBuilderConfig,
  TInternal extends boolean = false,
> =
  | ListInput
  | {
      [TInput in keyof TConfig["input"]]: {
        field?: GetLayoutProps<TConfig, "field">;
        gridProps?: GetLayoutProps<TConfig, "grid-item">;
        props: TInternal extends false
          ? Omit<GetInputParameter<TConfig, TInput>, "formMethods">
          : GetInputParameter<TConfig, TInput>;
        type: TInput;
      };
    }[keyof TConfig["input"]];

type GetLayoutProps<
  TConfig extends FormBuilderConfig,
  TItem extends LayoutKey,
> = Parameters<TConfig["layout"][TItem]>[0];

type InputArray<TConfig extends FormBuilderConfig> = Array<GetInputs<TConfig>>;

type LayoutKey = "field" | "grid-container" | "grid-item";

export type {
  BaseComponent,
  FbComponent,
  GetInputs,
  GetLayoutProps,
  InputArray,
  LayoutKey,
};
