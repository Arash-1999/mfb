import type { InputProps } from "@mfb/core";
import type { TextFieldProps } from "@mui/material";
import type { FieldValues } from "react-hook-form";

import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type MfbTextFieldProps<TFields extends FieldValues> = InputProps<
  TFields,
  {
    textFieldProps?: Omit<
      TextFieldProps,
      "disabled" | "onBlur" | "onChange" | "value"
    >;
  }
>;

const MfbTextField = <TFields extends FieldValues>({
  name,
  textFieldProps,
}: MfbTextFieldProps<TFields>) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, value, ...field } }) => (
        <TextField
          inputRef={ref}
          type="text"
          value={value || ""}
          {...field}
          {...textFieldProps}
        />
      )}
    />
  );
};

export { MfbTextField };
