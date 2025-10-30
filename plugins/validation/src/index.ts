import type {
  ArrayValidation,
  Item,
  ItemArray,
  ObjectValidation,
  Properties,
  StringValidation,
  Validation,
  Validator,
} from "@mfb/types";
import type { FieldValues } from "react-hook-form";

import { ajvResolver } from "@hookform/resolvers/ajv";
import { isFunction, isKey, isNullOrUndefined, stringToPath } from "@mfb/utils";
import { get } from "react-hook-form";

class MfbValidator implements Validator {
  private parseItem = <TFields extends FieldValues>(item: Item<TFields>) => {
    let schema: null | Properties = null;
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
          return this.parseArray(item.validation, schema);
        } else {
          return this.parseArray({ type: "array" }, schema);
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
        return this.parseArray(item.validation, {});
      case "object":
        return this.parseObject(item.validation, {});
      case "string":
        return this.parseString(item.validation);
      default:
        return undefined;
    }
  };
  private parse = <TFields extends FieldValues>(
    items: ItemArray<TFields>,
  ): [Properties, Array<string>] => {
    const result: Properties = {};
    const requiredList: Array<string> = [];

    items.forEach((_item) => {
      const item = isFunction(_item) ? _item() : _item;

      const validation = this.parseItem(item);

      if (isNullOrUndefined(item.name)) return;

      if (isKey(item.name)) {
        if (!isNullOrUndefined(validation)) {
          result[item.name] = validation;
        }

        if (item.required && !requiredList.includes(item.name))
          requiredList.push(item.name);
      } else {
        const path = stringToPath(item.name);
        const lastKey = path[path.length - 1];
        if (isNullOrUndefined(lastKey)) return;
        const currentObject = get(result, path.join(".properties.")) || {};
        console.log(currentObject);

        // TODO: what happens to digit keys?
        if (isNullOrUndefined(validation)) {
          return;
        }
        // const a = path
        //   .slice(0, -1)
        //   .reverse()
        //   .reduce(
        //     (acc, key, index) => {
        //       const currentPath = path
        //         .slice(0, -1 - index)
        //         .join(".properties.");
        //       const currentObject = get(result, currentPath, {});
        //       return this.parseObject(
        //         {
        //           required: [...(currentObject.required || []), key],
        //           type: "object",
        //         },
        //         { [key]: acc },
        //       );
        //     },
        //     this.parseObject(
        //       { required: [lastKey], type: "object" },
        //       { [lastKey]: validation },
        //     ),
        //   );
        // console.log("something", result, a.properties);
      }
    });

    return [result, requiredList];
  };

  private parseObject = (validation: ObjectValidation, schema: Properties) => {
    return {
      ...validation,
      properties: schema,
    };
  };

  public getSchema = <TFields extends FieldValues>(
    items: ItemArray<TFields>,
  ) => {
    const [schema, required] = this.parse(items);

    return this.parseObject({ required, type: "object" }, schema);
  };

  public resolve = <TFields extends FieldValues>(items: ItemArray<TFields>) => {
    return ajvResolver<TFields>(this.getSchema<TFields>(items), {
      $data: true,
    });
  };

  private parseArray = (validation: ArrayValidation, schema: Properties) => {
    return {
      ...validation,
      items: this.parseObject({ type: "object" }, schema),
    };
  };

  private parseString = (validation: StringValidation) => {
    return {
      ...validation,
    };
  };

  private setToPath = (
    target: Properties,
    path: string[],
    validation: Validation,
    isLast?: boolean,
  ): Properties => {
    if (path.length === 0) return target;
    const key = path.shift();
    if (!key) return target;

    const current = target[key];

    target[key] = isLast
      ? validation
      : this.parseObject(
          { type: "object" },
          this.setToPath(
            (current && "properties" in current && current.properties) || {},
            path,
            validation,
            path.length === 1,
          ),
        );

    return target;
  };
}

function isListItem<TFields extends FieldValues>(item: Item<TFields>) {
  return item.type === "list" || item.variant === "list";
}

export { MfbValidator };
