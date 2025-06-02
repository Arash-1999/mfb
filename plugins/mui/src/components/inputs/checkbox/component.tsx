import type { FieldValues } from "react-hook-form";

import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import type { MfbCheckboxProps } from "./type";

const MfbCheckbox = <TFields extends FieldValues = FieldValues>({
  checkboxProps,
  disabled,
  formControlLabelProps,
  label,
  name,
}: MfbCheckboxProps<TFields>) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      disabled={disabled}
      name={name}
      render={({ field: { ref, value, ...field } }) => (
        <FormControlLabel
          checked={value}
          control={<Checkbox {...checkboxProps} />}
          inputRef={ref}
          label={label}
          {...field}
          {...formControlLabelProps}
        />
      )}
    />
  );
};

export { MfbCheckbox };
