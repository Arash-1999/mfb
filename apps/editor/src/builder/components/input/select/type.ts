interface SelectOptions {
  formControlProps: {
    color: "error" | "info" | "primary" | "secondary" | "success" | "warning";
    fullWidth: boolean;
    hiddenLabel: boolean;
    margin: "dense" | "none" | "normal";
    size: "medium" | "small";
  };
  inputLabelProps: {
    color: "error" | "info" | "primary" | "secondary" | "success" | "warning";
    disableAnimation: boolean;
    size: "medium" | "small";
    variant: "filled" | "outlined" | "standard";
  };
  label: string;
  options: Array<{ label: string; value: string }>;
  selectProps: {
    autoWidth: boolean;
    defaultOpen: boolean;
    multiple: boolean;
    native: boolean;
    variant: "filled" | "outlined" | "standard";
  };
}

interface SelectOptionsForm {
  props: SelectOptions;
}

export type { SelectOptions, SelectOptionsForm };
