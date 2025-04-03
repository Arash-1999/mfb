import type { JSX } from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

import type { ListInput } from "./components";
import type { FormBuilderConfig } from "./config";
import type { Dependency } from "./dependency-management";
import type { GetLayoutProps } from "./utils";

type BaseInput = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any & BaseInputParameters,
) => JSX.Element;

type BaseInputParameters = {
  disabled?: boolean;
};

type GetInputParameter<
  TConfig extends FormBuilderConfig,
  TInput extends PropertyKey,
> = Parameters<TConfig["input"]["components"][TInput]>[0];

type GetInputs<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TInternal extends boolean = false,
> = Dependency<TFields> &
  (
    | ListInput<TConfig, TFields>
    | {
        [TInput in keyof TConfig["input"]["components"]]: {
          field?: GetLayoutProps<TConfig, "field">;
          gridProps?: GetLayoutProps<TConfig, "grid-item">;
          name: string;
          props: TInternal extends false
            ? Omit<GetInputParameter<TConfig, TInput>, "formMethods" | "name">
            : GetInputParameter<TConfig, TInput>;
          type: TInput;
        };
      }[keyof TConfig["input"]["components"]]
  );

type InputObject = Record<PropertyKey, BaseInput>;

type InputProps<TFields extends FieldValues, TProps> = BaseInputParameters &
  TProps & {
    formMethods: UseFormReturn<TFields>;
    name: Path<TFields>;
  };

export type { BaseInputParameters, GetInputs, InputObject, InputProps };
