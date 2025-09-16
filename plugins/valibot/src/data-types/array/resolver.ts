import * as v from "valibot";

import type { ArrayBaseKeywords, ArrayValidation } from "./type";

type PipeBase = [
  v.BaseSchema<v.LengthInput, v.LengthInput, v.BaseIssue<unknown>>,
  ...v.PipeItem<v.LengthInput, v.LengthInput, v.BaseIssue<unknown>>[],
];

const parseArrayBase = <
  TKeywords extends ArrayBaseKeywords,
  TPipe extends PipeBase,
>(
  validaiton: TKeywords,
  list: TPipe
) => {
  if (validaiton.minItems) {
    list.push(v.minLength(validaiton.minItems));
  }
};

const toValibot = () => {
  return v.pipe(v.string(), v.minLength(3));
};

const toValibotArray = (
  validation: ArrayValidation
  // TODO: use schema argument
  //   schema: v.ArraySchema<never, undefined>
) => {
  let items: null | PipeBase = null;
  if (
    Array.isArray(validation.prefixItems) &&
    validation.prefixItems.length > 0
  ) {
    if (Array.isArray(validation.items)) {
      items = [
        v.tupleWithRest(validation.prefixItems.map(toValibot), toValibot()),
      ];
    } else {
      items = [v.tuple(validation.prefixItems.map(toValibot))];
    }
  } else if (Array.isArray(validation.items) && validation.items.length > 0) {
    items = [v.array(toValibot())];
  }

  if (items === null) return;

  parseArrayBase(validation, items);

  return v.pipe(...items);
};

export { toValibotArray };
