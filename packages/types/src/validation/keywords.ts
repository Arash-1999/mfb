import type { DataRef } from "./common";

interface ArrayBaseKeywords {
  maxItems?: DataRef | number;
  minItems?: DataRef | number;
}
interface ArrayKeywords<TFormat extends string> extends ArrayBaseKeywords {
  items?: Validation<TFormat>;
  prefixItems?: Array<Validation<TFormat>>;
}
interface ArrayValidation<TFormat extends string>
  extends ArrayKeywords<TFormat>,
    BaseSchema<TFormat> {
  type: "array";
}

interface BaseSchema<TFormat extends string> {
  allOf?: Partial<Validation<TFormat>>;
  anyOf?: Partial<Validation<TFormat>>;
  const?: unknown;
  else?: Partial<Validation<TFormat>>;
  enum?: Array<unknown>;
  if?: Partial<Validation<TFormat>>;
  not?: Partial<Validation<TFormat>>;
  oneOf?: Partial<Validation<TFormat>>;
  then?: Partial<Validation<TFormat>>;
}

interface BooleanValidation {
  type: "boolean";
}

type NonPrimitiveValidation<TFormat extends string> =
  | ArrayValidation<TFormat>
  | ObjectValidation<TFormat>;

interface NumericKeywords {
  exclusiveMaximum?: DataRef | number;
  exclusiveMinimum?: DataRef | number;
  maximum?: DataRef | number;
  minimum?: DataRef | number;
  multipleOf?: DataRef | number;
}
interface NumericValidation<TFormat extends string>
  extends BaseSchema<TFormat>,
    NumericKeywords {
  type: "integer" | "number";
}

interface ObjectKeywords<TFormat extends string> {
  properties?: Properties<TFormat>;
  required?: Array<string>;
}
interface ObjectValidation<TFormat extends string>
  extends BaseSchema<TFormat>,
    ObjectKeywords<TFormat> {
  type: "object";
}

type PrimitiveValiditon<TFormat extends string> =
  | BooleanValidation
  | NumericValidation<TFormat>
  | StringValidation<TFormat>;

type Properties<TFormat extends string> = Record<
  PropertyKey,
  Validation<TFormat>
>;

interface StringKeywords<TFormat extends string> extends BaseSchema<TFormat> {
  format?: DataRef | (string & {}) | TFormat;
  formatExclusiveMaximum?: DataRef | string;
  formatExclusiveMinimum?: DataRef | string;
  formatMaximum?: DataRef | string;
  formatMinimum?: DataRef | string;
  maxLength?: DataRef | number;
  minLength?: DataRef | number;
  pattern?: DataRef | string;
}

interface StringValidation<TFormat extends string>
  extends StringKeywords<TFormat> {
  type: "string";
}

type Validation<TFormat extends string> =
  | NonPrimitiveValidation<TFormat>
  | PrimitiveValiditon<TFormat>;

export type {
  ArrayBaseKeywords,
  ArrayKeywords,
  ArrayValidation,
  BooleanValidation,
  NonPrimitiveValidation,
  NumericKeywords,
  NumericValidation,
  ObjectKeywords,
  ObjectValidation,
  PrimitiveValiditon,
  Properties,
  StringKeywords,
  StringValidation,
  Validation,
};
