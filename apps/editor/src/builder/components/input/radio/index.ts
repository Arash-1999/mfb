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
    propsInputs: radioOptions,
  };
};

export { useRadioForm };
