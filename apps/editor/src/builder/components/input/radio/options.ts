import type { MuiConfig } from "@/builder/builder";
import type { GetInputs } from "@mfb/core";

import type { RadioForm } from "./type";

const radioOptions: Array<GetInputs<MuiConfig, RadioForm>> = [
  {
    gridProps: { size: 12 },
    name: "formControlLabelProps.disableTypography",
    props: {
      label: "Disable Typography",
    },
    type: "checkbox",
  },
  {
    gridProps: { size: 12 },
    name: "formControlLabelProps.labelPlacement",
    props: {
      defaultValue: "end",
      options: ["bottom", "end", "start", "top"],
    },
    type: "radio",
  },
  {
    actionType: "append",
    gridProps: {
      display: "flex",
      justifyContent: "flex-end",
      size: 12,
    },
    name: "props.options",
    props: {
      text: "Add Options",
    },
    type: "field-array-action",
  },
  {
    gridContainerProps: {
      spacing: 1,
    },
    inputs: [
      {
        gridProps: {
          size: 10,
        },
        name: "label",
        props: {
          textFieldProps: {
            label: "Label",
            size: "small",
          },
        },
        type: "text",
      },
      {
        actionType: "remove",
        gridProps: {
          size: 2,
        },
        props: {
          icon: "remove",
        },
        name: "props.options",
        type: "field-array-action",
      },
      {
        gridProps: {
          size: 10,
        },
        name: "value",
        props: {
          textFieldProps: {
            label: "value",
            size: "small",
          },
        },
        type: "text",
      },
    ],
    name: "options",
    type: "list",
  },
  {
    gridProps: { size: 12 },
    name: "radioProps.color",
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
    name: "radioProps.disableRipple",
    props: {
      label: "Disable Ripple",
    },
    type: "checkbox",
  },
  {
    gridProps: { size: 12 },
    name: "radioProps.size",
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
];

export { radioOptions };
