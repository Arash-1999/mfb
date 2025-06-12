import type { MuiConfig } from "@/builder";
import type { GetInputsImpl } from "@mfb/core";

import { useResponsiveStyle } from "../hooks/use-responsive-style";
import { ResponsiveStyleValue } from "../types";

interface GridItemOptions {
  offset: ResponsiveStyleValue<number | string>;
  size: ResponsiveStyleValue<number | string>;
}
type GridItemOptionsForm = GridItemOptions & {
  [key in ResponsiveKeys as `is_${keyof GridItemOptions}_responsive`]: boolean;
};
type ResponsiveKeys = "offset";

const useGridItemOptions = (): Record<
  keyof GridItemOptions,
  | Array<GetInputsImpl<MuiConfig, GridItemOptionsForm>>
  | GetInputsImpl<MuiConfig, GridItemOptionsForm>
> => {
  const { convertToResponsive } = useResponsiveStyle<GridItemOptionsForm>({
    responsivePath: (name) => `is_${name as ResponsiveKeys}_responsive`,
  });

  return {
    offset: convertToResponsive({
      name: "offset",
      props: {
        textFieldProps: {
          label: "Offset",
          placeholder: "Number between 0 and 'columns'",
          size: "small",
        },
      },
      type: "text",
    }),
    size: convertToResponsive({
      name: "size",
      props: {
        textFieldProps: {
          label: "Size",
          placeholder: "Number between 0 and columns",
          size: "small",
        },
      },
      type: "text",
    }),
  };
};

export { useGridItemOptions };
export type { GridItemOptions };
