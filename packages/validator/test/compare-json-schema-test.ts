import { isObject } from "@mfb/utils";
import { expect } from "vitest";

interface ObjectWithRequired {
  type: "object";
  required: Array<string>;
}
const hasRequiredField = (obj: object): obj is ObjectWithRequired => {
  return (
    !!obj &&
    "type" in obj &&
    obj.type === "object" &&
    "required" in obj &&
    Array.isArray(obj["required"])
  );
};

const deepSort = (target: unknown) => {
  if (isObject(target) || Array.isArray(target)) {
    if (hasRequiredField(target)) {
      target["required"].sort();
    }

    for (const key in target) {
      const current = target[key as keyof {}];

      if (isObject(current) || Array.isArray(current)) {
        deepSort(current);
      }
    }
  }
};

const compareJsonSchema = (a: unknown, b: unknown) => {
  deepSort(a);
  deepSort(b);

  expect(a).toEqual(b);
};

export { compareJsonSchema };
