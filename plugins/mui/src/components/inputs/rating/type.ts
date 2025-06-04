import type { InputProps } from "@mfb/core";
import type { RatingProps } from "@mui/material";
import type { FieldValues, Path, PathValue } from "react-hook-form";

type MfbRatingProps<TFields extends FieldValues> = InputProps<
  TFields,
  {
    disabled?: boolean;
    name: Path<TFields>;
    ratingProps?: Omit<
      RatingProps,
      "disabled" | "name" | "onChange" | "value"
    > & {
      defaultValue?: PathValue<TFields, Path<TFields>>;
    };
  }
>;
export type { MfbRatingProps };
