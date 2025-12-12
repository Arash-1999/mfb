import type { JSX, PropsWithChildren, ReactNode } from "react";

import type { BaseComponentProps } from "../common";
import type { Validation } from "../validation";
import type { Header } from "./common";

type GroupCardComponent = (props: GroupCardPropsBase & unknown) => JSX.Element;

type GroupCardProps<TProps = unknown> = BaseComponentProps &
  TProps & {
    addGrid: (node: ReactNode, index: number) => ReactNode;
    nodes: Array<NodeItem>;
  };

interface GroupCardPropsBase extends BaseComponentProps {
  addGrid: (node: ReactNode, index: number) => ReactNode;
  nodes: Array<NodeItem>;
}

interface NodeItem {
  children: ReactNode;
  required?: boolean;
  title: Header | string;
  validation?: Validation<string>;
}

type SimpleCardBase = (props: SimpleCardPropsBase & unknown) => JSX.Element;

type SimpleCardObject = Record<PropertyKey, SimpleCardBase>;

type SimpleCardProps<TProps = unknown> = PropsWithChildren<
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
  NodeItem,
  SimpleCardObject,
  SimpleCardProps,
};
