import type { JSX, ReactNode } from "react";
import type { FieldValues } from "react-hook-form";

import type { FormBuilderConfig } from "./config";
import type { GetInputs } from "./input";
import type { GetLayoutProps } from "./utils";

type GetCards<TConfig extends FormBuilderConfig, TFields extends FieldValues> =
  | GetGroupCard<TConfig, TFields>
  | GetSimpleCard<TConfig, TFields>;

type GetGroupCard<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = TConfig["card"]["group"] extends undefined
  ? never
  : {
      [TCard in keyof TConfig["card"]["group"]]: GroupCardBase<TCard> &
        (GroupCardList<TConfig, TFields> | GroupCardSingle<TConfig, TFields>);
    }[keyof TConfig["card"]["group"]];

type GetSimpleCard<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = {
  [TCard in keyof TConfig["card"]["simple"]]: {
    gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
    gridProps?: GetLayoutProps<TConfig, "grid-item">;
    // TODO: move header logic to component props (in base strucuture for simple card)
    header: Header | string;
    inputs: Array<GetInputs<TConfig, TFields>>;
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
  TFields extends FieldValues,
> = {
  gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
  gridProps?: GetLayoutProps<TConfig, "grid-item">;
  inputs: Array<GetInputs<TConfig, TFields>>;
  name: string;
  variant: "list";
};

type GroupCardSingle<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
> = {
  gridProps?: GetLayoutProps<TConfig, "grid-item">;
  inputs: Array<{
    gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
    list: Array<GetInputs<TConfig, TFields>>;
    title: Header | string;
  }>;
  variant?: "simple";
};

type Header = Record<"center" | "left" | "right", ReactNode>;

type SimpleCardBase = (props: SimpleCardProps) => JSX.Element;

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
  SimpleCardProps,
};
