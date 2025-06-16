import type { MuiConfig } from "@/builder/builder";
import type { GetInputsImpl } from "@mfb/core";

import type { SwitchOptions, SwitchOptionsForm } from "./type";

const switchOptions: Record<
  keyof SwitchOptions,
  | Array<GetInputsImpl<MuiConfig, SwitchOptionsForm>>
  | GetInputsImpl<MuiConfig, SwitchOptionsForm>
> = {
  formControlLabelProps: [
    {
      gridProps: { size: 12 },
      name: "formControlLabelProps.disableRipple",
      props: {
        defaultValue: true,
        label: "Disable Ripple",
      },
      type: "checkbox",
    },
    {
      gridProps: { size: 12 },
      name: "formControlLabelProps.labelPlacement",
      props: {
        defaultValue: "end",
        options: ["bottom", "end", "start", "top"],
        radioGroupProps: {
          row: true,
        },
      },
      type: "radio",
    },
  ],
  label: {
    gridProps: {
      size: 12,
    },
    name: "label",
    props: {
      textFieldProps: {
        label: "Label",
      },
    },
    type: "text",
  },
  switchProps: [
    {
      gridProps: { size: 12 },
      name: "switchProps.color",
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
      name: "switchProps.disableRipple",
      props: {
        defaultValue: true,
        label: "Disable Ripple",
      },
      type: "checkbox",
    },
    {
      gridProps: { size: 12 },
      name: "switchProps.size",
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
  ],
};

export { switchOptions };
