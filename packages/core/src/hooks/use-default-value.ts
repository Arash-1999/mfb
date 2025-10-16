import type { FormBuilderConfig, ItemArray } from "@mfb/types";
import type { FieldValues } from "react-hook-form";

import { DefaultValue } from "@/utils";
import { useMemo } from "react";

const useDefaultValue = <
  TConfig extends FormBuilderConfig,
  TFields extends FieldValues,
>(
  config: TConfig,
  list: ItemArray<TFields>,
) => {
  return useMemo(() => {
    const _defaultValues = new DefaultValue<TConfig, TFields>(config, list);
    return {
      defaultValues: _defaultValues.result,
      fieldArray: _defaultValues.fieldArray,
    };
  }, [config, list]);
};

export { useDefaultValue };
