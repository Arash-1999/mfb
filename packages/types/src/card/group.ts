import type { FieldValues } from "react-hook-form";

import type { BaseComponentProps } from "../common";
import type { FormBuilderConfig } from "../config";
import type { Dependency } from "../dependency-management";
import type { GetFormats, GetLayoutProps } from "../utils";
import type { ArrayValidation, ObjectValidation } from "../validation";
import type { GetCardBase } from "./common";

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

type GroupCardBase<TKey extends PropertyKey> = {
  isGroup: true;
  name?: string;
  type: TKey;
};

type GroupCardList<TConfig extends FormBuilderConfig> = {
  gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
  gridProps?: GetLayoutProps<TConfig, "grid-item">;
  name: string;
  validation?: ArrayValidation<GetFormats<TConfig>>;
  variant: "list";
};

type GroupCardNormal<TConfig extends FormBuilderConfig> = {
  gridProps?: GetLayoutProps<TConfig, "grid-item">;
  validation?: ObjectValidation<GetFormats<TConfig>>;
  variant?: "normal";
};

export type { GetGroupCard, GroupCardBase, GroupCardList, GroupCardNormal };
