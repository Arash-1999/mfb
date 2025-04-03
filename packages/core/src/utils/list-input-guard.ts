import type { FormBuilderConfig, ListInput } from "@/types";
import type { FieldValues } from "react-hook-form";

const listInputGuard = <
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
>(
  input: unknown,
): input is ListInput<TConfig, TFields> => {
  return (
    !!input &&
    typeof input === "object" &&
    "type" in input &&
    input.type === "list"
  );
};

export { listInputGuard };
