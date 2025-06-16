import type { JSX, PropsWithChildren, ReactNode } from "react";
import type { FieldValues } from "react-hook-form";

import type { FormBuilderConfig } from "./config";
import type { Dependency } from "./dependency-management";
import type { GetInputs } from "./input";
import type {
  AdvancedList,
  BaseComponentProps,
  DefineFnProps,
  GetLayoutProps,
} from "./utils";

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
            name?: string;
            title: Header | string;
          }>
        : Array<GetInputs<TConfig, TFields>>;
    }
  : {
      list: TNormalGroup extends false
        ? Array<{
            gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
            list: AdvancedList<TConfig, TFields>;
            name?: string;
            title: Header | string;
          }>
        : AdvancedList<TConfig, TFields>;
    };

type GetCards<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TAdvanced extends boolean = false,
> =
  | ((props?: DefineFnProps) => GetCardsImpl<TConfig, TFields, TAdvanced, true>)
  | GetCardsImpl<TConfig, TFields, TAdvanced>;

type GetCardsImpl<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TAdvanced extends boolean = false,
  TInternal extends boolean = false,
  TFunc extends boolean = false,
> =
  | GetGroupCard<TConfig, TFields, TAdvanced, TInternal, TFunc>
  | GetSimpleCard<TConfig, TFields, TAdvanced, TInternal, TFunc>;

type GetGroupCard<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TAdvanced extends boolean = false,
  TInternal extends boolean = false,
  TFunc extends boolean = false,
> = TConfig["card"]["group"] extends object
  ? {
      [TCard in keyof TConfig["card"]["group"]]: GroupCardBase<TCard> & {
        props?: TConfig["card"]["group"] extends object
          ? TInternal extends true
            ? Parameters<TConfig["card"]["group"][TCard]>[0]
            : Omit<
                Parameters<TConfig["card"]["group"][TCard]>[0],
                "addGrid" | "nodes" | keyof BaseComponentProps
              >
          : never;
      } & (
          | (Dependency<TFields, TFunc> &
              GetCardBase<TConfig, TFields, TAdvanced, true> &
              GroupCardList<TConfig>)
          | (Dependency<TFields, TFunc> &
              GetCardBase<TConfig, TFields, TAdvanced> &
              GroupCardNormal<TConfig>)
        );
    }[keyof TConfig["card"]["group"]]
  : never;

type GetSimpleCard<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TAdvanced extends boolean = false,
  TInternal extends boolean = false,
  TFunc extends boolean = false,
> = Dependency<TFields, TFunc> &
  GetCardBase<TConfig, TFields, TAdvanced, true> &
  {
    [TCard in keyof TConfig["card"]["simple"]]: {
      gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
      gridProps?: GetLayoutProps<TConfig, "grid-item">;
      // TODO: move header logic to component props (in base strucuture for simple card)
      header: Header | string;
      isGroup?: false;
      name?: string;
      props?: TInternal extends true
        ? Parameters<TConfig["card"]["simple"][TCard]>[0]
        : Omit<
            Parameters<TConfig["card"]["simple"][TCard]>[0],
            "children" | "header" | keyof BaseComponentProps
          >;
      type: TCard;
    };
  }[keyof TConfig["card"]["simple"]];

type GroupCardBase<TKey extends PropertyKey> = {
  isGroup: true;
  name?: string;
  type: TKey;
};

type GroupCardComponent = (props: GroupCardPropsBase & unknown) => JSX.Element;

type GroupCardList<TConfig extends FormBuilderConfig> = {
  gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
  gridProps?: GetLayoutProps<TConfig, "grid-item">;
  name: string;
  variant: "list";
};

type GroupCardNormal<TConfig extends FormBuilderConfig> = {
  gridProps?: GetLayoutProps<TConfig, "grid-item">;
  variant?: "normal";
};

type GroupCardProps<TProps> = BaseComponentProps &
  TProps & {
    addGrid: (node: ReactNode, index: number) => ReactNode;
    nodes: Array<{ children: ReactNode; title: Header | string }>;
  };

interface GroupCardPropsBase extends BaseComponentProps {
  addGrid: (node: ReactNode, index: number) => ReactNode;
  nodes: Array<{ children: ReactNode; title: Header | string }>;
}

type Header = Record<"center" | "left" | "right", ReactNode>;

type SimpleCardBase = (props: SimpleCardPropsBase & unknown) => JSX.Element;

type SimpleCardObject = Record<PropertyKey, SimpleCardBase>;

type SimpleCardProps<TProps> = BaseComponentProps &
  TProps & {
    header: Header | string;
  };

interface SimpleCardPropsBase
  extends BaseComponentProps,
    PropsWithChildren<{
      header: Header | string;
    }> {}

export type {
  GetCards,
  GetCardsImpl,
  GroupCardComponent,
  GroupCardProps,
  Header,
  SimpleCardBase,
  SimpleCardObject,
  SimpleCardProps,
};
