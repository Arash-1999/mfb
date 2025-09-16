import * as v from "valibot";

interface StringKeywords {
  format?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
}
interface StringValidation extends StringKeywords {
  type: "string";
}

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
export type { StringValidation };