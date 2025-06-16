import type { MuiConfig } from "@/builder/builder";
import type { GetInputsImpl } from "@mfb/core";

import type { TextFieldOptions, TextFieldOptionsForm } from "./type";

const textFieldOptions: Record<
  keyof TextFieldOptions,
  GetInputsImpl<MuiConfig, TextFieldOptionsForm>
> = {
  color: {
    gridProps: { size: 12 },
    name: "color",
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
  fullWidth: {
    gridProps: { size: 12 },
    name: "fullWidth",
    props: {
      defaultValue: true,
      label: "Full width",
    },
    type: "checkbox",
  },
  helperText: {
    gridProps: { size: 12 },
    name: "helperText",
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
  id: {
    gridProps: { size: 12 },
    name: "id",
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
  label: {
    gridProps: { size: 12 },
    name: "label",
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
  margin: {
    gridProps: { size: 12 },
    name: "margin",
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
  maxRows: {
    dependsOn: {
      condition: "not-eq",
      id: "is_multiline",
      path: "props.multiline",
      type: "disable",
      value: true,
    },
    gridProps: { size: 12 },
    name: "maxRows",
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
  minRows: {
    dependsOn: {
      condition: "not-eq",
      id: "is_multiline",
      path: "props.multiline",
      type: "disable",
      value: true,
    },
    gridProps: { size: 12 },
    name: "minRows",
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
  multiline: {
    gridProps: { size: 12 },
    name: "multiline",
    props: {
      defaultValue: false,
      label: "Multi-line",
    },
    type: "checkbox",
  },
  placeholder: {
    gridProps: { size: 12 },
    name: "placeholder",
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
  rows: {
    dependsOn: {
      condition: "not-eq",
      id: "is_multiline",
      path: "props.multiline",
      type: "disable",
      value: true,
    },
    gridProps: { size: 12 },
    name: "rows",
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
  size: {
    gridProps: { size: 12 },
    name: "size",
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
  variant: {
    gridProps: { size: 12 },
    name: "variant",
    props: {
      defaultValue: "standard",
      options: ["filled", "outlined", "standard"],
      radioGroupProps: {
        row: true,
      },
    },
    type: "radio",
  },
};

export { textFieldOptions };
