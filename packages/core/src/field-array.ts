import type { FieldArrayEvent, FieldArrayOverrideProps } from "@/types";
import type { ArrayPath, FieldValues } from "react-hook-form";

import { eventNames } from "@/constants";
import { useMfbFieldArray, useMfbGlobalEvent } from "@/hooks";
import { useCallback } from "react";

const MfbFieldArray = <TFields extends FieldValues, TFormId extends string>({
  disabled,
  id,
  name,
  render,
}: FieldArrayOverrideProps<TFields>) => {
  const { action, fields } = useMfbFieldArray<TFields>({
    name: name as ArrayPath<TFields>,
  });

  const handler = useCallback(
    (event: CustomEventInit<FieldArrayEvent<TFields, TFormId>>) => {
      const { detail } = event;
      if (detail && detail.id === id && detail.name === name) {
        action(detail.action);
      }
    },
    [action, id, name],
  );

  useMfbGlobalEvent<TFields, TFormId>({
    disabled,
    eventName: eventNames["field-array"],
    handler,
  });

  return render(fields);
};

export { MfbFieldArray };
