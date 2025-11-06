// NOTE: validator doesn't need type property in cards.
/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { FormBuilderConfig, GetCards } from "@mfb/types";

import { describe } from "vitest";

import { compareJsonSchema } from "./compare-json-schema-test";
import { mfbTest } from "./setup.vitest";

describe.skip("Normal Builder", () => {
  mfbTest("Empty list", ({ validator }) => {
    const schema = validator.getSchema([]);
    const expected = {
      properties: {},
      required: [],
      type: "object",
    };

    compareJsonSchema(expected, schema);
  });

  mfbTest("Empty list", ({ validator }) => {
    interface TestSchema {
      "item-1": string;
      "item-2": number;
      "item-3": boolean;
    }

    const input: Array<GetCards<FormBuilderConfig, TestSchema>> = [
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
        // @ts-expect-error
        type: "paper",
      },
    ];

    const schema = validator.getSchema(input);
    const expected = {
      properties: {
        "item-1": { maxLength: 16, minLength: 4, type: "string" },
        "item-2": { maximum: 16, minimum: 4, type: "number" },
        "item-3": { type: "boolean" },
      },
      required: ["item-1", "item-2", "item-3"],
      type: "object",
    };

    compareJsonSchema(expected, schema);
  });

  mfbTest("card with name and flat items", ({ validator }) => {
    interface TestSchema {
      "card-1": {
        "item-1": string;
        "item-2": number;
        "item-3": boolean;
      };
    }

    const input: Array<GetCards<FormBuilderConfig, TestSchema>> = [
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
        name: "card-1",
        // @ts-expect-error
        type: "paper",
      },
    ];

    const schema = validator.getSchema(input);
    const expected = {
      properties: {
        "card-1": {
          properties: {
            "item-1": { maxLength: 16, minLength: 4, type: "string" },
            "item-2": { maximum: 16, minimum: 4, type: "number" },
            "item-3": { type: "boolean" },
          },
          required: ["item-1", "item-2", "item-3"],
          type: "object",
        },
      },
      required: [],
      type: "object",
    };

    compareJsonSchema(expected, schema);
  });

  mfbTest("card with nested and flat items", ({ validator }) => {
    interface TestSchema {
      "card-1": {
        parent: {
          "item-1": string;
          "item-2": number;
          "item-3": boolean;
        };
      };
    }

    const input: Array<GetCards<FormBuilderConfig, TestSchema>> = [
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
        name: "card-1.parent",
        // @ts-expect-error
        type: "paper",
      },
    ];

    const schema = validator.getSchema(input);
    const expected = {
      properties: {
        "card-1": {
          properties: {
            properties: {
              "item-1": { maxLength: 16, minLength: 4, type: "string" },
              "item-2": { maximum: 16, minimum: 4, type: "number" },
              "item-3": { type: "boolean" },
            },
            required: ["item-1", "item-2", "item-3"],
            type: "object",
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
});
