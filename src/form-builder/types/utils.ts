import type { FormBuilderConfig } from "./builder";
import { ListInput } from "./components";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseComponent = (props: any) => JSX.Element;
type FbComponent = Record<PropertyKey, BaseComponent>;

type GetInputs<
  TConfig extends FormBuilderConfig,
  TInternal extends boolean = false,
> =
  | {
      [TInput in keyof TConfig["input"]]: {
        type: TInput;
        props: TInternal extends false
          ? Omit<Parameters<TConfig["input"][TInput]>[0], "formMethods">
          : Parameters<TConfig["input"][TInput]>[0];
        field?: Parameters<TConfig["field"]>[0];
      };
    }[keyof TConfig["input"]]
  | ListInput;

export type { GetInputs, BaseComponent, FbComponent };
