import type { FormBuilderConfig, ListInput } from "@/types";

const listInputGuard = <TConfig extends FormBuilderConfig>(
  input: unknown,
): input is ListInput<TConfig> => {
  return (
    !!input &&
    typeof input === "object" &&
    "type" in input &&
    input.type === "list"
  );
};

export { listInputGuard };
