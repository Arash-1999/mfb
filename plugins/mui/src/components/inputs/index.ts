import type { JSX } from "react";

import { MfbCheckbox } from "./checkbox";
import { MfbTextField } from "./text-field";
import { MfbRadioGroup } from "./radio";

import type { MfbCheckboxProps } from "./checkbox";
import type { MfbTextFieldProps } from "./text-field";
import type { MfbRadioGroupProps } from "./radio/type";

interface InputsReturn {
  checkbox: (props: MfbCheckboxProps) => JSX.Element;
  radio: (props: MfbRadioGroupProps) => JSX.Element;
  text: (props: MfbTextFieldProps) => JSX.Element;
}

const getInputsConfig = (): InputsReturn => {
  return {
    checkbox: MfbCheckbox,
    radio: MfbRadioGroup,
    text: MfbTextField,
  };
};

export { getInputsConfig };
export type { InputsReturn };
