import type { JSX } from "react";
import type { FieldValues } from "react-hook-form";

import type { FormBuilderConfig } from "./config";
import type { FieldArrayActions } from "./event";
import type { GetInputs } from "./input";
import type { GetLayoutProps } from "./utils";

type ActionInput = {
  render: <TFields extends FieldValues>(
    props: ActionRenderProps<TFields>,
  ) => JSX.Element;
  type: "field-array-action";
};
type ActionRenderProps<TFields extends FieldValues> = {
  methods: FieldArrayActions<TFields>;
};

// TODO: add ActionInput type to ListInput inputs
type ListInput<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = {
  gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
  gridProps?: GetLayoutProps<TConfig, "grid-item">;
  inputs: Array<GetInputs<TConfig, TFields>>;
  name: string;
  type: "list";
};

export type { ActionInput, ListInput };
