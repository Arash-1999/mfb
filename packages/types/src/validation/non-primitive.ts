import type { PrimitiveValiditon } from "./primitive";

interface ArrayBaseKeywords {
  maxItems?: number;
  minItems?: number;
}
interface ArrayKeywords<TFormats extends string> extends ArrayBaseKeywords {
  items?: Validation<TFormats>;
  prefixItems?: Array<Validation<TFormats>>;
}

interface ArrayValidation<TFormats extends string>
  extends ArrayKeywords<TFormats> {
  type: "array";
}

type NonPrimitiveValidation<TFormats extends string> =
  | ArrayValidation<TFormats>
  | ObjectValidation<TFormats>;

interface ObjectKeywords<TFormats extends string> {
  properties?: Properties<TFormats>;
  required?: Array<string>;
}
interface ObjectValidation<TFormats extends string>
  extends ObjectKeywords<TFormats> {
  type: "object";
}
type Properties<TFormats extends string> = Record<
  PropertyKey,
  Validation<TFormats>
>;

type Validation<TFormats extends string> =
  | NonPrimitiveValidation<TFormats>
  | PrimitiveValiditon<TFormats>;

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
