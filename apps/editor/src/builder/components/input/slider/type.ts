interface SliderOptions {
  sliderProps: {
    color: "error" | "info" | "primary" | "secondary" | "success" | "warning";
    disableSwap: boolean;
    // marks: boolean | Array<{ value: number }>;
    max: number;
    min: number;
    orientation: "horizontal" | "vertical";
    shiftStep: number;
    size: "medium" | "small";
    step: number;
    track: "inverted" | "normal" | false;
    valueLabelDisplay: "auto" | "off" | "on";
    valueLabelFormat: string;
  };
}

interface SliderOptionsForm {
  props: SliderOptions;
}

export type { SliderOptions, SliderOptionsForm };
