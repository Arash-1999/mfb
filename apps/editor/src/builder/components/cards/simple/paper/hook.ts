import type { MuiConfig } from "@/builder";
import type { GetInputs } from "@mfb/core";

import type { InputFormKey } from "../type";
import type { PaperOptionsForm } from "./type";

import { useFieldOptions, useGridItemOptions } from "../../../layout";
import { paperOptions } from "./options";

type UseTextFieldFormReturn = Record<
  InputFormKey,
  GetInputs<MuiConfig, PaperOptionsForm>[]
>;

const usePaperForm = (): UseTextFieldFormReturn => {
  const fieldInputs = useFieldOptions<PaperOptionsForm>();
  const gridItemInputs = useGridItemOptions<PaperOptionsForm>({
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
    propsInputs: paperOptions,
  };
};

export { usePaperForm };
