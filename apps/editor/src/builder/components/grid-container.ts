import type { GetInputsImpl } from "@mfb/core";
import type { Breakpoint } from "@mui/material";
import type { MuiConfig } from "@/builder";

import { useTheme } from "@mui/material";
import { useCallback } from "react";
import { useResponsiveStyle } from "../hooks/use-responsive-style";

type ResponsiveStyleValue<T> = T | { [key in Breakpoint]?: T | null };

type ResponsiveKeys = "columns";
interface GridContainerOptions {
  columns: ResponsiveStyleValue<number>;
  //   columnSpacing: number | string;
  //   direction: "column" | "column-reverse" | "row" | "row-reverse";
  //   rowSpacing: number | string;
  spacing: number | string;
  //   wrap: "nowrap" | "wrap-reverse" | "wrap";
}
type GridContainerOptionsForm = {
  [key in ResponsiveKeys as `is_${keyof GridContainerOptions}_responsive`]: boolean;
} & GridContainerOptions;

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
      props: {
        textFieldProps: {
          label: "Columns",
          placeholder: "Columns",
          size: "small",
        },
      },
      name: "columns",
      type: "text",
    }),
    spacing: convertToResponsive({
      props: {
        textFieldProps: {
          label: "Spacing",
          placeholder: "Spacing",
          size: "small",
        },
      },
      name: "spacing",
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
