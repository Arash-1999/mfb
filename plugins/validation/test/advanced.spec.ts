import type { AdvancedList, FormBuilderConfig } from "@mfb/types";
import type { JSONSchemaType } from "ajv";

import { describe } from "vitest";

import { compareJsonSchema } from "./compare-json-schema-test";
import { mfbTest } from "./setup.vitest";

describe("Advanced Builder", () => {
  mfbTest("Empty list", ({ validator }) => {
    const schema = validator.getSchema([]);
    const expected = {
      properties: {},
      required: [],
      type: "object",
    };

    compareJsonSchema(expected, schema);
  });

  mfbTest("names with isKey === true", ({ validator }) => {
    interface TestSchema {
      "field-1": string;
      "field-2": number;
      "field-3": boolean;
    }
    const input: AdvancedList<FormBuilderConfig, TestSchema> = [
      {
        mode: "input",
        name: "field-1",
        props: {},
        required: true,
        type: "text",
        validation: { maxLength: 16, minLength: 3, type: "string" },
      },
      {
        mode: "input",
        name: "field-2",
        props: {},
        required: true,
        type: "text",
        validation: { maximum: 16, minimum: 3, type: "number" },
      },
      {
        mode: "input",
        name: "field-3",
        props: {},
        required: true,
        type: "text",
        validation: { type: "boolean" },
      },
    ];

    const schema = validator.getSchema<TestSchema>(input);

    const expected: JSONSchemaType<TestSchema> = {
      properties: {
        "field-1": { maxLength: 16, minLength: 3, type: "string" },
        "field-2": { maximum: 16, minimum: 3, type: "number" },
        "field-3": { type: "boolean" },
      },
      required: ["field-1", "field-2", "field-3"],
      type: "object",
    };

    compareJsonSchema(expected, schema);
  });

  mfbTest("names with isKey === false", ({ validator }) => {
    interface TestSchema {
      "field-3": boolean;
      "parent-1": {
        "field-1": string;
      };
      "parent-2": {
        "field-2": number;
      };
    }

    const input: AdvancedList<FormBuilderConfig, TestSchema> = [
      {
        mode: "input",
        name: "parent-1.field-1",
        props: {},
        required: true,
        type: "text",
        validation: { maxLength: 16, minLength: 3, type: "string" },
      },
      {
        mode: "input",
        name: "parent-2.field-2",
        props: {},
        required: true,
        type: "text",
        validation: { maximum: 16, minimum: 3, type: "number" },
      },
      {
        mode: "input",
        name: "field-3",
        props: {},
        required: true,
        type: "text",
        validation: { type: "boolean" },
      },
    ];
    const schema = validator.getSchema<TestSchema>(input);

    const expected: JSONSchemaType<TestSchema> = {
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
    };

    compareJsonSchema(expected, schema);
  });

  mfbTest("list with flat items", ({ validator }) => {
    interface TestSchema {
      "list-1": Array<{
        "item-1": string;
        "item-2": number;
        "item-3": boolean;
      }>;
    }

    const input: AdvancedList<FormBuilderConfig, TestSchema> = [
      {
        list: [
          {
            mode: "input",
            name: "item-1",
            props: {},
            required: true,
            type: "text",
            validation: { maxLength: 16, minLength: 4, type: "string" },
          },
          {
            mode: "input",
            name: "item-2",
            props: {},
            required: true,
            type: "text",
            validation: { maximum: 16, minimum: 4, type: "number" },
          },
          {
            mode: "input",
            name: "item-3",
            props: {},
            required: true,
            type: "text",
            validation: { type: "boolean" },
          },
        ],
        mode: "input",
        name: "list-1",
        type: "list",
      },
    ];
    const schema = validator.getSchema<TestSchema>(input);

    const expected: JSONSchemaType<TestSchema> = {
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
    };

    compareJsonSchema(expected, schema);
  });

  mfbTest("list with nested items", ({ validator }) => {
    interface TestSchema {
      "list-1": Array<{
        "item-3": boolean;
        "parent-1": {
          "item-1": string;
        };
        "parent-2": {
          "item-2": number;
        };
      }>;
    }

    const input: AdvancedList<FormBuilderConfig, TestSchema> = [
      {
        list: [
          {
            mode: "input",
            name: "parent-1.item-1",
            props: {},
            required: true,
            type: "text",
            validation: { maxLength: 16, minLength: 4, type: "string" },
          },
          {
            mode: "input",
            name: "parent-2.item-2",
            props: {},
            required: true,
            type: "text",
            validation: { maximum: 16, minimum: 4, type: "number" },
          },
          {
            mode: "input",
            name: "item-3",
            props: {},
            required: true,
            type: "text",
            validation: { type: "boolean" },
          },
        ],
        mode: "input",
        name: "list-1",
        type: "list",
      },
    ];
    const schema = validator.getSchema<TestSchema>(input);

    const expected: JSONSchemaType<TestSchema> = {
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
    };

    compareJsonSchema(expected, schema);
  });

  mfbTest("nested list with flat items", ({ validator }) => {
    interface TestSchema {
      parent: {
        "list-1": Array<{
          "item-1": string;
          "item-2": number;
          "item-3": boolean;
        }>;
      };
    }

    const input: AdvancedList<FormBuilderConfig, TestSchema> = [
      {
        list: [
          {
            mode: "input",
            name: "item-1",
            props: {},
            required: true,
            type: "text",
            validation: { maxLength: 16, minLength: 4, type: "string" },
          },
          {
            mode: "input",
            name: "item-2",
            props: {},
            required: true,
            type: "text",
            validation: { maximum: 16, minimum: 4, type: "number" },
          },
          {
            mode: "input",
            name: "item-3",
            props: {},
            required: true,
            type: "text",
            validation: { type: "boolean" },
          },
        ],
        mode: "input",
        name: "parent.list-1",
        type: "list",
      },
    ];
    const schema = validator.getSchema<TestSchema>(input);

    const expected: JSONSchemaType<TestSchema> = {
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
    };

    compareJsonSchema(expected, schema);
  });

  mfbTest("nested list with nested items", ({ validator }) => {
    interface TestSchema {
      parent: {
        "list-1": Array<{
          "item-3": boolean;
          "parent-1": {
            "item-1": string;
          };
          "parent-2": {
            "item-2": number;
          };
        }>;
      };
    }

    const input: AdvancedList<FormBuilderConfig, TestSchema> = [
      {
        list: [
          {
            mode: "input",
            name: "parent-1.item-1",
            props: {},
            required: true,
            type: "text",
            validation: { maxLength: 16, minLength: 4, type: "string" },
          },
          {
            mode: "input",
            name: "parent-2.item-2",
            props: {},
            required: true,
            type: "text",
            validation: { maximum: 16, minimum: 4, type: "number" },
          },
          {
            mode: "input",
            name: "item-3",
            props: {},
            required: true,
            type: "text",
            validation: { type: "boolean" },
          },
        ],
        mode: "input",
        name: "parent.list-1",
        type: "list",
      },
    ];
    const schema = validator.getSchema<TestSchema>(input);

    const expected: JSONSchemaType<TestSchema> = {
      properties: {
        parent: {
          properties: {
            "list-1": {
              items: {
                properties: {
                  "item-3": { type: "boolean" },
                  "parent-1": {
                    properties: {
                      "item-1": {
                        maxLength: 16,
                        minLength: 4,
                        type: "string",
                      },
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
    };

    compareJsonSchema(expected, schema);
  });

  mfbTest(
    "Nested List contains nested list with nested items",
    ({ validator }) => {
      interface TestSchema {
        parent: {
          "list-1": Array<{
            "nested-parent": {
              "nested-list-1": Array<{
                "item-3": boolean;
                "parent-1": {
                  "item-1": string;
                };
                "parent-2": {
                  "item-2": number;
                };
              }>;
            };
          }>;
        };
      }
      const input: AdvancedList<FormBuilderConfig, TestSchema> = [
        {
          list: [
            {
              list: [
                {
                  mode: "input",
                  name: "parent-1.item-1",
                  props: {},
                  required: true,
                  type: "text",
                  validation: { maxLength: 16, minLength: 4, type: "string" },
                },
                {
                  mode: "input",
                  name: "parent-2.item-2",
                  props: {},
                  required: true,
                  type: "text",
                  validation: { maximum: 16, minimum: 4, type: "number" },
                },
                {
                  mode: "input",
                  name: "item-3",
                  props: {},
                  required: true,
                  type: "text",
                  validation: { type: "boolean" },
                },
              ],
              mode: "input",
              name: "nested-parent.nested-list-1",
              required: true,
              type: "list",
              validation: { maxItems: 4, minItems: 1, type: "array" },
            },
          ],
          mode: "input",
          name: "parent.list-1",
          type: "list",
        },
      ];

      const schema = validator.getSchema<TestSchema>(input);
      const expected: JSONSchemaType<TestSchema> = {
        properties: {
          parent: {
            properties: {
              "list-1": {
                items: {
                  properties: {
                    "nested-parent": {
                      properties: {
                        "nested-list-1": {
                          items: {
                            properties: {
                              "item-3": { type: "boolean" },
                              "parent-1": {
                                properties: {
                                  "item-1": {
                                    maxLength: 16,
                                    minLength: 4,
                                    type: "string",
                                  },
                                },
                                required: ["item-1"],
                                type: "object",
                              },
                              "parent-2": {
                                properties: {
                                  "item-2": {
                                    maximum: 16,
                                    minimum: 4,
                                    type: "number",
                                  },
                                },
                                required: ["item-2"],
                                type: "object",
                              },
                            },
                            required: ["item-3", "parent-1", "parent-2"],
                            type: "object",
                          },
                          maxItems: 4,
                          minItems: 1,
                          type: "array",
                        },
                      },
                      required: ["nested-list-1"],
                      type: "object",
                    },
                  },
                  required: ["nested-parent"],
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
      };

      compareJsonSchema(expected, schema);
    },
  );
});
