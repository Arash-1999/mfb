import type { MuiConfig } from "@/builder";
import type { GetInputs } from "@mfb/core";

import type { InputFormKey } from "../type";

import { useFieldOptions, useGridItemOptions } from "../../layout";
import { textFieldOptions } from "./options";
import { TestForm } from "./type";

type UseTextFieldFormReturn = Record<
  InputFormKey,
  GetInputs<MuiConfig, TestForm>[]
>;

const useTextFieldForm = (): UseTextFieldFormReturn => {
  const fieldInputs = useFieldOptions<TestForm>();
  const gridItemInputs = useGridItemOptions<TestForm>({
    responsivePath: (name) => `gridProps.is_${name}_responsive`,
  });

  return {
    fieldInputs,
    gridItemInputs,
    propsInputs: textFieldOptions,
  };
};

export { useTextFieldForm };
