import type {
  ArrayValidation,
  BooleanValidation,
  Item,
  ItemArray,
  NumericValidation,
  ObjectValidation,
  Properties,
  StringValidation,
  Validation,
} from "@mfb/types";
import type { FieldValues } from "react-hook-form";

import {
  deepMerge,
  isFunction,
  isNullOrUndefined,
  stringToPath,
} from "@mfb/utils";

class MfbValidator<TFormat extends string> {
  private parseItem = <TFields extends FieldValues>(
    item: Item<TFields, (string & {}) | TFormat>,
  ) => {
    let schema: null | Properties<(string & {}) | TFormat> = null;
    let required: Array<string> = [];

    if (!isNullOrUndefined(item.inputs)) {
      [schema, required] = this.parse(item.inputs);
    }
    if (!isNullOrUndefined(item.list)) {
      [schema, required] = this.parse(item.list);
    }

    if (!isNullOrUndefined(schema)) {
      if (isListItem(item)) {
        if (item.validation && item.validation.type === "array") {
          return this.parseArray(item.validation, schema, required);
        } else {
          return this.parseArray({ type: "array" }, schema, required);
        }
      } else {
        const validation = {
          ...(isNullOrUndefined(item.validation)
            ? { type: "object" as const }
            : item.validation),
          required,
        };

        if (validation.type === "object")
          return this.parseObject(validation, schema);
      }
    }

    if (isNullOrUndefined(item.validation)) return;

    switch (item.validation.type) {
      case "array":
        return this.parseArray(item.validation, {}, []);
      case "boolean":
        return this.parseBoolean(item.validation);
      case "number":
        return this.parseNumeric(item.validation);
      case "object":
        return this.parseObject({ ...item.validation, required }, {});
      case "string":
        return this.parseString(item.validation);
      default:
        return undefined;
    }
  };
  private parse = <TFields extends FieldValues>(
    items: ItemArray<TFields, (string & {}) | TFormat>,
  ): [Properties<(string & {}) | TFormat>, Array<string>] => {
    const result: Properties<(string & {}) | TFormat> = {};
    const requiredList: Array<string> = [];

    items.forEach((_item) => {
      const item = isFunction(_item) ? _item() : _item;

      const validation = this.parseItem(item);

      if (isNullOrUndefined(item.name)) return;

      const path = stringToPath(item.name);
      const lastKey = path[path.length - 1];
      if (isNullOrUndefined(lastKey)) return;

      if (path.length === 1) {
        if (!isNullOrUndefined(validation)) {
          result[lastKey] = validation;
        }

        if (item.required && !requiredList.includes(item.name))
          requiredList.push(lastKey);
      } else {
        // TODO: what happens to digit keys?
        if (isNullOrUndefined(validation)) {
          return;
        }

        if (item.required && path[0]) requiredList.push(path[0]);

        const _result = this.setToPath({
          isRequired: Boolean(item.required),
          path,
          target: result,
          validation,
        });

        deepMerge(result, _result);
      }
    });

    return [result, requiredList];
  };

  private parseObject = (
    validation: ObjectValidation<(string & {}) | TFormat>,
    schema: Properties<(string & {}) | TFormat>,
  ) => {
    return {
      ...validation,
      properties: schema,
    };
  };
  public getSchema = <TFields extends FieldValues>(
    items: ItemArray<TFields, (string & {}) | TFormat>,
  ) => {
    const [schema, required] = this.parse(items);

    return this.parseObject({ required, type: "object" }, schema);
  };

  private parseArray = (
    validation: ArrayValidation<(string & {}) | TFormat>,
    schema: Properties<(string & {}) | TFormat>,
    required: Array<string>,
  ) => {
    return {
      ...validation,
      items: this.parseObject({ required, type: "object" }, schema),
    };
  };

  private parseBoolean = (validation: BooleanValidation) => {
    return { ...validation };
  };

  private parseNumeric = (validation: NumericValidation) => {
    return { ...validation };
  };

  private parseString = (
    validation: StringValidation<(string & {}) | TFormat>,
  ) => {
    return {
      ...validation,
    };
  };

  private setToPath = ({
    isLast,
    isRequired,
    path,
    target,
    validation,
  }: {
    isLast?: boolean;
    isRequired: boolean;
    path: string[];
    target: Properties<(string & {}) | TFormat>;
    validation: Validation<(string & {}) | TFormat>;
  }): Properties<(string & {}) | TFormat> => {
    if (path.length === 0) return target;
    const key = path.shift();
    if (!key) return target;

    const current = target[key];
    const required =
      current && "required" in current ? current.required || [] : [];

    target[key] = isLast
      ? validation
      : this.parseObject(
          {
            required: [
              ...new Set<string>(
                required.concat(isRequired && path[0] ? [path[0]] : []),
              ),
            ],
            type: "object",
          },
          this.setToPath({
            isLast: path.length === 1,
            isRequired,
            path,
            target:
              (current && "properties" in current && current.properties) || {},
            validation,
          }),
        );

    return target;
  };
}

function isListItem<TFields extends FieldValues>(item: Item<TFields>) {
  return item.type === "list" || item.variant === "list";
}

export { MfbValidator };
