import type { ResponsiveStyleValue } from "@/builder/types";

interface GridItemOptions {
  offset: ResponsiveStyleValue<number | string>;
  size: ResponsiveStyleValue<number | string>;
}

interface GridItemOptionsForm {
  gridProps: Partial<GridItemOptions> & {
    [key in ResponsiveKeys as `is_${keyof GridItemOptions}_responsive`]: boolean;
  };
}

type ResponsiveKeys = "offset" | "size";

export type { GridItemOptions, GridItemOptionsForm, ResponsiveKeys };
