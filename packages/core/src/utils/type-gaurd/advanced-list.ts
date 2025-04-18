import type { FormBuilderConfig, GetCards, GetInputs } from "@/types";
import type { FieldValues } from "react-hook-form";

// TODO: check guards

const advancedCardGuard = <
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
>(
  obj: unknown,
): obj is GetCards<TConfig, TFields, true> => {
  return (
    !!obj && typeof obj === "object" && "type" in obj && obj.type !== "list"
  );
  // return Boolean(
  //   obj && typeof obj === "object" && "list" in obj && Array.isArray(obj.list),
  // );
};

const advancedInputGuard = <
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
>(
  obj: unknown,
): obj is GetInputs<TConfig, TFields> => {
  return false;
};

export { advancedCardGuard, advancedInputGuard };
