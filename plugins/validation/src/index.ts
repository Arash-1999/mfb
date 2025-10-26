import type { ItemArray, Validator } from "@mfb/types";
import type { FieldValues, Resolver } from "react-hook-form";

class MfbValidator implements Validator {
  resolve = <TFields extends FieldValues>(items: ItemArray<TFields>) => {
    console.log(items);
    return undefined as unknown as Resolver;
  };
}

export { MfbValidator };
