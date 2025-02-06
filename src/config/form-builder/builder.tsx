import FormBuilder from "../../form-builder/component";
import { FormBuilderConfig, GetInputs } from "../../form-builder/types";
import Field from "./field";
import { RadioInput, TextInput } from "./input";

const config = {
  input: {
    text: TextInput,
    radio: RadioInput,
  },
  field: Field,
} satisfies FormBuilderConfig;

type SingleInput = GetInputs<typeof config>;

const FB = new FormBuilder(config);

export { FB };
export type { SingleInput };
