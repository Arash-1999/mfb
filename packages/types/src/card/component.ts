import type { JSX, PropsWithChildren, ReactNode } from "react";

import type { BaseComponentProps } from "../common";
import type { Header } from "./common";

type GroupCardComponent = (props: GroupCardPropsBase & unknown) => JSX.Element;

type GroupCardProps<TProps> = BaseComponentProps &
  TProps & {
    addGrid: (node: ReactNode, index: number) => ReactNode;
    nodes: Array<{ children: ReactNode; title: Header | string }>;
  };

interface GroupCardPropsBase extends BaseComponentProps {
  addGrid: (node: ReactNode, index: number) => ReactNode;
  nodes: Array<{ children: ReactNode; title: Header | string }>;
}

type SimpleCardBase = (props: SimpleCardPropsBase & unknown) => JSX.Element;

type SimpleCardObject = Record<PropertyKey, SimpleCardBase>;

type SimpleCardProps<TProps> = PropsWithChildren<
  BaseComponentProps &
    TProps & {
      header: Header | string;
    }
>;

interface SimpleCardPropsBase
  extends BaseComponentProps,
    PropsWithChildren<{
      header: Header | string;
    }> {}

export type {
  GroupCardComponent,
  GroupCardProps,
  SimpleCardObject,
  SimpleCardProps,
};
