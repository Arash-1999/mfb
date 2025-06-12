import type { MuiConfig } from "@/builder";
import type { GetInputsImpl } from "@mfb/core";

import { useResponsiveStyle } from "../hooks/use-responsive-style";
import { ResponsiveStyleValue } from "../types";

interface GridContainerOptions {
  columns: ResponsiveStyleValue<number>;
  //   columnSpacing: number | string;
  //   direction: "column" | "column-reverse" | "row" | "row-reverse";
  //   rowSpacing: number | string;
  spacing: ResponsiveStyleValue<number | string>;
  //   wrap: "nowrap" | "wrap-reverse" | "wrap";
}
type GridContainerOptionsForm = GridContainerOptions & {
  [key in ResponsiveKeys as `is_${keyof GridContainerOptions}_responsive`]: boolean;
};
type ResponsiveKeys = "columns" | "spacing";

const useGridContainerOptions = (): Record<
  keyof GridContainerOptions,
  | Array<GetInputsImpl<MuiConfig, GridContainerOptionsForm>>
  | GetInputsImpl<MuiConfig, GridContainerOptionsForm>
> => {
  const { convertToResponsive } = useResponsiveStyle<GridContainerOptionsForm>({
    responsivePath: (name) => `is_${name as ResponsiveKeys}_responsive`,
  });

  return {
    columns: convertToResponsive({
      name: "columns",
      props: {
        textFieldProps: {
          label: "Columns",
          placeholder: "Columns",
          size: "small",
        },
      },
      type: "text",
    }),
    spacing: convertToResponsive({
      name: "spacing",
      props: {
        textFieldProps: {
          label: "Spacing",
          placeholder: "Spacing",
          size: "small",
        },
      },
      type: "text",
    }),
    // columnSpacing: {},
    // direction: {},
    // rowSpacing: {},
    // spacing: {},
    // wrap: {},
  };
};

export { useGridContainerOptions };
export type { GridContainerOptions };
