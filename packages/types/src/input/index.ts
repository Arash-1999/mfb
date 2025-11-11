import type { FieldValues } from "react-hook-form";

import type { DefineFnProps } from "../common";
import type { FormBuilderConfig } from "../config";
import type { Dependency } from "../dependency-management";
import type {
  GetFormats,
  GetInputParameter,
  GetLayoutProps,
  HasDependencyField,
} from "../utils";
import type { Validation } from "../validation";
import type { ActionInput } from "./action";
import type { ListInput } from "./list";

type GetInputs<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TInternal extends boolean = false,
  TExtra = unknown,
> =
  | ((props?: DefineFnProps) => ActionInput<TConfig, TFields> & TExtra)
  | ((
      props?: DefineFnProps,
    ) => GetInputsImpl<TConfig, TFields, TInternal, true> & TExtra)
  | (ActionInput<TConfig, TFields> & TExtra)
  | (GetInputsImpl<TConfig, TFields, TInternal> & TExtra);

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
        required?: boolean;
        type: TInput;
        validation?: Validation<GetFormats<TConfig>>;
      };
    }[keyof TConfig["input"]["components"]];

export type { GetInputs, GetInputsImpl };
export type { ActionInput } from "./action";
export type {
  BaseInput,
  ButtonComponent,
  ButtonComponentProps,
  InputProps,
} from "./component";
export type { ListInput } from "./list";
