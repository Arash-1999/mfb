import type {
  ActionInput,
  DefineFnProps,
  FormBuilderConfig,
  ListInput,
} from "@/types";
import type { FieldValues } from "react-hook-form";

const listActionGuard = <
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
>(
  obj: unknown,
): obj is
  | ((props?: DefineFnProps) => ActionInput<TConfig, TFields>)
  | ActionInput<TConfig, TFields> => {
  if (!obj) return false;
  const parsedObj = typeof obj === "function" ? obj() : obj;
  return (
    !!parsedObj &&
    typeof parsedObj === "object" &&
    "actionType" in parsedObj &&
    typeof parsedObj.actionType === "string"
  );
};

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
export { listActionGuard, listInputGuard };
