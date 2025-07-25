import type { MuiConfig } from "@/builder";
import type { GetInputsImpl } from "@mfb/core";

import { useResponsiveStyle } from "@/builder/hooks/use-responsive-style";

import {
  GridContainerOptions,
  GridContainerOptionsForm,
  ResponsiveKeys,
} from "./type";

const useGridContainerOptions = (): Record<
  keyof GridContainerOptions,
  | Array<GetInputsImpl<MuiConfig, GridContainerOptionsForm>>
  | GetInputsImpl<MuiConfig, GridContainerOptionsForm>
> => {
  const { convertToResponsive } = useResponsiveStyle<GridContainerOptionsForm>({
    responsivePath: (name) =>
      `gridContainerProps.is_${name as ResponsiveKeys}_responsive`,
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
