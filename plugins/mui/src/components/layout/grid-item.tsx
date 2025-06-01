import type { Grid2Props } from "@mui/material";
import type { PropsWithChildren } from "react";

import { Grid2 } from "@mui/material";

type MuiGrid2Props = Omit<Grid2Props, "container">;

const GridItem = ({
  children,
  ...gridProps
}: PropsWithChildren<MuiGrid2Props>) => {
  return (
    <Grid2 container={false} {...gridProps}>
      {children}
    </Grid2>
  );
};

type GridItemProps = PropsWithChildren<MuiGrid2Props>;
export { GridItem };
export type { GridItemProps };
