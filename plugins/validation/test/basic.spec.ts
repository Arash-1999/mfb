// import type { FormBuilderConfig, InputArray } from "@mfb/types";
// import type { JSONSchemaType } from "ajv";
// import type { FieldValues } from "react-hook-form";

import { MfbValidator } from "@/index";
import { expect, test } from "vitest";

// interface Item {
//   description: string;
//   input: InputArray<FormBuilderConfig, FieldValues>;
//   output: JSONSchemaType<FieldValues>;
// }

const tests = [
  {
    description: "Empty list",
    input: [],
    output: { properties: {}, required: [], type: "object" },
  },
  {
    description: "names with isKey === true",
    input: [
      {
        name: "field-1",
        props: {},
        required: true,
        type: "text",
        validation: { maxLength: 16, minLength: 3, type: "string" },
      },
      {
        name: "field-2",
        props: {},
        required: true,
        type: "text",
        validation: { maximum: 16, minimum: 3, type: "number" },
      },
      {
        name: "field-3",
        props: {},
        required: true,
        type: "text",
        validation: { type: "boolean" },
      },
    ],
    output: {
      properties: {
        "field-1": { maxLength: 16, minLength: 3, type: "string" },
        "field-2": { maximum: 16, minimum: 3, type: "number" },
        "field-3": { type: "boolean" },
      },
      required: ["field-1", "field-2", "field-3"],
      type: "object",
    },
  },
  {
    description: "names with isKey === false",
    input: [
      {
        name: "parent-1.field-1",
        props: {},
        required: true,
        type: "text",
        validation: { maxLength: 16, minLength: 3, type: "string" },
      },
      {
        name: "parent-2.field-2",
        props: {},
        required: true,
        type: "text",
        validation: { maximum: 16, minimum: 3, type: "number" },
      },
      {
        name: "field-3",
        props: {},
        required: true,
        type: "text",
        validation: { type: "boolean" },
      },
    ],
    output: {
      properties: {
        "field-3": { type: "boolean" },
        "parent-1": {
          properties: {
            "field-1": { maxLength: 16, minLength: 3, type: "string" },
          },
          required: ["field-1"],
          type: "object",
        },
        "parent-2": {
          properties: {
            "field-2": { maximum: 16, minimum: 3, type: "number" },
          },
          required: ["field-2"],
          type: "object",
        },
      },
      required: ["parent-1", "parent-2", "field-3"],
      type: "object",
    },
  },
  {
    description: "list with flat items",
    input: [
      {
        inputs: [
          {
            name: "item-1",
            props: {},
            required: true,
            type: "text",
            validation: { maxLength: 16, minLength: 4, type: "string" },
          },
          {
            name: "item-2",
            props: {},
            required: true,
            type: "text",
            validation: { maximum: 16, minimum: 4, type: "number" },
          },
          {
            name: "item-3",
            props: {},
            required: true,
            type: "text",
            validation: { type: "boolean" },
          },
        ],
        name: "list-1",
        type: "list",
      },
    ],
    output: {
      properties: {
        "list-1": {
          items: {
            properties: {
              "item-1": { maxLength: 16, minLength: 4, type: "string" },
              "item-2": { maximum: 16, minimum: 4, type: "number" },
              "item-3": { type: "boolean" },
            },
            required: ["item-1", "item-2", "item-3"],
            type: "object",
          },
          type: "array",
        },
      },
      required: [],
      type: "object",
    },
  },
  {
    description: "list with nested items",
    input: [
      {
        inputs: [
          {
            name: "parent-1.item-1",
            props: {},
            required: true,
            type: "text",
            validation: { maxLength: 16, minLength: 4, type: "string" },
          },
          {
            name: "parent-2.item-2",
            props: {},
            required: true,
            type: "text",
            validation: { maximum: 16, minimum: 4, type: "number" },
          },
          {
            name: "item-3",
            props: {},
            required: true,
            type: "text",
            validation: { type: "boolean" },
          },
        ],
        name: "list-1",
        type: "list",
      },
    ],
    output: {
      properties: {
        "list-1": {
          items: {
            properties: {
              "item-3": { type: "boolean" },
              "parent-1": {
                properties: {
                  "item-1": { maxLength: 16, minLength: 4, type: "string" },
                },
                required: ["item-1"],
                type: "object",
              },
              "parent-2": {
                properties: {
                  "item-2": { maximum: 16, minimum: 4, type: "number" },
                },
                required: ["item-2"],
                type: "object",
              },
            },
            required: ["parent-1", "parent-2", "item-3"],
            type: "object",
          },
          type: "array",
        },
      },
      required: [],
      type: "object",
    },
  },
  {
    description: "nested list with flat items",
    input: [
      {
        inputs: [
          {
            name: "item-1",
            props: {},
            required: true,
            type: "text",
            validation: { maxLength: 16, minLength: 4, type: "string" },
          },
          {
            name: "item-2",
            props: {},
            required: true,
            type: "text",
            validation: { maximum: 16, minimum: 4, type: "number" },
          },
          {
            name: "item-3",
            props: {},
            required: true,
            type: "text",
            validation: { type: "boolean" },
          },
        ],
        name: "parent.list-1",
        type: "list",
      },
    ],
    output: {
      properties: {
        parent: {
          properties: {
            "list-1": {
              items: {
                properties: {
                  "item-1": { maxLength: 16, minLength: 4, type: "string" },
                  "item-2": { maximum: 16, minimum: 4, type: "number" },
                  "item-3": { type: "boolean" },
                },
                required: ["item-1", "item-2", "item-3"],
                type: "object",
              },
              type: "array",
            },
          },
          required: [],
          type: "object",
        },
      },
      required: [],
      type: "object",
    },
  },
  {
    description: "nested list with nested items",
    input: [
      {
        inputs: [
          {
            name: "parent-1.item-1",
            props: {},
            required: true,
            type: "text",
            validation: { maxLength: 16, minLength: 4, type: "string" },
          },
          {
            name: "parent-2.item-2",
            props: {},
            required: true,
            type: "text",
            validation: { maximum: 16, minimum: 4, type: "number" },
          },
          {
            name: "item-3",
            props: {},
            required: true,
            type: "text",
            validation: { type: "boolean" },
          },
        ],
        name: "parent.list-1",
        type: "list",
      },
    ],
    output: {
      properties: {
        parent: {
          properties: {
            "list-1": {
              items: {
                properties: {
                  "item-3": { type: "boolean" },
                  "parent-1": {
                    properties: {
                      "item-1": { maxLength: 16, minLength: 4, type: "string" },
                    },
                    required: ["item-1"],
                    type: "object",
                  },
                  "parent-2": {
                    properties: {
                      "item-2": { maximum: 16, minimum: 4, type: "number" },
                    },
                    required: ["item-2"],
                    type: "object",
                  },
                },
                required: ["parent-1", "parent-2", "item-3"],
                type: "object",
              },
              type: "array",
            },
          },
          required: [],
          type: "object",
        },
      },
      required: [],
      type: "object",
    },
  },
  {
    description: "nested list with nested items",
    input: [
      {
        inputs: [
          {
            name: "parent-1.item-1",
            props: {},
            required: true,
            type: "text",
            validation: { maxLength: 16, minLength: 4, type: "string" },
          },
          {
            name: "parent-2.item-2",
            props: {},
            required: true,
            type: "text",
            validation: { maximum: 16, minimum: 4, type: "number" },
          },
          {
            name: "item-3",
            props: {},
            required: true,
            type: "text",
            validation: { type: "boolean" },
          },
        ],
        name: "parent.list-1",
        required: true,
        type: "list",
        validation: { maxItems: 4, minItems: 1 },
      },
    ],
    output: {
      properties: {
        parent: {
          properties: {
            "list-1": {
              items: {
                properties: {
                  "item-3": { type: "boolean" },
                  "parent-1": {
                    properties: {
                      "item-1": { maxLength: 16, minLength: 4, type: "string" },
                    },
                    required: ["item-1"],
                    type: "object",
                  },
                  "parent-2": {
                    properties: {
                      "item-2": { maximum: 16, minimum: 4, type: "number" },
                    },
                    required: ["item-2"],
                    type: "object",
                  },
                },
                required: ["parent-1", "parent-2", "item-3"],
                type: "object",
              },
              type: "array",
            },
          },
          required: ["list-1"],
          type: "object",
        },
      },
      required: ["parent"],
      type: "object",
    },
  },
  // {
  //   description: "",
  //   input: [],
  //   output: { type: "object" },
  // },
];

tests.forEach((item) => {
  test(item.description, () => {
    console.log(item.description);
    const validaiton = new MfbValidator();

    // TODO: remove this comments
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const result = validaiton.getSchema(item.input);
    expect(result).toEqual(item.output);
  });
});
