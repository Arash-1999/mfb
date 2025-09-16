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

export type { NumericKeywords, NumericValidation };
