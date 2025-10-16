import type {
  ArrayPath,
  FieldArray,
  FieldArrayMethodProps,
  FieldValues,
  UseFieldArrayReturn,
} from "react-hook-form";

type ActionOverrideKey = "append" | "insert" | "prepend";

interface AppendAction<TFields extends FieldValues> {
  params?: [
    Array<FieldArray<TFields>> | FieldArray<TFields> | null,
    FieldArrayMethodProps?,
  ];
  type: "append";
}

type DefaultFormAction<TFields extends FieldValues> = Omit<
  FieldArrayActions<TFields>,
  ActionOverrideKey
>;

type FieldArrayActions<TFields extends FieldValues> = Omit<
  UseFieldArrayReturn<TFields>,
  "fields"
>;

type FieldArrayEvent<
  TFields extends FieldValues,
  TFormId extends string = string,
> = {
  action: AppendAction<TFields> | FormAction<TFields>;
  id: TFormId;
  name: ArrayPath<TFields>;
};

type FormAction<TFields extends FieldValues = FieldValues> =
  | AppendAction<TFields>
  | InsertAction<TFields>
  | PrependAction<TFields>
  | {
      [TAction in keyof DefaultFormAction<TFields>]: {
        params: Parameters<FieldArrayActions<TFields>[TAction]>;
        type: TAction;
      };
    }[keyof DefaultFormAction<TFields>];

interface InsertAction<TFields extends FieldValues> {
  params: [
    number,
    (Array<FieldArray<TFields>> | FieldArray<TFields> | null)?,
    FieldArrayMethodProps?,
  ];
  type: "insert";
}

type MfbState = FormAction | null;

interface PrependAction<TFields extends FieldValues> {
  params?: [
    Array<FieldArray<TFields>> | FieldArray<TFields> | null,
    FieldArrayMethodProps?,
  ];
  type: "prepend";
}

export type { FieldArrayActions, FieldArrayEvent, FormAction, MfbState };
