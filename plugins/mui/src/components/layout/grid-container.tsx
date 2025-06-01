import type { Grid2Props } from "@mui/material";
import type { PropsWithChildren } from "react";

import { Grid2 } from "@mui/material";

type MuiGridProps = Omit<Grid2Props, "container">;
const GridContainer = ({
  children,
  ...gridProps
}: PropsWithChildren<MuiGridProps>) => {
  return (
    <Grid2 container {...gridProps}>
      {children}
    </Grid2>
  );
};

type GridContainerProps = PropsWithChildren<MuiGridProps>;
export { GridContainer };
export type { GridContainerProps };
