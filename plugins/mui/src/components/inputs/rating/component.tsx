import type { FieldValues } from "react-hook-form";

import { Rating } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import type { MfbRatingProps } from "./type";

const MfbRating = <TFields extends FieldValues = FieldValues>({
  disabled,
  name,
  ratingProps,
}: MfbRatingProps<TFields>) => {
  const { control } = useFormContext<TFields>();

  return (
    <Controller
      control={control}
      // defaultValue={ratingProps?.defaultValue}
      name={name}
      render={({ field: { ref, value, ...field } }) => (
        <Rating
          disabled={disabled}
          ref={ref}
          value={value}
          {...field}
          {...ratingProps}
        />
      )}
    />
  );
};

export { MfbRating };
