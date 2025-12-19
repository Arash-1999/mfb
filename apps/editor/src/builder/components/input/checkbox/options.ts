import type { MuiConfig } from "@/builder/builder";
import type { GetInputsImpl } from "@mfb/core";

import type { CheckboxOptions, CheckboxOptionsForm } from "./type";

const checkboxOptions: Array<GetInputsImpl<MuiConfig, CheckboxOptionsForm>> = [
  {
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
  {
    gridProps: { size: 12 },
    name: "disableRipple",
    props: {
      defaultValue: true,
      label: "Disable Ripple",
    },
    type: "checkbox",
  },
  {
    gridProps: { size: 12 },
    name: "checkboxProps.size",
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
    name: "label",
    props: {
      textFieldProps: {
        label: "Label",
        placeholder: "Label",
      },
    },
    type: "text",
  },
];

export { checkboxOptions };
