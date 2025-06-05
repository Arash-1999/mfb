import type { InputProps } from "@mfb/core";
import type { TextFieldProps } from "@mui/material";
import type { FieldValues } from "react-hook-form";

type MfbTextFieldProps<TFields extends FieldValues = FieldValues> = InputProps<
  TFields,
  {
    textFieldProps?: Omit<
      TextFieldProps,
      "disabled" | "onBlur" | "onChange" | "value"
    >;
  }
>;

export type { MfbTextFieldProps };
