import type { FieldValues } from "react-hook-form";

import { FormBuilder, FormBuilderConfig, GetInputs } from "@mfb/core";
import { MfbButton } from "./button";
import { getInput } from "./input";
import { getLayout } from "./layout";
import { getGroupCard, getSimpleCard } from "./card";

const config = {
  button: {
    component: MfbButton,
    icon: () => <></>,
  },
  card: {
    group: getGroupCard(),
    simple: getSimpleCard(),
  },
  input: { components: getInput(), defaultValues: { text: "" } },
  layout: getLayout(),
} satisfies FormBuilderConfig;

type MfbInput<TFields extends FieldValues> = GetInputs<typeof config, TFields>;

type Config = typeof config;

type FormId =
  | "TEST_PAGE_FORM_ID"
  | "ADVANCED_FORM_TEST_ID"
  | "TEST_PAGE_2_FORM_ID";

const FB = new FormBuilder<Config, FormId>(config);

export { FB };
export type { MfbInput };
