import type { InputProps } from "@mfb/core";
import type { SliderProps } from "@mui/material";
import type { FieldValues, Path, PathValue } from "react-hook-form";

type MfbSliderProps<TFields extends FieldValues> = InputProps<
  TFields,
  {
    disabled?: boolean;
    name: Path<TFields>;
    sliderProps?: Omit<
      SliderProps,
      "disabled" | "name" | "onChange" | "value"
    > & {
      defaultValue?: PathValue<TFields, Path<TFields>>;
    };
  }
>;
export type { MfbSliderProps };
