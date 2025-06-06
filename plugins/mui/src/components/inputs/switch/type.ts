import type { InputProps } from "@mfb/core";
import type { FormControlLabelProps, SwitchProps } from "@mui/material";
import type { FieldValues } from "react-hook-form";

type MfbSwitchProps<TFields extends FieldValues = FieldValues> = InputProps<
  TFields,
  {
    defaultValue?: boolean;
    formControlLabelProps: Omit<FormControlLabelProps, "control" | "label">;
    label: string;
    switchProps?: Omit<
      SwitchProps,
      | "defaultChecked"
      | "defaultValue"
      | "disabled"
      | "onBlur"
      | "onChange"
      | "value"
    >;
  }
>;

export type { MfbSwitchProps };
