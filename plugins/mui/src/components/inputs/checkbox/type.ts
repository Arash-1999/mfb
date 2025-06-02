import type { InputProps } from "@mfb/core";
import type { CheckboxProps, FormControlLabelProps } from "@mui/material";
import type { FieldValues } from "react-hook-form";

type MfbCheckboxProps<TFields extends FieldValues = FieldValues> = InputProps<
  TFields,
  {
    checkboxProps?: Omit<
      CheckboxProps,
      "disabled" | "label" | "onBlur" | "onChange" | "value"
    >;
    formControlLabelProps?: Omit<FormControlLabelProps, "label">;
    label: string;
  }
>;

export type { MfbCheckboxProps };
