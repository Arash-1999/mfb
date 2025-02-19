import type { PropsWithChildren } from "react";

import FormControl, { type FormControlProps } from "@mui/material/FormControl";

const FormField = ({
  children,
}: PropsWithChildren<{ controlProps: FormControlProps }>) => {
  return <FormControl>{children}</FormControl>;
};

export { FormField };
