import type { FieldArrayEvent, FormAction } from "@/types";
import type { ArrayPath, FieldValues } from "react-hook-form";

import { eventNames } from "@/constants";

// TODO: use factory design pattern for creating different events
const createFieldArrayEvent = <TFields extends FieldValues>(
  name: ArrayPath<TFields>,
  action: FormAction<TFields>
) => {
  return new CustomEvent<FieldArrayEvent<TFields>>(eventNames["field-array"], {
    detail: {
      action,
      name,
    },
  });
};

const dispatchFieldArray = <TFields extends FieldValues>(
  name: ArrayPath<TFields>,
  action: FormAction<TFields>
) => {
  const event = createFieldArrayEvent(name, action);

  window.dispatchEvent(event);
};

export { dispatchFieldArray, eventNames };
