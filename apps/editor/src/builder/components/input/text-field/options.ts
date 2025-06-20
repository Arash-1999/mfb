import type { MuiConfig } from "@/builder/builder";
import type { GetInputs } from "@mfb/core";

import type { TestForm } from "./type";

const textFieldOptions: GetInputs<MuiConfig, TestForm>[] = [
  {
    gridProps: { size: 12 },
    name: "textFieldProps.color",
    props: {
      textFieldProps: {
        fullWidth: true,
        label: "Color",
        placeholder: "Color",
        size: "small",
      },
    },
    type: "text",
  },
  {
    gridProps: { size: 12 },
    name: "textFieldProps.fullWidth",
    props: {
      defaultValue: true,
      label: "Full width",
    },
    type: "checkbox",
  },
  {
    gridProps: { size: 12 },
    name: "textFieldProps.helperText",
    props: {
      textFieldProps: {
        fullWidth: true,
        label: "Helper text",
        placeholder: "Helper text",
        size: "small",
      },
    },
    type: "text",
  },
  {
    gridProps: { size: 12 },
    name: "textFieldProps.id",
    props: {
      textFieldProps: {
        fullWidth: true,
        label: "Id",
        placeholder: "Id",
        size: "small",
      },
    },
    type: "text",
  },
  {
    gridProps: { size: 12 },
    name: "textFieldProps.label",
    props: {
      textFieldProps: {
        fullWidth: true,
        label: "Label",
        placeholder: "Label",
        size: "small",
      },
    },
    type: "text",
  },
  {
    gridProps: { size: 12 },
    name: "textFieldProps.margin",
    props: {
      textFieldProps: {
        fullWidth: true,
        label: "Margin",
        placeholder: "Margin",
        size: "small",
      },
    },
    type: "text",
  },
  {
    dependsOn: {
      condition: "not-eq",
      id: "is_multiline",
      path: "props.textFieldProps.multiline",
      type: "disable",
      value: true,
    },
    gridProps: { size: 12 },
    name: "textFieldProps.maxRows",
    props: {
      textFieldProps: {
        fullWidth: true,
        label: "Max rows",
        placeholder: "Max rows",
        size: "small",
      },
    },
    type: "text",
  },
  {
    dependsOn: {
      condition: "not-eq",
      id: "is_multiline",
      path: "props.textFieldProps.multiline",
      type: "disable",
      value: true,
    },
    gridProps: { size: 12 },
    name: "textFieldProps.minRows",
    props: {
      textFieldProps: {
        fullWidth: true,
        label: "Min rows",
        placeholder: "Min rows",
        size: "small",
      },
    },
    type: "text",
  },
  {
    gridProps: { size: 12 },
    name: "textFieldProps.multiline",
    props: {
      defaultValue: false,
      label: "Multi-line",
    },
    type: "checkbox",
  },
  {
    gridProps: { size: 12 },
    name: "textFieldProps.placeholder",
    props: {
      textFieldProps: {
        fullWidth: true,
        label: "Placeholder",
        placeholder: "Placeholder",
        size: "small",
      },
    },
    type: "text",
  },
  {
    dependsOn: {
      condition: "not-eq",
      id: "is_multiline",
      path: "props.textFieldProps.multiline",
      type: "disable",
      value: true,
    },
    gridProps: { size: 12 },
    name: "textFieldProps.rows",
    props: {
      textFieldProps: {
        fullWidth: true,
        label: "Rows",
        placeholder: "Rows",
        size: "small",
      },
    },
    type: "text",
  },
  {
    gridProps: { size: 12 },
    name: "textFieldProps.size",
    props: {
      defaultValue: "small",
      textFieldProps: {
        fullWidth: true,
        label: "Size",
        placeholder: "Size",
        size: "small",
      },
    },
    type: "text",
  },
  {
    gridProps: { size: 12 },
    name: "textFieldProps.variant",
    props: {
      defaultValue: "standard",
      options: ["filled", "outlined", "standard"],
    },
    type: "radio",
  },
];

export { textFieldOptions };
