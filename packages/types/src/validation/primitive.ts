interface BooleanValidation {
  type: "boolean";
}

interface NumericKeywords {
  exclusiveMaximum?: number;
  exclusiveMinimum?: number;
  maximum?: number;
  minimum?: number;
  multipleOf?: number;
}
interface NumericValidation extends NumericKeywords {
  type: "integer" | "number";
}

type PrimitiveValiditon<TFormats extends string> =
  | BooleanValidation
  | NumericValidation
  | StringValidation<TFormats>;

interface StringKeywords<TFormats extends string> {
  format?: (string & {}) | TFormats;
  formatExclusiveMaximum?: string;
  formatExclusiveMinimum?: string;
  formatMaximum?: string;
  formatMinimum?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
}

interface StringValidation<TFormats extends string>
  extends StringKeywords<TFormats> {
  type: "string";
}

export type {
  BooleanValidation,
  NumericKeywords,
  NumericValidation,
  PrimitiveValiditon,
  StringKeywords,
  StringValidation,
};
