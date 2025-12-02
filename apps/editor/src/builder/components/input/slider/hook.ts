import type { MuiConfig } from "@/builder";
import type { GetInputs } from "@mfb/core";

import type { InputFormKey } from "../type";

import { useFieldOptions, useGridItemOptions } from "../../layout";
import { SliderOptionsForm } from "./type";
import { sliderOptions } from "./options";

type UseTextFieldFormReturn = Record<
  InputFormKey,
  GetInputs<MuiConfig, SliderOptionsForm>[]
>;

const useSliderForm = (): UseTextFieldFormReturn => {
  const fieldInputs = useFieldOptions<SliderOptionsForm>();
  const gridItemInputs = useGridItemOptions<SliderOptionsForm>({
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
    propsInputs: sliderOptions,
  };
};

export { useSliderForm };
