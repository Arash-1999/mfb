import type { GridProps } from "@mui/material";
import type { PropsWithChildren } from "react";

import { Grid } from "@mui/material";

type MuiGridProps = Omit<GridProps, "container">;

const GridItem = ({
  children,
  ...gridProps
}: PropsWithChildren<MuiGridProps>) => {
  return (
    <Grid container={false} {...gridProps}>
      {children}
    </Grid>
  );
};

export { GridItem };
