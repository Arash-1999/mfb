import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

import type { ListInput } from "./components";
import type { FormBuilderConfig } from "./config";
import type { Dependency } from "./dependency-management";
import type {
  BaseComponentProps,
  BaseInput,
  DefineFnProps,
  GetLayoutProps,
  HasDependencyField,
} from "./utils";

type GetInputParameter<
  TConfig extends FormBuilderConfig,
  TInput extends PropertyKey,
> = Parameters<TConfig["input"]["components"][TInput]>[0];

type GetInputs<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TInternal extends boolean = false,
> =
  | ((
      props?: DefineFnProps,
    ) => GetInputsImpl<TConfig, TFields, TInternal, true>)
  | GetInputsImpl<TConfig, TFields, TInternal>;

type GetInputsImpl<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TInternal extends boolean = false,
  TFunc extends boolean = false,
> =
  | (Dependency<TFields, TFunc> & ListInput<TConfig, TFields>)
  | {
      [TInput in keyof TConfig["input"]["components"]]: Dependency<
        TFields,
        TFunc,
        HasDependencyField<TConfig["input"]["components"][TInput]>
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

// TODO: add required and other rules
type InputProps<TFields extends FieldValues, TProps> = BaseComponentProps &
  TProps & {
    formMethods: UseFormReturn<TFields>;
    name: Path<TFields>;
  };

export type { GetInputs, GetInputsImpl, InputObject, InputProps };
