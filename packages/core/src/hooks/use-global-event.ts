import type { EventName } from "@/constants";
import type { FieldArrayEvent } from "@/types";
import type { FieldValues } from "react-hook-form";

import { useEffect } from "react";

const useMfbGlobalEvent = <
  TFields extends FieldValues,
  TFormId extends string = string,
>({
  disabled,
  eventName,
  handler,
}: {
  disabled?: boolean;
  eventName: EventName;
  handler: (event: CustomEventInit<FieldArrayEvent<TFields, TFormId>>) => void;
}) => {
  useEffect(() => {
    if (disabled) return;
    window.addEventListener(eventName, handler);

    return () => {
      window.removeEventListener(eventName, handler);
    };
  }, [disabled, eventName, handler]);
};

export { useMfbGlobalEvent };
