import type { FieldValues } from "react-hook-form";

import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import type { MfbTextFieldProps } from "./type";

const MfbTextField = <TFields extends FieldValues = FieldValues>({
  defaultValue,
  disabled,
  name,
  textFieldProps,
}: MfbTextFieldProps<TFields>) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue={defaultValue as never}
      name={name}
      render={({ field: { ref, value, ...field } }) => (
        <TextField
          disabled={disabled}
          inputRef={ref}
          type="text"
          value={value || ""}
          {...field}
          {...textFieldProps}
        />
      )}
      rules={{ required: textFieldProps?.required }}
    />
  );
};

export { MfbTextField };
