import type { Grid2Props } from "@mui/material";
import type { PropsWithChildren } from "react";

import { useHover } from '@/hooks';
import { useSortable } from "@dnd-kit/sortable";
import { useCombinedRefs } from "@dnd-kit/utilities";
import { DragHandle } from "@mui/icons-material";
import { Box, Grid2, IconButton, } from "@mui/material";

type MuiGrid2Props = Omit<Grid2Props, "container" | "ref">;

const DraggableGridItem = ({
  children,
  sx,
  ...gridProps
}: PropsWithChildren<MuiGrid2Props>) => {
  const { isHovered, ref } = useHover<HTMLDivElement>();
  const { listeners, setNodeRef } = useSortable({ id: 1 });
  const combinedRef = useCombinedRefs<HTMLDivElement>(ref, setNodeRef);

  return (
    <Grid2
      container={false}
      ref={combinedRef}
      sx={{position: 'relative', ...sx}}
      {...gridProps}
    >
      {isHovered ? (
        <Box sx={{
          backgroundColor: 'background.paper',
          inset: '0 0 auto',
          position: "absolute",
          zIndex: 10,
        }}>
          {/* TODO: add resize button */}
          <IconButton {...listeners}>
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
