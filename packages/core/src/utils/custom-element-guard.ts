import type { FormBuilderConfig } from "@mfb/types";
import type { CustomElement } from "@mfb/types";
import type { FieldValues } from "react-hook-form";

import { isFunction } from "@mfb/utils";

const customElementGuard = <
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
>(
  item: unknown,
): item is CustomElement<TConfig, TFields> => {
  return (
    !!item &&
    typeof item === "object" &&
    "type" in item &&
    item.type === "custom-element" &&
    "element" in item &&
    isFunction(item.element)
  );
};

export { customElementGuard };
