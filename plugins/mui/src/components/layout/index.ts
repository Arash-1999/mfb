import type { JSX } from "react";

import type { FormFieldProps } from "./field";
import type { GridContainerProps } from "./grid-container";
import type { GridItemProps } from "./grid-item";

import { FormField } from "./field";
import { GridContainer } from "./grid-container";
import { GridItem } from "./grid-item";

interface LayoutReturn {
  field: (props: FormFieldProps) => JSX.Element;
  "grid-container": (props: GridContainerProps) => JSX.Element;
  "grid-item": (props: GridItemProps) => JSX.Element;
}

const getLayoutConfig = (): LayoutReturn => {
  return {
    field: FormField,
    "grid-container": GridContainer,
    "grid-item": GridItem,
  } as const;
};

export { FormField, getLayoutConfig, GridContainer, GridItem };
export type { LayoutReturn };
