import type { MuiConfig } from "@/builder";
import type { GetInputs } from "@mfb/core";
import type { Path } from "react-hook-form";

import { useResponsiveStyle } from "@/builder/hooks/use-responsive-style";

import type { GridItemOptionsForm, ResponsiveKeys } from "./type";

interface UseGridItemOptionsProps<TForm extends GridItemOptionsForm> {
  responsivePath: (name: ResponsiveKeys) => Path<TForm>;
}

const useGridItemOptions = <TForm extends GridItemOptionsForm>({
  responsivePath,
}: UseGridItemOptionsProps<TForm>): Array<GetInputs<MuiConfig, TForm>> => {
  const { convertToResponsive } = useResponsiveStyle<TForm>({
    responsivePath: (name) => responsivePath(name as ResponsiveKeys),
  });

  return [
    ...convertToResponsive({
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
    ...convertToResponsive({
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
  ];
};

export { useGridItemOptions };
