import type {
  FieldOptionsForm,
  GridItemOptionsForm,
} from "@/builder/components";

interface PaperOptions {
  variant?: "elevation" | "outlined";
  elevation?: number;
  square?: boolean;
}

interface PaperOptionsForm extends FieldOptionsForm, GridItemOptionsForm {
  props: PaperOptions;
  formSpecific?: {
    label?: string;
    helperText?: string;
    required?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
  };
}

export type { PaperOptions, PaperOptionsForm };
