import type { JSX } from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

import type { ListInput } from "./components";
import type { FormBuilderConfig } from "./config";
import type { BindValueDependency, Dependency } from "./dependency-management";
import type { GetLayoutProps } from "./utils";

type BaseInput = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any & BaseInputParameters
) => JSX.Element;

type BaseInputParameters = {
  disabled?: boolean;
};

type GetBindValueDependency<
  TFields extends FieldValues,
  TInput extends BaseInput,
> = Parameters<TInput>[0]["deps"] extends undefined
  ? Dependency<TFields>
  : Dependency<TFields> | {
      dependsOn?: BindValueDependency<TFields>;
    };

type GetInputParameter<
  TConfig extends FormBuilderConfig,
  TInput extends PropertyKey,
> = Parameters<TConfig["input"]["components"][TInput]>[0];

type GetInputs<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TInternal extends boolean = false,
> =
  | (Dependency<TFields> & ListInput<TConfig, TFields>)
  | {
      [TInput in keyof TConfig["input"]["components"]]: GetBindValueDependency<
        TFields,
        TConfig["input"]["components"][TInput]
      > & {
        field?: GetLayoutProps<TConfig, "field">;
        gridProps?: GetLayoutProps<TConfig, "grid-item">;
        name: string;
        props: TInternal extends true
          ? GetInputParameter<TConfig, TInput>
          : Omit<
              GetInputParameter<TConfig, TInput>,
              "deps" | "formMethods" | "name"
            >;
        type: TInput;
      };
    }[keyof TConfig["input"]["components"]];

type InputObject = Record<PropertyKey, BaseInput>;

type InputProps<TFields extends FieldValues, TProps> = BaseInputParameters &
  TProps & {
    formMethods: UseFormReturn<TFields>;
    name: Path<TFields>;
  };

export type { BaseInputParameters, GetInputs, InputObject, InputProps };
