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
        name: string;
        type: TCard;
      };
    }[keyof TConfig["card"]["simple"]];

type GroupCardBase<TKey extends PropertyKey> = {
  isGroup: true;
  type: TKey;
};

type GroupCardList<TConfig extends FormBuilderConfig> = {
  inputs: Array<GetInputs<TConfig>>;
  variant: "list";
};

type GroupCardSingle<TConfig extends FormBuilderConfig> = {
  inputs: Array<Array<GetInputs<TConfig>>>;
  variant?: "simple";
};

type Header = Record<"center" | "left" | "right", ReactNode>;

type SimpleCardBase = (props: SimpleCardProps) => JSX.Element;

type SimpleCardProps = {
  children: ReactNode;
  header: Header | string;
};

export type { GetCards, SimpleCardBase, SimpleCardProps };
