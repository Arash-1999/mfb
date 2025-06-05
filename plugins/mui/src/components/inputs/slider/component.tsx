import type { FieldValues } from "react-hook-form";

import { Slider } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import type { MfbSliderProps } from "./type";

const MfbSlider = <TFields extends FieldValues = FieldValues>({
  disabled,
  name,
  sliderProps,
}: MfbSliderProps<TFields>) => {
  const { control } = useFormContext<TFields>();

  return (
    <Controller
      control={control}
      defaultValue={sliderProps?.defaultValue}
      name={name}
      render={({ field: { onChange, ref, value, ...field } }) => (
        <Slider
          disabled={disabled}
          onChange={(_, newValue) => onChange(newValue)}
          ref={ref}
          value={value ?? 0}
          {...field}
          {...sliderProps}
        />
      )}
    />
  );
};

export { MfbSlider };
