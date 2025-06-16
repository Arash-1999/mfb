import type { MuiConfig } from "@/builder";
import type { GetInputsImpl } from "@mfb/core";

import { useResponsiveStyle } from "@/builder/hooks/use-responsive-style";

import type {
  GridItemOptions,
  GridItemOptionsForm,
  ResponsiveKeys,
} from "./type";

const useGridItemOptions = (): Record<
  keyof GridItemOptions,
  | Array<GetInputsImpl<MuiConfig, GridItemOptionsForm>>
  | GetInputsImpl<MuiConfig, GridItemOptionsForm>
> => {
  const { convertToResponsive } = useResponsiveStyle<GridItemOptionsForm>({
    responsivePath: (name) =>
      `gridProps.is_${name as ResponsiveKeys}_responsive`,
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
