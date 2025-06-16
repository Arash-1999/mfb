import type { MuiConfig } from "@/builder";
// import type { ResponsiveStyleValue } from "@/builder/types";
import type { GetInputsImpl } from "@mfb/core";

import { FieldOptionsForm } from "./type";
// import { useResponsiveStyle } from "@/builder/hooks/use-responsive-style";

// type FieldOptionsForm = FieldOptions & {
//   [key in FieldOptions as `is_${keyof FieldOptions}_responsive`]: boolean;
// };
//
// type ResponsiveKeys = never;

const useFieldOptions = (): Record<
  keyof FieldOptions,
  // | Array<GetInputsImpl<MuiConfig, GridContainerOptionsForm>>
  GetInputsImpl<MuiConfig, FieldOptionsForm>
> => {
  return {
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
    hiddenLabel: {
      gridProps: { size: 12 },
      name: "hiddenLabel",
      props: {
        label: "Hidden Label",
      },
      type: "checkbox",
    },
    margin: {
      gridProps: { size: 12 },
      name: "margin",
      props: {
        defaultValue: "none",
        options: ["dense", "none", " normal"],
      },
      type: "radio",
    },
    size: {
      gridProps: { size: 12 },
      name: "size",
      props: {
        defaultValue: "small",
        options: ["medium", "small"],
      },
      type: "radio",
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
};

export { useFieldOptions };
