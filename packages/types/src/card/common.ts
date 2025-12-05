import type { ReactNode } from "react";
import type { FieldValues } from "react-hook-form";

import type { AdvancedList } from "../common";
import type { FormBuilderConfig } from "../config";
import type { Dependency } from "../dependency-management";
import type { GetInputs } from "../input";
import type { GetFormats, GetLayoutProps } from "../utils";
import type { ObjectValidation } from "../validation";

type GetCardBase<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TAdvanced extends boolean = false,
  TNormalGroup extends boolean = false,
  TFunc extends boolean = false,
> = TAdvanced extends false
  ? {
      inputs: TNormalGroup extends false
        ? Array<NormalCardItem<TConfig, TFields, TAdvanced, TFunc>>
        : Array<GetInputs<TConfig, TFields>>;
      required?: boolean;
    }
  : {
      list: TNormalGroup extends false
        ? Array<NormalCardItem<TConfig, TFields, TAdvanced, TFunc>>
        : AdvancedList<TConfig, TFields>;
      required?: boolean;
    };

type Header = Record<"center" | "left" | "right", ReactNode>;

type NormalCardItem<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TAdvanced extends boolean = false,
  TFunc extends boolean = false,
> = Dependency<TConfig, TFields, TFunc> &
  NormalCardItemBase<TConfig, TFields, TAdvanced>;

interface NormalCardItemBase<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TAdvanced extends boolean = false,
> {
  gridContainerProps?: GetLayoutProps<TConfig, "grid-container">;
  list: TAdvanced extends false
    ? Array<GetInputs<TConfig, TFields>>
    : AdvancedList<TConfig, TFields>;
  name?: string;
  required?: boolean;
  title: Header | string;
  validation?: ObjectValidation<GetFormats<TConfig>>;
}

export type { GetCardBase, Header, NormalCardItem };
