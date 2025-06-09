import type { GetInputsImpl } from "@mfb/core";
import type { Breakpoint } from "@mui/material";
import type { MuiConfig } from "@/builder";

import { useTheme } from "@mui/material";
import { useCallback } from "react";

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

const useResponsiveStyleValue = () => {
  const theme = useTheme();

  const convertToResponsive = useCallback(
    (
      item: GetInputsImpl<MuiConfig, GridContainerOptionsForm>,
      label: string
    ): Array<GetInputsImpl<MuiConfig, GridContainerOptionsForm>> => {
      const name = item.name as keyof GridContainerOptions;
      return [
        {
          type: "checkbox",
          name: `is_${name}_responsive`,
          props: {
            // defaultValue: true,
            label: "Is responsive",
          },
        },
        {
          dependsOn: {
            path: `is_${name}_responsive`,
            condition: "eq",
            id: "is_responsive",
            type: "visibility",
            value: false,
          },
          name: name,
          props: {
            textFieldProps: {
              label: label,
              placeholder: label,
              size: "small",
            },
          },
          type: "text",
        },
        ...theme.breakpoints.keys.map(
          (key): GetInputsImpl<MuiConfig, GridContainerOptionsForm> => ({
            dependsOn: {
              path: `is_${name}_responsive`,
              condition: "eq",
              id: "is_responsive",
              type: "visibility",
              value: true,
            },
            name: `${name}.${key}`,
            props: {
              textFieldProps: {
                label: label + key,
                placeholder: label + key,
                size: "small",
              },
            },
            type: "text",
          })
        ),
      ];
    },
    [theme.breakpoints.keys]
  );

  return { convertToResponsive };
};

const useGridContainerOptions = (): Record<
  keyof GridContainerOptions,
  | Array<GetInputsImpl<MuiConfig, GridContainerOptionsForm>>
  | GetInputsImpl<MuiConfig, GridContainerOptionsForm>
> => {
  const { convertToResponsive } = useResponsiveStyleValue();

  return {
    columns: convertToResponsive(
      {
        props: {
          textFieldProps: {
            label: "Columns",
            placeholder: "Columns",
          },
        },
        name: "columns",
        type: "text",
      },
      "Columns"
    ),
    spacing: convertToResponsive(
      {
        props: {},
        name: "spacing",
        type: "text",
      },
      "Spacing"
    ),
    // columnSpacing: {},
    // direction: {},
    // rowSpacing: {},
    // spacing: {},
    // wrap: {},
  };
};

export { useGridContainerOptions };
export type { GridContainerOptions };
