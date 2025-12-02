import { FieldArrayOverrideProps } from "@mfb/core";
import { useEffect } from "react";
import {
  useFieldArray,
  type ArrayPath,
  type FieldValues,
} from "react-hook-form";

const MfbFieldArray = <TFields extends FieldValues>({
  // disabled,
  // id,
  name,
  render,
}: FieldArrayOverrideProps<TFields>) => {
  const { fields, replace } = useFieldArray<TFields>({
    name: name as ArrayPath<TFields>,
  });

  useEffect(() => {
    replace([{}]);
  }, [replace]);

  // const handler = useCallback(
  //   (event: CustomEventInit<FieldArrayEvent<TFields, TFormId>>) => {
  //     const { detail } = event;
  //     if (detail && detail.id === id && detail.name === name) {
  //       action(detail.action);
  //     }
  //   },
  //   [action, id, name],
  // );
  //
  // useMfbGlobalEvent<TFields, TFormId>({
  //   disabled,
  //   eventName: eventNames["field-array"],
  //   handler,
  // });

  return render(fields);
};

export { MfbFieldArray };
