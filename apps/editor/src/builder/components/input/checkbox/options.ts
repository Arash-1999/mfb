import type { MuiConfig } from "@/builder/builder";
import type { GetInputsImpl } from "@mfb/core";

import type { CheckboxOptions, CheckboxOptionsForm } from "./type";

const checkboxOptions: Record<
  keyof CheckboxOptions,
  GetInputsImpl<MuiConfig, CheckboxOptionsForm>
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
  disableRipple: {
    gridProps: { size: 12 },
    name: "disableRipple",
    props: {
      defaultValue: true,
      label: "Disable Ripple",
    },
    type: "checkbox",
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
};

export { checkboxOptions };
