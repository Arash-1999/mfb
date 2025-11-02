import type { PrimitiveValiditon } from "./primitive";

interface ArrayBaseKeywords {
  maxItems?: number;
  minItems?: number;
}
interface ArrayKeywords extends ArrayBaseKeywords {
  items?: Validation;
  prefixItems?: Array<Validation>;
}

interface ArrayValidation extends ArrayKeywords {
  type: "array";
}

type NonPrimitiveValidation = ArrayValidation | ObjectValidation;

interface ObjectKeywords {
  properties?: Properties;
  required?: Array<string>;
}
interface ObjectValidation extends ObjectKeywords {
  type: "object";
}
type Properties = Record<PropertyKey, Validation>;

type Validation = NonPrimitiveValidation | PrimitiveValiditon;

export type {
  ArrayBaseKeywords,
  ArrayKeywords,
  ArrayValidation,
  NonPrimitiveValidation,
  ObjectKeywords,
  ObjectValidation,
  Properties,
  Validation,
};
