import type { FieldArrayValues, FormAction } from "@/types";
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
          const [value, ...rest] = event.params;
          // TODO: add null type to first param
          if (value) {
            methods.append(value, ...rest);
          } else {
            methods.append(fieldArray[name], ...rest);
          }
          break;
        }

        case "insert":
          methods.insert(...event.params);
          break;

        case "move":
          methods.move(...event.params);
          break;

        case "prepend":
          methods.prepend(...event.params);
          break;

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
    [methods],
  );
  return { action, fields };
};

export { useMfbFieldArray };
