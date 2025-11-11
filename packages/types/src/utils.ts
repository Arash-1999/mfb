import type { LayoutKey } from "./common";
import type { FormBuilderConfig } from "./config";
import type { BaseInput } from "./input";
import type { Validator } from "./validation";

type GetFormats<TConfig extends FormBuilderConfig> =
  TConfig["validator"] extends Validator<infer T>
    ? T extends string
      ? (string & {}) | T
      : string
    : string;

type GetInputParameter<
  TConfig extends FormBuilderConfig,
  TInput extends PropertyKey,
> = Parameters<TConfig["input"]["components"][TInput]>[0];

type GetLayoutProps<
  TConfig extends FormBuilderConfig,
  TItem extends LayoutKey,
> = Parameters<TConfig["layout"][TItem]>[0];

type HasDependencyField<TInput extends BaseInput> =
  "deps" extends keyof Parameters<TInput>[0] ? false : true;

export type {
  GetFormats,
  GetInputParameter,
  GetLayoutProps,
  HasDependencyField,
};
