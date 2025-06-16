interface RadioOptions {
  options: Array<number | string | { label: string; value: number | string }>;
  formControlLabelProps: {
    disableTypography: boolean;
    labelPlacement: "bottom" | "end" | "start" | "top";
  };
  radioProps: {
    color: "error" | "info" | "primary" | "secondary" | "success" | "warning";
    disableRipple: boolean;
    size: "medium" | "small";
  };
}

interface RadioOptionsForm {
  props: RadioOptions;
}

export type { RadioOptions, RadioOptionsForm };
