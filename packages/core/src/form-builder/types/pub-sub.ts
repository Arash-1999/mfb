import type { FieldValues, UseFieldArrayReturn } from "react-hook-form";

type FieldArrayActions<TData extends FieldValues> = Omit<
  UseFieldArrayReturn<TData>,
  "fields"
>;

type FormAction<TData extends FieldValues = FieldValues> = {
  [TAction in keyof FieldArrayActions<TData>]: {
    params: Parameters<FieldArrayActions<TData>[TAction]>;
    type: TAction;
  };
}[keyof FieldArrayActions<TData>];

export type { FieldArrayActions, FormAction };
