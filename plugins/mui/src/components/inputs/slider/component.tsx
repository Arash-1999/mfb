import type { FieldValues } from "react-hook-form";

import { Slider } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import type { MfbSliderProps } from "./type";

const MfbSlider = <TFields extends FieldValues = FieldValues>({
  defaultValue,
  disabled,
  name,
  sliderProps,
}: MfbSliderProps<TFields>) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue={defaultValue as never}
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
