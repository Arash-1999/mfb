import type { ArrayPath, FieldValues, UseFieldArrayReturn } from "react-hook-form";

type FieldArrayActions<TData extends FieldValues> = Omit<
  UseFieldArrayReturn<TData>,
  "fields"
>;

type FieldArrayEvent<TFields extends FieldValues> = {
  action: FormAction<TFields>;
  name: ArrayPath<TFields>;
};

type FormAction<TData extends FieldValues = FieldValues> = {
  [TAction in keyof FieldArrayActions<TData>]: {
    params: Parameters<FieldArrayActions<TData>[TAction]>;
    type: TAction;
  };
}[keyof FieldArrayActions<TData>];

type MfbState = FormAction | null;


export type { FieldArrayActions, FieldArrayEvent, FormAction, MfbState };
