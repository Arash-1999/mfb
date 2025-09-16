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

const Page = () => {
  try {
    const test_1 = toValibotString({
      type: "string",
      minLength: 3,
      maxLength: 10,
    });

    console.log("fuck: ", v.safeParse(test_1, "fuck"));
    console.log("fucking_fuck: ", v.safeParse(test_1, "fucking_fuck"));
    const schema = v.object({
      fuck: test_1,
      fucking_fuck: test_1,
    });
    console.log(
      "pipe: ",
      v.safeParse(schema, {
        fuck: "fuck",
        fucking_fuck: "fucking_fuck",
      })
    );
  } catch (err) {
    console.log(err);
  }

  return (
    <>
      <p>Some Validation</p>
    </>
  );
};

export default Page;
