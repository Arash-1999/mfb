import type { MuiConfig } from "@/builder/builder";
import type { GetInputsImpl } from "@mfb/core";

import type { SliderOptions, SliderOptionsForm } from "./type";

const sliderOptions: Record<
  keyof SliderOptions["sliderProps"],
  GetInputsImpl<MuiConfig, SliderOptionsForm>
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
  disableSwap: {
    gridProps: { size: 12 },
    name: "sliderPorps.disableSwap",
    props: {
      defaultValue: true,
      label: "Disable Swap",
    },
    type: "checkbox",
  },
  // marks: {},
  max: {
    gridProps: { size: 12 },
    name: "sliderProps.max",
    props: {
      textFieldProps: {
        fullWidth: true,
        label: "Max",
        placeholder: "Number",
        size: "small",
      },
    },
    type: "text",
  },
  min: {
    gridProps: { size: 12 },
    name: "sliderProps.min",
    props: {
      textFieldProps: {
        fullWidth: true,
        label: "Min",
        placeholder: "Number",
        size: "small",
      },
    },
    type: "text",
  },
  orientation: {
    name: "sliderProps.orientation",
    props: {
      defaultValue: "horizontal",
      options: ["horizontal", "vertical"],
      radioGroupProps: {
        row: true,
      },
    },
    type: "radio",
  },
  shiftStep: {
    gridProps: { size: 12 },
    name: "sliderProps.shiftStep",
    props: {
      textFieldProps: {
        fullWidth: true,
        label: "Shift Step",
        placeholder: "Number",
        size: "small",
      },
    },
    type: "text",
  },
  size: {
    gridProps: { size: 12 },
    name: "sliderProps.size",
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
  step: {
    gridProps: { size: 12 },
    name: "sliderProps.step",
    props: {
      textFieldProps: {
        fullWidth: true,
        label: "Step",
        placeholder: "Number",
        size: "small",
      },
    },
    type: "text",
  },
  track: {
    name: "sliderProps.track",
    props: {
      defaultValue: "normal",
      options: ["inverted", "normal", ""],
      radioGroupProps: {
        row: true,
      },
    },
    type: "radio",
  },
  valueLabelDisplay: {
    name: "sliderProps.valueLabelDisplay",
    props: {
      defaultValue: "off",
      options: ["auto", "off", "on"],
    },
    type: "radio",
  },
  valueLabelFormat: {
    gridProps: { size: 12 },
    name: "sliderProps.valueLabelFormat",
    props: {
      textFieldProps: {
        fullWidth: true,
        label: "Value Label Format",
        placeholder: "Value Label Format",
        size: "small",
      },
    },
    type: "text",
  },
};

export { sliderOptions };
