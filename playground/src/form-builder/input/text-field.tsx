import type { FieldValues, Path } from "react-hook-form";

import { Controller, useFormContext } from "react-hook-form";
import TextField, { type TextFieldProps } from "@mui/material/TextField";

const TextFieldInput = <TFields extends FieldValues>({
  name,
  textFieldProps,
}: {
  name: Path<TFields>;
  textFieldProps?: Omit<
    TextFieldProps,
    "onChange" | "onBlur" | "disabled" | "value"
  >;
}) => {
  const { control } = useFormContext();

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
          {...textFieldProps}
          {...field}
        />
      )}
    />
  );
};

export default TextFieldInput;
