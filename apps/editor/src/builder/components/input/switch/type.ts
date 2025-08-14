import { FieldOptionsForm, GridItemOptionsForm } from "../../layout";

interface SwitchOptions {
  formControlLabelProps: {
    disableTypography: boolean;
    labelPlacement: "bottom" | "end" | "start" | "top";
  };
  label: string;
  switchProps: {
    color: "error" | "info" | "primary" | "secondary" | "success" | "warning";
    disableRipple: boolean;
    edge: "end" | "start" | false;
    size: "medium" | "small";
  };
}

interface SwitchOptionsForm extends FieldOptionsForm, GridItemOptionsForm {
  props: SwitchOptions;
}

export type { SwitchOptions, SwitchOptionsForm };
