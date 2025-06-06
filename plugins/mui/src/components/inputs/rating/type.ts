import type { InputProps } from "@mfb/core";
import type { RatingProps } from "@mui/material";
import type { FieldValues } from "react-hook-form";

type MfbRatingProps<TFields extends FieldValues> = InputProps<
  TFields,
  {
    defaultValue?: null | number;
    ratingProps?: Omit<
      RatingProps,
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
export type { MfbRatingProps };
