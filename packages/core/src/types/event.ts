import type {
  ArrayPath,
  FieldArray,
  FieldArrayMethodProps,
  FieldValues,
  UseFieldArrayReturn,
} from "react-hook-form";

type FieldArrayActions<TFields extends FieldValues> = Omit<
  UseFieldArrayReturn<TFields>,
  "fields"
>;

type FieldArrayEvent<
  TFields extends FieldValues,
  TFormId extends string = string,
> = {
  action: FormAction<TFields> | AppendAction<TFields>;
  id: TFormId;
  name: ArrayPath<TFields>;
};

type ActionOverrideKey = "append" | "prepend" | "insert";

type DefaultFormAction<TFields extends FieldValues> = Omit<
  FieldArrayActions<TFields>,
  ActionOverrideKey
>;

type FormAction<TFields extends FieldValues = FieldValues> =
  | {
      [TAction in keyof DefaultFormAction<TFields>]: {
        params: Parameters<FieldArrayActions<TFields>[TAction]>;
        type: TAction;
      };
    }[keyof DefaultFormAction<TFields>]
  | AppendAction<TFields>
  | InsertAction<TFields>
  | PrependAction<TFields>;

interface AppendAction<TFields extends FieldValues> {
  params?: [
    null | FieldArray<TFields> | Array<FieldArray<TFields>>,
    FieldArrayMethodProps?,
  ];
  type: "append";
}

interface PrependAction<TFields extends FieldValues> {
  params?: [
    null | FieldArray<TFields> | Array<FieldArray<TFields>>,
    FieldArrayMethodProps?,
  ];
  type: "prepend";
}

interface InsertAction<TFields extends FieldValues> {
  params: [
    number,
    (null | FieldArray<TFields> | Array<FieldArray<TFields>>)?,
    FieldArrayMethodProps?,
  ];
  type: "insert";
}

type MfbState = FormAction | null;

export type { FieldArrayActions, FieldArrayEvent, FormAction, MfbState };
