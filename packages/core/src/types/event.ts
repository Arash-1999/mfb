import type { ArrayPath, FieldValues, UseFieldArrayReturn } from "react-hook-form";

type FieldArrayActions<TFields extends FieldValues> = Omit<
  UseFieldArrayReturn<TFields>,
  "fields"
>;

type FieldArrayEvent<TFields extends FieldValues> = {
  action: FormAction<TFields>;
  name: ArrayPath<TFields>;
};

type FormAction<TFields extends FieldValues = FieldValues> = {
  [TAction in keyof FieldArrayActions<TFields>]: {
    params: Parameters<FieldArrayActions<TFields>[TAction]>;
    type: TAction;
  };
}[keyof FieldArrayActions<TFields>];

type MfbState = FormAction | null;


export type { FieldArrayActions, FieldArrayEvent, FormAction, MfbState };
