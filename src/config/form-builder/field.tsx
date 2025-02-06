import { type PropsWithChildren } from "react";
/*
 * this compeonent should handle lable, grid, helper text
 * it will wrap around every inputs in form builder.
 */

// TODO: add grid props
type FieldProps = PropsWithChildren<{
  label: string;
}>;

const Field = ({ label, children }: FieldProps) => {
  return (
    <div>
      <label>{label}</label>
      {children}
    </div>
  );
};

export default Field;
export type { FieldProps };
