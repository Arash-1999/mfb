import { FormBuilder, FormBuilderConfig, GetInputs } from "@mfb/core";
import { getInput } from "./input";
import { getLayout } from "./layout";
import { FormField } from "./layout/field";

const config = {
  input: { compoents: getInput(), defaultValues: { text: "" } },
  field: FormField,
  layout: getLayout(),
} satisfies FormBuilderConfig;

type MfbInput = GetInputs<typeof config>;

const FB = new FormBuilder(config);

export { FB };
export type { MfbInput };
