import type { FieldValues } from "react-hook-form";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import type { MfbSelectProps } from "./type";

const MfbSelect = <TFields extends FieldValues = FieldValues>({
  disabled,
  formControlProps,
  inputLabelProps,
  label,
  name,
  options,
  selectProps,
}: MfbSelectProps<TFields>) => {
  const { control } = useFormContext();

  return (
    <FormControl disabled={disabled} {...formControlProps}>
      {label && <InputLabel {...inputLabelProps}>{label}</InputLabel>}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, ref, value, ...field } }) => (
          <Select
            inputRef={ref}
            label={label}
            onChange={(e) => onChange(e.target.value)}
            value={value ?? ""}
            {...field}
            {...selectProps}>
            {options.map((option) => {
              const [key, display] =
                typeof option === "string" || typeof option === "number"
                  ? [option, option]
                  : [option.value, option.label];

              return (
                <MenuItem key={`${name}-${key}`} value={key}>
                  {display}
                </MenuItem>
              );
            })}
          </Select>
        )}
      />
    </FormControl>
  );
};

export { MfbSelect };
