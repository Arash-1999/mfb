import type { FormAction } from "@/types";
import type { ArrayPath, FieldValues } from "react-hook-form";

import { useCallback } from "react";
import { useFieldArray } from "react-hook-form";

const useMfbFieldArray = <TFields extends FieldValues>({
  name,
}: {
  name: ArrayPath<TFields>;
}) => {
  const { fields, ...methods } = useFieldArray<TFields>({
    name,
  });

  const action = useCallback(
    (event: FormAction<TFields>) => {
      switch (event.type) {
        case "append":
          methods.append(...event.params);
          break;

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
    [methods]
  );
  return { action, fields };
};

export { useMfbFieldArray };
