import type { EventName } from "@/constants";
import type { FieldArrayEvent } from "@/types";
import type { FieldValues } from "react-hook-form";

import { useEffect } from "react";

const useMfbGlobalEvent = <TFields extends FieldValues>({
  eventName,
  handler,
}: {
  eventName: EventName;
  handler: (event: CustomEventInit<FieldArrayEvent<TFields>>) => void;
}) => {
  useEffect(() => {
    window.addEventListener(eventName, handler);

    return () => {
      window.removeEventListener(eventName, handler);
    };
  }, [eventName, handler]);
};

export { useMfbGlobalEvent };
