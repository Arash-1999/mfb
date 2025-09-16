import * as v from "valibot";

import type { StringValidation } from "./type";

const toValibotString = (validation: StringValidation) => {
  const items: [
    v.BaseSchema<string, string, v.BaseIssue<unknown>>,
    ...v.PipeItem<string, string, v.BaseIssue<unknown>>[],
  ] = [v.string()];

  if (validation.minLength) {
    items.push(v.minLength(validation.minLength));
  }

  if (validation.maxLength) {
    items.push(v.maxLength(validation.maxLength));
  }

  if (validation.pattern) {
    items.push(v.regex(new RegExp(validation.pattern)));
  }

  if (validation.format) {
    console.log(validation.format);
  }

  return v.pipe(...items);
};

export { toValibotString };
