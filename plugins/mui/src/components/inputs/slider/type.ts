import type { InputProps } from "@mfb/core";
import type { SliderProps } from "@mui/material";
import type { FieldValues } from "react-hook-form";

type MfbSliderProps<TFields extends FieldValues> = InputProps<
  TFields,
  {
    sliderProps?: Omit<
      SliderProps,
      "disabled" | "name" | "onBlur" | "onChange" | "value"
    >;
  }
>;
export type { MfbSliderProps };
