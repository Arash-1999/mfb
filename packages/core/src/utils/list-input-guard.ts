import type { FormBuilderConfig, ListInput } from "@/form-builder";

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
