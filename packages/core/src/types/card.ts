import type { JSX, ReactNode } from "react";
import type { FieldValues } from "react-hook-form";

import type { FormBuilderConfig } from "./config";
import type { GetInputs } from "./input";
import type { AdvancedList, GetLayoutProps } from "./utils";

type GetCardBase<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TAdvanced extends boolean = false,
  TNormalGroup extends boolean = false,
> = TAdvanced extends false
  ? {
      inputs: TNormalGroup extends false
        ? Array<{
            gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
            list: Array<GetInputs<TConfig, TFields>>;
            title: Header | string;
          }>
        : Array<GetInputs<TConfig, TFields>>;
    }
  : {
      list: TNormalGroup extends false
        ? Array<{
            gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
            list: AdvancedList<TConfig, TFields>;
            title: Header | string;
          }>
        : Array<
            GetCards<TConfig, TFields, TAdvanced> | GetInputs<TConfig, TFields>
          >;
    };

type GetCards<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TAdvanced extends boolean = false,
> =
  | GetGroupCard<TConfig, TFields, TAdvanced>
  | GetSimpleCard<TConfig, TFields, TAdvanced>;

type GetGroupCard<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TAdvanced extends boolean = false,
> = TConfig["card"]["group"] extends undefined
  ? never
  : {
      [TCard in keyof TConfig["card"]["group"]]: GroupCardBase<TCard> &
        (
          | (GetCardBase<TConfig, TFields, TAdvanced, true> &
              GroupCardList<TConfig>)
          | (GetCardBase<TConfig, TFields, TAdvanced> &
              GroupCardNormal<TConfig>)
        );
    }[keyof TConfig["card"]["group"]];

type GetSimpleCard<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TAdvanced extends boolean = false,
> = GetCardBase<TConfig, TFields, TAdvanced, true> &
  {
    [TCard in keyof TConfig["card"]["simple"]]: {
      gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
      gridProps?: GetLayoutProps<TConfig, "grid-item">;
      // TODO: move header logic to component props (in base strucuture for simple card)
      header: Header | string;
      isGroup?: false;
      name?: string;
      type: TCard;
    };
  }[keyof TConfig["card"]["simple"]];

type GroupCardBase<TKey extends PropertyKey> = {
  isGroup: true;
  type: TKey;
};

type GroupCardComponent = (props: GroupCardComponentProps) => JSX.Element;

type GroupCardComponentProps = {
  addGrid: (node: ReactNode, index: number) => ReactNode;
  nodes: Array<{ children: ReactNode; title: Header | string }>;
};

type GroupCardList<
  TConfig extends FormBuilderConfig,
  // TFields extends FieldValues,
> = {
  gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
  gridProps?: GetLayoutProps<TConfig, "grid-item">;
  // inputs: Array<GetInputs<TConfig, TFields>>;
  name: string;
  variant: "list";
};

type GroupCardNormal<
  TConfig extends FormBuilderConfig,
  // TFields extends FieldValues,
> = {
  gridProps?: GetLayoutProps<TConfig, "grid-item">;
  // inputs: Array<{}>;
  variant?: "normal";
};

type Header = Record<"center" | "left" | "right", ReactNode>;

type SimpleCardBase = (props: SimpleCardProps) => JSX.Element;

type SimpleCardObject = Record<PropertyKey, SimpleCardBase>;

type SimpleCardProps = {
  children: ReactNode;
  header: Header | string;
};

export type {
  GetCards,
  GroupCardComponent,
  GroupCardComponentProps,
  Header,
  SimpleCardBase,
  SimpleCardObject,
  SimpleCardProps,
};
