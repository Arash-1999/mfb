import type { MuiConfig } from "@/builder";
import type { GetInputs } from "@mfb/core";
import type { InputFormKey } from "../../simple/type";
import type { AccordionOptionsForm } from "./type";

import { useFieldOptions, useGridItemOptions } from "../../../layout";
import { accordionOptions } from "./options";

type UseTextFieldFormReturn = Record<
  InputFormKey,
  GetInputs<MuiConfig, AccordionOptionsForm>[]
>;

const useAccordionForm = (): UseTextFieldFormReturn => {
  const fieldInputs = useFieldOptions<AccordionOptionsForm>();
  const gridItemInputs = useGridItemOptions<AccordionOptionsForm>({
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
    propsInputs: accordionOptions,
  };
};

export { useAccordionForm };
