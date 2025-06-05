import { FormControlLabel, Switch } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import type { MfbSwitchProps } from "./type";

const MfbSwitch = ({
  formControlLabelProps,
  label,
  name,
  switchProps,
}: MfbSwitchProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
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
