import type { FieldValues } from "react-hook-form";

import { Rating } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import type { MfbRatingProps } from "./type";

const MfbRating = <TFields extends FieldValues = FieldValues>({
  defaultValue,
  disabled,
  name,
  ratingProps,
}: MfbRatingProps<TFields>) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue={defaultValue as never}
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
