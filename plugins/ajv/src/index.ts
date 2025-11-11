import type { ItemArray, Validator } from "@mfb/types";
import type { Options } from "ajv";
import type { FormatName } from "ajv-formats";
import type { FieldValues } from "react-hook-form";

import { ajvResolver } from "@hookform/resolvers/ajv";
import { MfbValidator } from "@mfb/validator";
import { fullFormats } from "ajv-formats/dist/formats";

class MfbAjvPlugin<TFormat extends string>
  extends MfbValidator<TFormat>
  implements Validator<TFormat>
{
  public resolve = <TFields extends FieldValues>(
    items: ItemArray<TFields, TFormat>,
    options?: Options,
  ) => {
    return ajvResolver<TFields>(this.getSchema<TFields>(items), {
      $data: true,
      formats: fullFormats,
      ...options,
    });
  };
}

export { MfbAjvPlugin };
export type { FormatName };
