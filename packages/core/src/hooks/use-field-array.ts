import type { FieldArrayValues, FormAction } from "@mfb/types";
import type { ArrayPath, FieldValues } from "react-hook-form";

import { useCallback } from "react";
import { useFieldArray } from "react-hook-form";

const useMfbFieldArray = <TFields extends FieldValues>({
  fieldArray,
  name,
}: {
  fieldArray: FieldArrayValues<TFields>;
  name: ArrayPath<TFields>;
}) => {
  const { fields, ...methods } = useFieldArray<TFields>({
    name,
  });

  const action = useCallback(
    (event: FormAction<TFields>) => {
      switch (event.type) {
        case "append": {
          if (typeof event.params !== "undefined") {
            const [value, ...rest] = event.params;
            if (value === null) {
              methods.append(fieldArray[name], ...rest);
            } else {
              methods.append(value, ...rest);
            }
          } else {
            methods.append(fieldArray[name]);
          }
          break;
        }

        case "insert": {
          const [index, value, ...rest] = event.params;

          if (value) {
            methods.insert(index, value, ...rest);
          } else {
            methods.insert(index, fieldArray[name], ...rest);
          }
          break;
        }

        case "move":
          methods.move(...event.params);
          break;

        case "prepend": {
          if (typeof event.params !== "undefined") {
            const [value, ...rest] = event.params;
            if (value === null) {
              methods.prepend(fieldArray[name], ...rest);
            } else {
              methods.prepend(value, ...rest);
            }
          } else {
            methods.prepend(fieldArray[name]);
          }
          break;
        }

        case "remove":
          methods.remove(...event.params);
          break;

        case "replace":
          methods.replace(...event.params);
          break;

        case "swap":
          methods.swap(...event.params);
          break;

        case "update":
          methods.update(...event.params);
          break;
      }
    },
    [fieldArray, methods, name],
  );
  return { action, fields };
};

export { useMfbFieldArray };
