import type { Grid2Props } from "@mui/material";
import type { PropsWithChildren } from "react";

import { useHover } from '@/hooks';
import { SortableContext } from "@dnd-kit/sortable";
import { DragHandle } from "@mui/icons-material";
import { Box, Grid2, IconButton, } from "@mui/material";

interface GridProps extends Grid2Props {
  enabled?: boolean;
}
type MuiGrid2Props = Omit<GridProps, "container" | "ref">;

const DraggableGridContainer = ({
  children,
  enabled,
  ...gridProps
}: PropsWithChildren<MuiGrid2Props>) => {
  const { isHovered, ref } = useHover<HTMLDivElement>({ enabled });

  return (
    <Grid2 container={true} ref={ref} {...gridProps}>
      <SortableContext items={[]}>
      {/* TODO: make position absolute */}
      {isHovered ? (
        <Box>
          {/* TODO: add resize button */}
          <IconButton>
            <DragHandle />
          </IconButton>
        </Box>
      ) : null}
      {children}
      </SortableContext>
    </Grid2>
  );
};

type DraggableGridContainerProps = PropsWithChildren<MuiGrid2Props>;

export { DraggableGridContainer };
export type { DraggableGridContainerProps };
