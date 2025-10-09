// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const isFunction = (value: unknown): value is Function =>
  typeof value === "function";

export { isFunction };
