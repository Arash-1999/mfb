import type { MuiConfig } from "@/builder/builder";
import type { GetInputsImpl } from "@mfb/core";

import type { RadioOptions, RadioOptionsForm } from "./type";

const radioOptions: Record<
  keyof RadioOptions,
  | Array<GetInputsImpl<MuiConfig, RadioOptionsForm>>
  | GetInputsImpl<MuiConfig, RadioOptionsForm>
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
  options: [
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
  ],
  radioProps: [
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
        defaultValue: true,
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
  ],
};

export { radioOptions };
