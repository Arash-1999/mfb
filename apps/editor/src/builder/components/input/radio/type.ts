import type { FieldOptionsForm, GridItemOptionsForm } from "../../layout";

interface RadioFormValue extends FieldOptionsForm, GridItemOptionsForm {
  props: RadioOptions;
}
interface RadioOptions {
  formControlLabelProps: {
    disableTypography: boolean;
    labelPlacement: "bottom" | "end" | "start" | "top";
  };
  options: Array<number | string | { label: string; value: number | string }>;
  radioProps: {
    color: "error" | "info" | "primary" | "secondary" | "success" | "warning";
    disableRipple: boolean;
    size: "medium" | "small";
  };
}

export type { RadioFormValue, RadioOptions };
