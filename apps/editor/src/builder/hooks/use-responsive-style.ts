import type { MuiConfig } from "@/builder";
import type { GetInputsImpl } from "@mfb/core";
import type { FieldValues, Path } from "react-hook-form";

import { useTheme } from "@mui/material";

interface UseResponsiveStyleProps<TFields extends FieldValues> {
  depPrefix: string;
  responsivePath: (name: string) => Path<TFields>;
}

interface UseResponsiveStyleReturn<TFields extends FieldValues> {
  convertToResponsive: (
    item: GetInputsImpl<MuiConfig, TFields>
  ) => Array<GetInputsImpl<MuiConfig, TFields>>;
}
const useResponsiveStyle = <TFields extends FieldValues>({
  depPrefix,
  responsivePath,
}: UseResponsiveStyleProps<TFields>): UseResponsiveStyleReturn<TFields> => {
  const theme = useTheme();

  const convertToResponsive: UseResponsiveStyleReturn<TFields>["convertToResponsive"] =
    (item) => {
      return [
        {
          gridProps: { size: 12 },
          name: responsivePath(item.name),
          props: {
            label: "Is responsive",
          },
          type: "checkbox",
        },
        {
          dependsOn: {
            condition: "eq",
            id: "is_responsive",
            path: `${depPrefix}.${responsivePath(item.name)}` as Path<TFields>,
            type: "hide",
            value: true,
          },
          ...item,
        },
        ...theme.breakpoints.keys.map(
          (key): GetInputsImpl<MuiConfig, TFields> => ({
            dependsOn: {
              condition: "eq",
              id: "is_responsive",
              path: `${depPrefix}.${responsivePath(item.name)}` as Path<TFields>,
              type: "hide",
              value: false,
            },
            gridProps: {
              size: 12,
              // size: 12 / theme.breakpoints.keys.length,
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
