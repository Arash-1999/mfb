import type { MuiConfig } from "@/builder";
import type { GetInputs } from "@mfb/core";

import type { InputFormKey } from "../type";

import { useFieldOptions, useGridItemOptions } from "../../layout";
import { radioOptions } from "./options";
import { RadioForm } from "./type";

type UseTextFieldFormReturn = Record<
  InputFormKey,
  GetInputs<MuiConfig, RadioForm>[]
>;

const useRadioForm = (): UseTextFieldFormReturn => {
  const fieldInputs = useFieldOptions<RadioForm>();
  const gridItemInputs = useGridItemOptions<RadioForm>({
    responsivePath: (name) => `gridProps.is_${name}_responsive`,
  });

  return {
    fieldInputs,
    gridItemInputs,
    propsInputs: radioOptions,
  };
};

export { useRadioForm };
