import type { FormBuilderConfig } from "./config";
import type { GetExtraConditions } from "./utils";

interface CalcItem<TConfig extends FormBuilderConfig>
  extends Condition<GetExtraConditions<TConfig>> {
  current: unknown;
}

type Condition<TExtraKey extends string> = {
  condition: ConditionKey | TExtraKey;
  value: unknown;
};

type ConditionKey =
  | "eq"
  | "is-first-index"
  | "is-last-index"
  | "not-eq"
  | "not-first-index"
  | "not-last-index";

export type { CalcItem, Condition };
