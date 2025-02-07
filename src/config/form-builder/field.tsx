import type { ReactNode } from "react";
import type { PropsWithChildren } from "react";
import type { GridItemProps } from "./layout";
import { GridItem } from "./layout";

/*
 * this compeonent should handle label, grid, helper text
 * it will wrap around every inputs in form builder.
 */
type FieldProps = PropsWithChildren<
  {
    label?: ReactNode;
  } & Partial<GridItemProps>
>;

// TODO: move to global utils folder
const simpleRenderGuard = (node: unknown): node is number | string => {
  return typeof node === "string" || typeof node === "number";
};

// TODO: add other field props (id,name -> pass to htmlFor)
const Field = ({ label, children, span = 12 }: FieldProps) => {
  return (
    <GridItem span={span}>
      <div>
        {/* TODO: change label render functionality for compatability with htmlFor */}
        {simpleRenderGuard(label) ? <label>{label}</label> : label}
        {children}
      </div>
    </GridItem>
  );
};

export default Field;
export type { FieldProps };
