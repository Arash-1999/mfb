import type { InputProps } from "@mfb/core";
import type {
  FormControlLabelProps,
  RadioGroupProps,
  RadioProps,
} from "@mui/material";
import type { FieldValues } from "react-hook-form";

type MfbRadioGroupProps<TFields extends FieldValues = FieldValues> = InputProps<
  TFields,
  {
    formControlLabelProps?: Omit<FormControlLabelProps, "label">;
    options: Array<number | string | { label: string; value: string }>;
    radioGroupProps?: Omit<
      RadioGroupProps,
      "disabled" | "label" | "onBlur" | "onChange" | "value"
    >;
    radioProps?: Omit<RadioProps, "value">;
  }
>;

export type { MfbRadioGroupProps };
