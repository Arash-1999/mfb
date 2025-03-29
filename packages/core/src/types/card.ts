import type { JSX, ReactNode } from "react";

import type { FormBuilderConfig } from "./config";
import type { GetInputs, GetLayoutProps } from "./utils";

type GetCards<TConfig extends FormBuilderConfig> =
  | (TConfig["card"]["group"] extends undefined
      ? never
      : {
          [TCard in keyof TConfig["card"]["group"]]: GroupCardBase<TCard> &
            (GroupCardList<TConfig> | GroupCardSingle<TConfig>);
        }[keyof TConfig["card"]["group"]])
  | {
      [TCard in keyof TConfig["card"]["simple"]]: {
        gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
        gridProps?: GetLayoutProps<TConfig, "grid-item">;
        // TODO: move header logic to component props (in base strucuture for simple card)
        header: Header | string;
        inputs: Array<GetInputs<TConfig>>;
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

type GroupCardList<TConfig extends FormBuilderConfig> = {
  gridProps?: GetLayoutProps<TConfig, "grid-item">;
  inputs: Array<GetInputs<TConfig>>;
  name: string;
  variant: "list";
};

type GroupCardSingle<TConfig extends FormBuilderConfig> = {
  gridProps?: GetLayoutProps<TConfig, "grid-item">;
  inputs: Array<{
    list: Array<GetInputs<TConfig>>;
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
