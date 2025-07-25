interface RatingOptions {
  ratingProps: {
    highlightSelectedOnly: boolean;
    max: number;
    precision: number;
    readOnly: boolean;
    size: "large" | "medium" | "small";
  };
}

interface RatingOptionsForm {
  props: RatingOptions;
}

export type { RatingOptions, RatingOptionsForm };
