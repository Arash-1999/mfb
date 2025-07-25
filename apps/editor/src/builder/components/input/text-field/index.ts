import type { MuiConfig } from "@/builder";
import type { GetInputs } from "@mfb/core";

import type { InputFormKey } from "../type";
import type { TextFieldForm } from "./type";

import { useFieldOptions, useGridItemOptions } from "../../layout";
import { textFieldOptions } from "./options";

type UseTextFieldFormReturn = Record<
  InputFormKey,
  GetInputs<MuiConfig, TextFieldForm>[]
>;

const useTextFieldForm = (): UseTextFieldFormReturn => {
  const fieldInputs = useFieldOptions<TextFieldForm>();

  const gridItemInputs = useGridItemOptions<TextFieldForm>({
    depPrefix: "gridProps",
    responsivePath: (name) => {
      if (!/\./.test(name)) return `is_${name}_responsive` as never;

      const splitedPath = name.split(".");
      return `${splitedPath.slice(0, -1).join(".")}.is_${splitedPath.at(-1)}_responsive` as never;
    },
  });

  return {
    fieldInputs,
    gridItemInputs,
    propsInputs: textFieldOptions,
  };
};

export { useTextFieldForm };
