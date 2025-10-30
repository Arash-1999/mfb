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

type PrimitiveValiditon =
  | BooleanValidation
  | NumericValidation
  | StringValidation;

interface StringKeywords {
  format?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
}

interface StringValidation extends StringKeywords {
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
