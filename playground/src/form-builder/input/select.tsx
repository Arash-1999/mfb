import type { InputProps } from "@mfb/core";
import type { FieldValues } from "react-hook-form";
import type { SelectProps } from "@mui/material";

import { MenuItem, Select } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

type SelectInputProps = {
  deps?: Array<string>;
  options:
    | Array<{ label: string; value: string }>
    | {
        method: "GET" | "POST" | "PUT" | "PATCH";
        url: string;
      };
  selectProps?: Omit<SelectProps, "onChange" | "onBlur" | "disabled" | "value">;
};

const SelectInput = <TFields extends FieldValues>({
  deps,
  name,
  options,
  selectProps,
}: InputProps<TFields, SelectInputProps>) => {
  const formMethods = useFormContext<TFields>();

  console.log(name, deps);
  return (
    <Controller
      name={name}
      control={formMethods.control}
      render={({ field: { value, onChange, ref, ...field } }) => (
        <Select
          value={value || ""}
          onChange={(event) => {
            onChange(event.target.value);
          }}
          inputRef={ref}
          fullWidth
          {...field}
          {...selectProps}
        >
          {Array.isArray(options)
            ? options.map((option, index) => (
                <MenuItem key={`option-${index}`} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            : null}
        </Select>
      )}
    />
  );
};

export default SelectInput;
