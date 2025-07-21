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

interface SwitchOptionsForm {
  props: SwitchOptions;
}

export type { SwitchOptions, SwitchOptionsForm };
