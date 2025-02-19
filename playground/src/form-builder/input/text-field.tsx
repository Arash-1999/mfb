import type { FieldValues, Path } from "react-hook-form";

import { Controller, useFormContext } from "react-hook-form";
import TextField, { type TextFieldProps } from "@mui/material/TextField";

const TextFieldInput = <TData extends FieldValues>({
  name,
  textFieldProps,
}: {
  name: Path<TData>;
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
      render={({ field: { ref, ...field } }) => (
        <TextField inputRef={ref} {...textFieldProps} {...field} />
      )}
    />
  );
};

export default TextFieldInput;
