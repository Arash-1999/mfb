import type { InputProps } from "@mfb/core";
import type {
  FormControlProps,
  InputLabelProps,
  SelectProps,
} from "@mui/material";
import type { FieldValues } from "react-hook-form";

type MfbSelectProps<TFields extends FieldValues> = InputProps<
  TFields,
  {
    defaultValue?: number | string;
    formControlProps?: FormControlProps;
    inputLabelProps?: InputLabelProps;
    label?: string;
    options: Array<
      | number
      | string
      | {
        label: number | string;
        value: number | string;
      }
    >;
    selectProps?: Omit<
      SelectProps,
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
export type { MfbSelectProps };
