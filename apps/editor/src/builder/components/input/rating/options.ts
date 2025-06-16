import type { MuiConfig } from "@/builder/builder";
import type { GetInputsImpl } from "@mfb/core";

import type { RatingOptions, RatingOptionsForm } from "./type";

const ratingOptions: Record<
  keyof RatingOptions["ratingProps"],
  GetInputsImpl<MuiConfig, RatingOptionsForm>
> = {
  highlightSelectedOnly: {
    gridProps: { size: 12 },
    name: "raintProps.highlightSelectedOnly",
    props: {
      defaultValue: true,
      label: "Full width",
    },
    type: "checkbox",
  },
  max: {
    gridProps: { size: 12 },
    name: "ratingProps.max",
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
  precision: {
    gridProps: { size: 12 },
    name: "ratingProps.precision",
    props: {
      textFieldProps: {
        fullWidth: true,
        label: "Precision",
        placeholder: "Number",
        size: "small",
      },
    },
    type: "text",
  },
  readOnly: {
    gridProps: { size: 12 },
    name: "raintProps.readOnly",
    props: {
      defaultValue: true,
      label: "Readonly",
    },
    type: "checkbox",
  },
  size: {
    gridProps: { size: 12 },
    name: "ratingProps.size",
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

export { ratingOptions };
