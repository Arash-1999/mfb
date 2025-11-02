import { isNullOrUndefined } from "./is-null-or-undefined";
import { isObjectType } from "./is-object";

type Primitive = bigint | boolean | null | number | string | symbol | undefined;

const isPrimitive = (value: unknown): value is Primitive =>
  isNullOrUndefined(value) || !isObjectType(value);

export { isPrimitive };
export type { Primitive };
