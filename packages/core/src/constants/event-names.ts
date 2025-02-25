const eventNames = {
  "field-array": "mfb:field-array",
} as const;

type EventName = (typeof eventNames)[keyof typeof eventNames];

export { eventNames };
export type { EventName };
