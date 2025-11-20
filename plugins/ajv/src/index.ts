import type { AjvError } from "@hookform/resolvers/ajv";
import type { ItemArray, Validator } from "@mfb/types";
import type { DefinedError, JSONSchemaType, Options } from "ajv";
import type { FormatName } from "ajv-formats";
import type { Resolver } from "react-hook-form";
import type { FieldError, FieldValues } from "react-hook-form";

import { toNestErrors, validateFieldsNatively } from "@hookform/resolvers";
import { isNullOrUndefined } from "@mfb/utils";
import { MfbValidator } from "@mfb/validator";
import Ajv from "ajv";
import ajvErrors from "ajv-errors";
import addFormats from "ajv-formats";
import { appendErrors } from "react-hook-form";

class MfbAjvPlugin<TFormat extends string>
  extends MfbValidator<TFormat>
  implements Validator<TFormat>
{
  static defaultOptions: Options = {
    $data: true,
    allErrors: true,
    validateSchema: true,
  };
  private ajv: Ajv;

  constructor(options?: Options, formats?: Array<FormatName>) {
    super();
    const ajv = new Ajv(
      Object.assign({}, MfbAjvPlugin.defaultOptions, options),
    );
    addFormats(ajv, { formats, keywords: true });
    ajvErrors(ajv);

    this.ajv = ajv;
  }

  private parseErrorSchema = (
    ajvErrors: AjvError[],
    validateAllFieldCriteria: boolean,
  ) => {
    const parsedErrors: Record<string, FieldError> = {};

    const reduceError = (error: AjvError) => {
      // Ajv will return empty instancePath when require error
      if (error.keyword === "required") {
        error.instancePath += `/${error.params.missingProperty}`;
      }

      // `/deepObject/data` -> `deepObject.data`
      const path = error.instancePath.substring(1).replace(/\//g, ".");

      if (!parsedErrors[path]) {
        parsedErrors[path] = {
          message: error.message,
          type: error.keyword,
        };
      }

      if (validateAllFieldCriteria) {
        const types = parsedErrors[path].types;
        const messages = types && types[error.keyword];

        parsedErrors[path] = appendErrors(
          path,
          validateAllFieldCriteria,
          parsedErrors,
          error.keyword,
          messages
            ? ([] as string[]).concat(messages as string[], error.message || "")
            : error.message,
        ) as FieldError;
      }
    };

    for (let index = 0; index < ajvErrors.length; index += 1) {
      const error = ajvErrors[index];

      if (isNullOrUndefined(error)) continue;

      if (error.keyword === "errorMessage") {
        error.params.errors.forEach((originalError) => {
          originalError.message = error.message;
          reduceError(originalError);
        });
      } else {
        reduceError(error);
      }
    }

    return parsedErrors;
  };

  private resolver = <TFields extends FieldValues>(
    schema: JSONSchemaType<TFields>,
  ): Resolver<TFields> => {
    return async (values, _, options) => {
      const validate = this.ajv.compile(schema);

      const valid = validate(values);

      if (options.shouldUseNativeValidation)
        validateFieldsNatively({}, options);

      // TODO: add ajv-i18n
      return valid
        ? { errors: {}, values }
        : {
            errors: toNestErrors(
              this.parseErrorSchema(
                validate.errors as DefinedError[],
                !options.shouldUseNativeValidation &&
                  options.criteriaMode === "all",
              ),
              options,
            ),
            values: {},
          };
    };
  };

  public resolve = <TFields extends FieldValues>(
    items: ItemArray<TFields, TFormat>,
  ) => {
    const schema = this.getSchema<TFields>(items);

    return this.resolver<TFields>(schema as JSONSchemaType<TFields>);
  };
}

export { MfbAjvPlugin };
export type { FormatName };
