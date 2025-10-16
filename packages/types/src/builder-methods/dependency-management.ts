import type { JSX } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

import type { NormalCardItem } from "../card";
import type { ChildrenPathResult } from "../children-path";
import type { DefaultItem } from "../common";
import type { FormBuilderConfig } from "../config";
import type { DependencyStructure } from "../dependency-management";

interface DependencyManagerProps<
  TFields extends FieldValues,
  TItem extends DefaultItem<TFields>,
> {
  component: ((props?: { deps: never }) => TItem) | TItem;
  getItemInfo: (item: TItem) => ChildrenPathResult;
  index: number;
  name?: string;
  render: RenderFn<TFields, TItem>;
  withGrid?: boolean;
}

type RenderCardItemProps<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> =
  | (NormalCardItem<TConfig, TFields, true> & { advanced: true })
  | (NormalCardItem<TConfig, TFields> & { advanced: false });

type RenderFn<
  TFields extends FieldValues,
  TItem extends DefaultItem<TFields>,
> = (item: TItem, options: RenderFnOptions<TFields>) => JSX.Element | null;

interface RenderFnOptions<TFields extends FieldValues> {
  dependsOn: DependencyStructure<TFields>;
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
