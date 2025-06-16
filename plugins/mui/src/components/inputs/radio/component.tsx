import type { FieldValues } from "react-hook-form";

import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import type { MfbRadioGroupProps } from "./type";

const MfbRadioGroup = <TFields extends FieldValues = FieldValues>({
  defaultValue,
  disabled,
  formControlLabelProps,
  name,
  options,
  radioProps,
}: MfbRadioGroupProps<TFields>) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue={defaultValue as never}
      name={name}
      render={({ field: { ref, value, ...field } }) => (
        <RadioGroup disabled={disabled} ref={ref} value={value} {...field}>
          {options.map((option) => {
            const [key, label] =
              typeof option === "string" || typeof option === "number"
                ? [option, option]
                : [option.value, option.label];

            return (
              <FormControlLabel
                control={<Radio {...radioProps} />}
                key={`${name}-${key}`}
                label={label}
                value={key}
                {...formControlLabelProps}
              />
            );
          })}
        </RadioGroup>
      )}
    />
  );
};

export { MfbRadioGroup };
