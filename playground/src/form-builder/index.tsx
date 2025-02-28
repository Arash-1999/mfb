import { FormBuilder, FormBuilderConfig, GetInputs } from "@mfb/core";
import { getInput } from "./input";
import { getLayout } from "./layout";

const config = {
  input: { components: getInput(), defaultValues: { text: "" } },
  layout: getLayout(),
} satisfies FormBuilderConfig;

type MfbInput = GetInputs<typeof config>;

const FB = new FormBuilder(config);

export { FB };
export type { MfbInput };
