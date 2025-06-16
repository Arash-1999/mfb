interface FieldOptions {
  color: "error" | "info" | "primary" | "secondary" | "success" | "warning";
  fullWidth: boolean;
  hiddenLabel: boolean;
  margin: "dense" | "none" | "normal";
  size: "medium" | "small";
  variant: "filled" | "outline" | "standard";
}

interface FieldOptionsForm {
  field: FieldOptions;
}
export type { FieldOptions, FieldOptionsForm };
