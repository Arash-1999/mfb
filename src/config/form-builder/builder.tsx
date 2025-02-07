import FormBuilder from "../../form-builder/component";
import { FormBuilderConfig, GetInputs } from "../../form-builder/types";
import Field from "./field";
import { RadioInput, TextInput } from "./input";
import { GridContainer, GridItem } from "./layout";

const config = {
  input: {
    text: TextInput,
    radio: RadioInput,
  },
  field: Field,
  layout: {
    "grid-container": GridContainer,
    "grid-item": GridItem,
    field: Field,
  },
} satisfies FormBuilderConfig;

type SingleInput = GetInputs<typeof config>;

const FB = new FormBuilder(config);

export { FB };
export type { SingleInput };
