import { ResponsiveStyleValue } from "@/builder/types";

interface GridContainerOptions {
  columns: ResponsiveStyleValue<number>;
  //   columnSpacing: number | string;
  //   direction: "column" | "column-reverse" | "row" | "row-reverse";
  //   rowSpacing: number | string;
  spacing: ResponsiveStyleValue<number | string>;
  //   wrap: "nowrap" | "wrap-reverse" | "wrap";
}

interface GridContainerOptionsForm {
  gridContainerProps: GridContainerOptions & {
    [key in ResponsiveKeys as `is_${keyof GridContainerOptions}_responsive`]: boolean;
  };
}
type ResponsiveKeys = "columns" | "spacing";

export type { GridContainerOptions, GridContainerOptionsForm, ResponsiveKeys };
