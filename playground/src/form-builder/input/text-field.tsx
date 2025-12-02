import type { FieldValues } from "react-hook-form";

import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import type { InputProps } from "@mfb/core";
import type { TextFieldProps } from "@mui/material";

type MfbTextFieldProps<TFields extends FieldValues> = InputProps<
  TFields,
  {
    defaultValue?: string;
    textFieldProps?: Omit<
      TextFieldProps,
      | "defaultChecked"
      | "defaultValue"
      | "disabled"
      | "name"
      | "onBlur"
      | "onChange"
      | "value"
    >;
  }
>;

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

export default MfbTextField;
