import type { ItemArray, Validator } from "@mfb/types";
import type { FieldValues } from "react-hook-form";

import { ajvResolver } from "@hookform/resolvers/ajv";
import { MfbValidator } from "@mfb/validator";
import { fullFormats } from "ajv-formats/dist/formats";

class MfbAjvPlugin extends MfbValidator {
  public resolve = <TFields extends FieldValues>(items: ItemArray<TFields>) => {
    return ajvResolver<TFields>(this.getSchema<TFields>(items), {
      $data: true,
      formats: fullFormats,
    });
  };
}

export { MfbAjvPlugin };
