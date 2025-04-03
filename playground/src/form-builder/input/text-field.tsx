import type { FieldValues } from "react-hook-form";
import type { InputProps } from "@mfb/core";

import { Controller, useFormContext } from "react-hook-form";
import TextField, { type TextFieldProps } from "@mui/material/TextField";

const TextFieldInput = <TFields extends FieldValues>({
  disabled,
  name,
  textFieldProps,
}: InputProps<
  TFields,
  {
    textFieldProps?: Omit<
      TextFieldProps,
      "onChange" | "onBlur" | "disabled" | "value"
    >;
  }
>) => {
  const { control } = useFormContext();
  console.log(name, disabled);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, value, ...field } }) => (
        <TextField
          fullWidth
          inputRef={ref}
          value={value || ""}
          autoComplete="off"
          disabled={disabled}
          {...textFieldProps}
          {...field}
        />
      )}
    />
  );
};

export default TextFieldInput;
