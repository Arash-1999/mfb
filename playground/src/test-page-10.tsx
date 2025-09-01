import * as v from "valibot";

interface StringKeywords {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  format?: string;
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
    items.push(v.minLength(validation.maxLength));
  }

  if (validation.pattern) {
    items.push(v.regex(new RegExp(validation.pattern)));
  }

  if (validation.format) {
    console.log(validation.format);
  }

  return v.pipe(...items);
};

const Page = () => {
  const test_1 = toValibotString({
    type: "string",
    minLength: 3,
    maxLength: 10,
  });

  console.log("fuck: ", v.parse(test_1, "fuck"));
  console.log("fucking_fuck: ", v.parse(test_1, "fucking_fuck"));

  return (
    <>
      <p>Some Validation</p>
    </>
  );
};

export default Page;
