import type { FieldValues } from "react-hook-form";

import type { BaseComponentProps } from "../common";
import type { FormBuilderConfig } from "../config";
import type { Dependency } from "../dependency-management";
import type { GetFormats, GetLayoutProps } from "../utils";
import type { ObjectValidation } from "../validation";
import type { GetCardBase, Header } from "./common";

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
      validation?: ObjectValidation<GetFormats<TConfig>>;
    };
  }[keyof TConfig["card"]["simple"]];

export type { GetSimpleCard };
