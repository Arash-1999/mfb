import type { MuiConfig } from "@/builder";
import type { GetInputs } from "@mfb/core";

import type { InputFormKey } from "../type";

import { useFieldOptions, useGridItemOptions } from "../../layout";
import { SwitchOptionsForm } from "./type";
import { switchOptions } from "./options";

type UseTextFieldFormReturn = Record<
  InputFormKey,
  GetInputs<MuiConfig, SwitchOptionsForm>[]
>;

const useSwitchForm = (): UseTextFieldFormReturn => {
  const fieldInputs = useFieldOptions<SwitchOptionsForm>();
  const gridItemInputs = useGridItemOptions<SwitchOptionsForm>({
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
    propsInputs: switchOptions,
  };
};

export { useSwitchForm };
