import { PropsWithChildren } from "react";
import type { Grid2Props } from "@mui/material";
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

const GridItem = ({
  children,
  ...gridProps
}: PropsWithChildren<MuiGridProps>) => {
  return (
    <Grid2 container={false} {...gridProps}>
      {children}
    </Grid2>
  );
};

export { GridContainer, GridItem };
