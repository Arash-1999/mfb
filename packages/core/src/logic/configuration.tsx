import type {
  FieldArrayOverrideProps,
  FormBuilderConfig,
  FormBuilderContext,
  FormBuilderOptions,
  FormBuilderOverrides,
  MfbContextValue,
} from "@mfb/types";
import type { Context, ReactNode } from "react";
import type { FieldValues } from "react-hook-form";

import { options as defaultOptions } from "@/constants";
import { ItemInfo } from "@/utils";
import { createContext, useContext } from "react";

class Configuration<TConfig extends FormBuilderConfig, TFormId extends string> {
  protected childrenPath: ItemInfo<TConfig>;
  protected config: TConfig;
  protected Context: Context<FormBuilderContext<TFormId> | null>;
  protected FieldArrayOverride?: <
    TFields extends FieldValues,
    TFormId extends string,
  >(
    props: FieldArrayOverrideProps<TFields, TFormId>,
  ) => ReactNode;
  protected options: FormBuilderOptions;

  constructor(
    config: TConfig,
    // options?: Partial<FormBuilderOptions>,
    overrides?: FormBuilderOverrides,
  ) {
    this.childrenPath = new ItemInfo<TConfig>();
    this.config = config;
    this.Context = createContext<FormBuilderContext<TFormId> | null>(null);
    this.options = { ...defaultOptions, ...config.options };

    if (overrides?.FieldArray) this.FieldArrayOverride = overrides.FieldArray;
  }

  protected useMfbContext = <TFields extends FieldValues>() => {
    const { Context } = this;

    return (
      (useContext(Context) as MfbContextValue<TFields, TFormId>) ||
      ({
        defaultValues: {},
        fieldArray: {},
        id: "",
      } as MfbContextValue<TFields, TFormId>)
    );
  };
}

export { Configuration };
