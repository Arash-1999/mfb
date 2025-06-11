import type { GetInputsImpl } from "@mfb/core";
import type { FieldValues, Path } from "react-hook-form";
import type { MuiConfig } from "@/builder";

import { useTheme } from "@mui/material";

interface UseResponsiveStyleProps<TFields extends FieldValues> {
  responsivePath: (name: string) => Path<TFields>;
}

interface UseResponsiveStyleReturn<TFields extends FieldValues> {
  convertToResponsive: (
    item: GetInputsImpl<MuiConfig, TFields>
  ) => Array<GetInputsImpl<MuiConfig, TFields>>;
}
const useResponsiveStyle = <TFields extends FieldValues>({
  responsivePath,
}: UseResponsiveStyleProps<TFields>): UseResponsiveStyleReturn<TFields> => {
  const theme = useTheme();

  const convertToResponsive: UseResponsiveStyleReturn<TFields>["convertToResponsive"] =
    (item) => {
      return [
        {
          name: responsivePath(item.name),
          type: "checkbox",
          gridProps: { size: 12 },
          props: {
            label: "Is responsive",
          },
        },
        {
          dependsOn: {
            path: responsivePath(item.name),
            condition: "eq",
            id: "is_responsive",
            type: "visibility",
            value: false,
          },
          ...item,
        },
        ...theme.breakpoints.keys.map(
          (key): GetInputsImpl<MuiConfig, TFields> => ({
            dependsOn: {
              path: responsivePath(item.name),
              condition: "eq",
              id: "is_responsive",
              type: "visibility",
              value: true,
            },
            gridProps: {
              size: 12 / theme.breakpoints.keys.length,
            },
            ...item,
            name: `${item.name}.${key}`,
          })
        ),
      ];
    };

  return {
    convertToResponsive,
  };
};

export { useResponsiveStyle };
