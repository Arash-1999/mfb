import type { MuiConfig } from "@/builder/builder";
import type { GetInputsImpl } from "@mfb/core";

import type { SelectOptions, SelectOptionsForm } from "./type";

const selectOptions: Record<
  keyof SelectOptions,
  | Array<GetInputsImpl<MuiConfig, SelectOptionsForm>>
  | GetInputsImpl<MuiConfig, SelectOptionsForm>
> = {
  formControlProps: [
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
  ],
  inputLabelProps: [
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
        radioGroupProps: {
          row: true,
        },
      },
      type: "radio",
    },
  ],
  label: {
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
  options: {
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
  selectProps: [
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
        radioGroupProps: {
          row: true,
        },
      },
      type: "radio",
    },
  ],
};

export { selectOptions };
