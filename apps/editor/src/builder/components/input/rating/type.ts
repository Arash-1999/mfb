import { FieldOptionsForm, GridItemOptionsForm } from "../../layout";

interface RatingOptions {
  ratingProps: {
    highlightSelectedOnly: boolean;
    max: number;
    precision: number;
    readOnly: boolean;
    size: "large" | "medium" | "small";
  };
}

interface RatingOptionsForm extends FieldOptionsForm, GridItemOptionsForm {
  props: RatingOptions;
}

export type { RatingOptions, RatingOptionsForm };
