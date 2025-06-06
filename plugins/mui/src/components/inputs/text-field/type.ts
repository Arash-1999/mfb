import type { InputProps } from "@mfb/core";
import type { TextFieldProps } from "@mui/material";
import type { FieldValues } from "react-hook-form";

type MfbTextFieldProps<TFields extends FieldValues> = InputProps<
  TFields,
  {
    defaultValue?: string;
    textFieldProps?: Omit<
      TextFieldProps,
      | "defaultChecked"
      | "defaultValue"
      | "disabled"
      | "name"
      | "onBlur"
      | "onChange"
      | "value"
    >;
  }
>;

export type { MfbTextFieldProps };
