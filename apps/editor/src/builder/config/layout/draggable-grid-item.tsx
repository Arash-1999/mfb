import type { Grid2Props } from "@mui/material";
import type { PropsWithChildren } from "react";

import { useHover } from '@/hooks';
import { DragHandle } from "@mui/icons-material";
import { Box,Grid2,  IconButton, } from "@mui/material";

type MuiGrid2Props = Omit<Grid2Props, "container" | "ref">;

const DraggableGridItem = ({
  children,
  ...gridProps
}: PropsWithChildren<MuiGrid2Props>) => {
  const { isHovered, ref } = useHover<HTMLDivElement>();

  return (
    <Grid2 container={false} ref={ref} {...gridProps}>
      {isHovered ? (
        <Box>
          {/* TODO: add resize button */}
          <IconButton>
            <DragHandle />
          </IconButton>
        </Box>
      ) : null}
      {children}
    </Grid2>
  );
};

type DraggableGridItemProps = PropsWithChildren<MuiGrid2Props>;

export { DraggableGridItem };
export type { DraggableGridItemProps };
