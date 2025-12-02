import type { MuiConfig } from "@/builder";
import type { GetInputs } from "@mfb/core";

import type { InputFormKey } from "../type";
import type { RadioFormValue } from "./type";

import { useFieldOptions, useGridItemOptions } from "../../layout";
import { radioOptions } from "./options";

type UseTextFieldFormReturn = Record<
  InputFormKey,
  GetInputs<MuiConfig, RadioFormValue>[]
>;

const useRadioForm = (): UseTextFieldFormReturn => {
  const fieldInputs = useFieldOptions<RadioFormValue>();
  const gridItemInputs = useGridItemOptions<RadioFormValue>({
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
