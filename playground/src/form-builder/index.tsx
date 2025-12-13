import type { FieldValues } from "react-hook-form";
import type { FormatName } from "@mfb/ajv-plugin";

import { MfbAjvPlugin } from "@mfb/ajv-plugin";
import { FormBuilder, FormBuilderConfig, GetInputs } from "@mfb/core";
// import { MfbFieldArray } from "./field-array";
import { MfbButton } from "./button";
import { getInput } from "./input";
import { getLayout } from "./layout";
import { getGroupCard, getSimpleCard } from "./card";

const config = {
  button: {
    component: MfbButton,
  },
  card: {
    group: getGroupCard(),
    simple: getSimpleCard(),
  },
  input: {
    components: getInput(),
    defaultValues: { select: "fab67329-8854-4e22-a0e6-8207be509905", text: "" },
  },
  layout: getLayout(),
  validator: new MfbAjvPlugin<FormatName>(),
  options: {
    extraConditions: {
      lt: (target, value) => {
        const [a, b] = [Number(value), Number(target)];
        if (!isNaN(a) && !isNaN(b)) return a < b;
        else return false;
      },
    },
  },
} satisfies FormBuilderConfig;

type MfbInput<TFields extends FieldValues> = GetInputs<typeof config, TFields>;

type Config = typeof config;

type FormId =
  | "TEST_PAGE_FORM_ID"
  | "ADVANCED_FORM_TEST_ID"
  | "TEST_PAGE_2_FORM_ID";

const FB = new FormBuilder<Config, FormId>(
  config,
  // { FieldArray: MfbFieldArray, }
);

export { config, FB };
export type { Config, MfbInput };
