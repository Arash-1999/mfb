import type { InputProps } from "@mfb/core";
import type { FieldValues } from "react-hook-form";
import type { SelectProps } from "@mui/material";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
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
  // deps,
  name,
  options,
  selectProps,
}: InputProps<TFields, SelectInputProps>) => {
  const formMethods = useFormContext<TFields>();

  return (
    <Controller
      name={name}
      control={formMethods.control}
      render={({ field: { value, onChange, ref, ...field } }) => (
        // <div style={{ border: '1px solid crimson'}}>

        <FormControl fullWidth>
          <InputLabel id={name} size='small'>{selectProps?.label}</InputLabel>
          <Select
            value={value || ""}
            onChange={(event) => {
              onChange(event.target.value);
            }}
            inputRef={ref}
            fullWidth
            labelId={name}
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
        </FormControl>
        // </div>
      )}
    />
  );
};

export default SelectInput;
