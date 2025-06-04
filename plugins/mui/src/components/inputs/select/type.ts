import type { InputProps } from "@mfb/core";
import type {
  FormControlProps,
  InputLabelProps,
  SelectProps,
} from "@mui/material";
import type { FieldValues, Path, PathValue } from "react-hook-form";

type MfbSelectProps<TFields extends FieldValues> = InputProps<
  TFields,
  {
    disabled?: boolean;
    formControlProps?: FormControlProps;
    inputLabelProps?: InputLabelProps;
    label?: string;
    name: Path<TFields>;
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
      "defaultValue" | "name" | "onChange" | "value"
    > & {
      defaultValue?: PathValue<TFields, Path<TFields>>;
    };
  }
>;
export type { MfbSelectProps };
