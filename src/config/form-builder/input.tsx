import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { type UseFormReturn } from "react-hook-form";

type InputBase = {
  path: string;
  formMethods: UseFormReturn;
};

type TextInputProps = {} & InputBase &
  Omit<ComponentPropsWithoutRef<"input">, "type">;
const TextInput = (props: TextInputProps) => {
  const { formMethods, path, ...resolvedProps } = props;

  return (
    <input type="text" {...formMethods.register(path)} {...resolvedProps} />
  );
};

type RadioOption = {
  key: string;
  value: string;
  label: ReactNode;
};
type RadioInputProps = {
  options: Array<RadioOption>;
  inputProps?: Omit<ComponentPropsWithoutRef<"input">, "value" | "type">;
} & InputBase;
const RadioInput = (props: RadioInputProps) => {
  const {
    formMethods: { register },
    path,
    options,
    inputProps,
  } = props;
  return (
    <div>
      {options.map((option) => (
        <label key={option.key}>
          <input
            type="radio"
            value={option.value}
            {...register(path)}
            {...inputProps}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export { RadioInput, TextInput };
export type { TextInputProps, RadioInputProps };
