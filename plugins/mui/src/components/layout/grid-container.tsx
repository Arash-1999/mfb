import type { GridProps } from "@mui/material";
import type { PropsWithChildren } from "react";

import { Grid } from "@mui/material";

type MuiGridProps = Omit<GridProps, "container">;
const GridContainer = ({
  children,
  ...gridProps
}: PropsWithChildren<MuiGridProps>) => {
  return (
    <Grid container {...gridProps}>
      {children}
    </Grid>
  );
};

export { GridContainer };
