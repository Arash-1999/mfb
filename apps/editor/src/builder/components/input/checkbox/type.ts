import type { FieldOptionsForm, GridItemOptionsForm } from "../../layout";

interface CheckboxOptions {
  color: "error" | "info" | "primary" | "secondary" | "success" | "warning";
  disableRipple: boolean;
  size: "medium" | "small";
}

interface CheckboxOptionsForm extends FieldOptionsForm, GridItemOptionsForm {
  props: CheckboxOptions;
}

export type { CheckboxOptions, CheckboxOptionsForm };
