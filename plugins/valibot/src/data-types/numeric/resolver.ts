import * as v from "valibot";

import type { NumericValidation } from "./type";

const toValibotNumeric = (validation: NumericValidation) => {
  const items: [
    v.BaseSchema<number, number, v.BaseIssue<unknown>>,
    ...v.PipeItem<number, number, v.BaseIssue<unknown>>[],
  ] = [v.number()];

  if (validation.type === "integer") {
    items.push(v.integer());
  }

  if (validation.exclusiveMaximum) {
    items.push(v.maxValue(validation.exclusiveMaximum));
  }

  if (validation.exclusiveMinimum) {
    items.push(v.minValue(validation.exclusiveMinimum));
  }

  if (validation.minimum) {
    items.push(v.gtValue(validation.minimum));
  }
  if (validation.maximum) {
    items.push(v.ltValue(validation.maximum));
  }

  if (validation.multipleOf) {
    items.push(v.multipleOf(validation.multipleOf));
  }
};

export { toValibotNumeric };
