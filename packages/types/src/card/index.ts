import type { FieldValues } from "react-hook-form";

import type { DefineFnProps } from "../common";
import type { FormBuilderConfig } from "../config";
import type { GetGroupCard } from "./group";
import type { GetSimpleCard } from "./simple";

type GetCards<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TAdvanced extends boolean = false,
  TExtra = unknown,
> =
  | ((
      props?: DefineFnProps,
    ) => GetCardsImpl<TConfig, TFields, TAdvanced, true> & TExtra)
  | (GetCardsImpl<TConfig, TFields, TAdvanced> & TExtra);

type GetCardsImpl<
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
  TAdvanced extends boolean = false,
  TInternal extends boolean = false,
  TFunc extends boolean = false,
> =
  | GetGroupCard<TConfig, TFields, TAdvanced, TInternal, TFunc>
  | GetSimpleCard<TConfig, TFields, TAdvanced, TInternal, TFunc>;

export type { GetCards, GetCardsImpl };
export type { GetCardBase, Header, NormalCardItem } from "./common";
export type {
  GroupCardComponent,
  GroupCardProps,
  SimpleCardObject,
  SimpleCardProps,
} from "./component";
export type {
  GetGroupCard,
  GroupCardBase,
  GroupCardList,
  GroupCardNormal,
} from "./group";
export type { GetSimpleCard } from "./simple";
