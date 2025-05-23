import type { ReactNode } from "react";
import type {
  FieldValues,
  SubmitHandler,
  UseFieldArrayReturn,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";

import type { GetCards, GetCardsImpl } from "./card";
import type { FormBuilderConfig } from "./config";
import type { DependsOn } from "./dependency-management";
import type { GetInputsImpl } from "./input";
import type {
  AdvancedList,
  DefaultItem,
  GetLayoutProps,
  InputArray,
  RenderFn,
} from "./utils";

interface AdvancedBuilderProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TFormId extends string = string,
> extends BuilderBaseProps<TConfig, TFields, TFormId> {
  list: AdvancedList<TConfig, TFields>;
}

interface AdvancedMapperProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> {
  list: AdvancedList<TConfig, TFields>;
  name?: string;
}

interface BasicBuilderProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TFormId extends string = string,
> {
  gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
  id: TFormId;
  inputs:
  | ((api: {
    define: <TDeps extends FieldValues>(
      func: (props?: {
        deps: TDeps;
      }) => GetInputsImpl<TConfig, TFields, false, true>,
    ) => (props?: {
      deps: TDeps;
    }) => GetInputsImpl<TConfig, TFields, false, true>;
  }) => InputArray<TConfig, TFields>)
  | InputArray<TConfig, TFields>;
  onSubmit: SubmitHandler<TFields>;
  options?: UseFormProps<TFields>;
}

interface BuilderBaseProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TFormId extends string = string,
> {
  gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
  id: TFormId;
  onSubmit: SubmitHandler<TFields>;
  options?: UseFormProps<TFields>;
}

interface BuilderProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TFormId extends string = string,
> extends BuilderBaseProps<TConfig, TFields, TFormId> {
  cards: Array<GetCards<TConfig, TFields>>;
}

interface DependencyManagerProps<
  // TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TItem extends DefaultItem<TFields>,
> {
  component: ((props?: { deps: never }) => TItem) | TItem;
  // dependsOn: DependsOn<TFields>;
  index: number;
  name?: string;
  render: RenderFn<TFields, TItem>;
  withContext: boolean;
}

interface FieldArrayProps<TFields extends FieldValues> {
  // TODO: use ArrayPath generic type instead of string
  name: string;
  render: (fields: UseFieldArrayReturn<TFields>["fields"]) => ReactNode;
}

interface FormBuilderProps<TConfig extends FormBuilderConfig> {
  config: TConfig;
}

interface InputMapFnOptions<TFields extends FieldValues> {
  deps?: DependsOn<TFields>;
  formMethods: UseFormReturn<TFields>;
  name?: string;
}

interface InputMapperProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> {
  deps?: DependsOn<TFields>;
  inputs: InputArray<TConfig, TFields>;
  name?: string;
}

type RenderCardProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = RenderPropsAdvanced<TConfig, TFields> | RenderPropsNormal<TConfig, TFields>;

type RenderInputOptions<TFields extends FieldValues> = {
  formMethods: UseFormReturn<TFields>;
};
interface RenderPropsAdvanced<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> extends RenderPropsBase {
  advanced: false;
  card: GetCardsImpl<TConfig, TFields, false>;
}
interface RenderPropsBase {
  index: number;
  name?: string;
}
interface RenderPropsNormal<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> extends RenderPropsBase {
  advanced: true;
  card: GetCardsImpl<TConfig, TFields, true> & { mode: "card" };
}

export type {
  AdvancedBuilderProps,
  AdvancedMapperProps,
  BasicBuilderProps,
  BuilderProps,
  DependencyManagerProps,
  FieldArrayProps,
  FormBuilderConfig,
  FormBuilderProps,
  InputMapFnOptions,
  InputMapperProps,
  RenderCardProps,
  RenderInputOptions,
};
