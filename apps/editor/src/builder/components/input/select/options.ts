import type { MuiConfig } from "@/builder/builder";
import type { GetInputsImpl } from "@mfb/core";

import type { SelectOptionsForm } from "./type";

const selectOptions: Array<GetInputsImpl<MuiConfig, SelectOptionsForm>> = [
  {
    gridProps: { size: 12 },
    name: "formControlProps.size",
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
    name: "formControlProps.hiddenLabel",
    props: {
      label: "Hidden Label",
    },
    type: "checkbox",
  },
  {
    name: "formControlProps.margin",
    props: {
      defaultValue: "none",
      options: ["dense", "none", "normal"],
    },
    type: "radio",
  },
  {
    name: "formControlProps.fullWidth",
    props: {
      label: "Full Width",
    },
    type: "checkbox",
  },
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
    name: "inputLabelProps.disableAnimation",
    props: {
      label: "Disable Animation",
    },
    type: "checkbox",
  },
  {
    gridProps: { size: 12 },
    name: "variant",
    props: {
      defaultValue: "standard",
      options: ["filled", "outlined", "standard"],
    },
    type: "radio",
  },

  {
    gridProps: {
      size: 6,
    },
    name: "label",
    props: {
      textFieldProps: {
        label: "Label",
      },
    },
    type: "text",
  },
  {
    // TODO: add append button
    inputs: [
      {
        gridProps: {
          size: 6,
        },
        name: "label",
        props: {
          textFieldProps: {
            label: "Label",
          },
        },
        type: "text",
      },
      {
        gridProps: {
          size: 6,
        },
        name: "label",
        props: {
          textFieldProps: {
            label: "Label",
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
    name: "selectProps.autoWidth",
    props: {
      defaultValue: true,
      label: "Auto Width",
    },
    type: "checkbox",
  },
  {
    gridProps: { size: 12 },
    name: "selectProps.deafultOpen",
    props: {
      defaultValue: true,
      label: "Disable Ripple",
    },
    type: "checkbox",
  },
  {
    gridProps: { size: 12 },
    name: "selectProps.multiple",
    props: {
      defaultValue: true,
      label: "Multiple",
    },
    type: "checkbox",
  },
  {
    gridProps: { size: 12 },
    name: "selectProps.native",
    props: {
      defaultValue: true,
      label: "Native",
    },
    type: "checkbox",
  },
  {
    gridProps: { size: 12 },
    name: "selectProps.variant",
    props: {
      defaultValue: "standard",
      options: ["filled", "outlined", "standard"],
    },
    type: "radio",
  },
];

export { selectOptions };
