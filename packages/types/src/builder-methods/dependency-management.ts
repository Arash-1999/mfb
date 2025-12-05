import type { JSX } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

import type { NormalCardItem } from "../card";
import type { ChildrenPathResult } from "../children-path";
import type { DefaultItem } from "../common";
import type { FormBuilderConfig } from "../config";
import type { DependencyStructure } from "../dependency-management";

interface DependencyManagerProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TItem extends DefaultItem<TConfig, TFields>,
> {
  component: ((props?: { deps: never }) => TItem) | TItem;
  getItemInfo: (item: TItem) => ChildrenPathResult;
  index: number;
  name?: string;
  render: RenderFn<TConfig, TFields, TItem>;
  withGrid?: boolean;
}

type RenderCardItemProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> =
  | (NormalCardItem<TConfig, TFields, true> & { advanced: true })
  | (NormalCardItem<TConfig, TFields> & { advanced: false });

type RenderFn<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TItem extends DefaultItem<TConfig, TFields>,
> = (
  item: TItem,
  options: RenderFnOptions<TConfig, TFields>,
) => JSX.Element | null;

interface RenderFnOptions<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> {
  dependsOn: DependencyStructure<TConfig, TFields>;
  formMethods: UseFormReturn<TFields>;
  index: number;
  name?: string;
}

export type {
  DependencyManagerProps,
  RenderCardItemProps,
  RenderFn,
  RenderFnOptions,
};
