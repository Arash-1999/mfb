interface ArrayBaseKeywords {
  maxItems?: number;
  minItems?: number;
}
interface ArrayKeywords extends ArrayBaseKeywords {
  items?: [];
  prefixItems?: [];
}

interface ArrayValidation extends ArrayKeywords {
  type: "array";
}

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

interface ObjectKeywords {
  properties?: Record<PropertyKey, Validation>;
}
interface ObjectValidation extends ObjectKeywords {
  type: "object";
}

interface StringKeywords {
  format?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
}
interface StringValidation extends StringKeywords {
  type: "string";
}

type Validation =
  | ArrayValidation
  | BooleanValidation
  | NumericValidation
  | ObjectValidation
  | StringValidation;

export type {
  ArrayValidation,
  BooleanValidation,
  NumericValidation,
  ObjectValidation,
  StringValidation,
  Validation,
};
