import type { FormBuilderConfig, GetCards, GetInputs } from "@/types";
import type { FieldValues } from "react-hook-form";

// TODO: check guards

const advancedCardGuard = <
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
>(
  obj: unknown
): obj is GetCards<TConfig, TFields, true> => {
  return (
    !!obj && typeof obj === "object" && "type" in obj && obj.type !== "list"
  );
};

const advancedInputGuard = <
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
>(
  obj: unknown
): obj is GetInputs<TConfig, TFields> => {
  return (
    !!obj &&
    typeof obj === "object" &&
    "type" in obj &&
    ((obj.type === "list" && ("list" in obj || "inputs" in obj)) ||
      (obj.type !== "list" && !("list" in obj) && !("inputs" in obj)))
  );
};

export { advancedCardGuard, advancedInputGuard };
