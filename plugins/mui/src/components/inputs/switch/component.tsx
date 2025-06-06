import type { FieldValues } from "react-hook-form";

import { FormControlLabel, Switch } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import type { MfbSwitchProps } from "./type";

const MfbSwitch = <TFields extends FieldValues = FieldValues>({
  defaultValue,
  formControlLabelProps,
  label,
  name,
  switchProps,
}: MfbSwitchProps<TFields>) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue={defaultValue as never}
      name={name}
      render={({ field: { ref, value, ...field } }) => (
        <FormControlLabel
          checked={value}
          control={<Switch {...switchProps} />}
          inputRef={ref}
          label={label}
          {...field}
          {...formControlLabelProps}
        />
      )}
    />
  );
};

export { MfbSwitch };
