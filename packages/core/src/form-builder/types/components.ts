import type { FormBuilderConfig } from "./config";
import type { GetInputs } from "./utils";

// TODO: change list input type depend on form builder list method
type ListInput<TConfig extends FormBuilderConfig> = {
  gridProps: unknown;
  inputs: Array<GetInputs<TConfig>>;
  type: "list";
};

export type { ListInput };
