const isNullOrUndefined = (value: unknown): value is null | undefined =>
  value == null;

export { isNullOrUndefined };
