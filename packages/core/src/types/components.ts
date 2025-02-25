import type { FormBuilderConfig } from "./config";
import type { GetInputs, GetLayoutProps } from "./utils";

// TODO: change list input type depend on form builder list method
type ListInput<TConfig extends FormBuilderConfig> = {
  gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
  gridProps?: GetLayoutProps<TConfig, "grid-item">;
  inputs: Array<GetInputs<TConfig>>;
  name: string;
  type: "list";
};

export type { ListInput };
