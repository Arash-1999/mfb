import type { Grid2Props, SxProps, Theme } from "@mui/material";
import type { PropsWithChildren, ReactNode } from "react";

import { useHover } from "@/hooks";
import { useSortable } from "@dnd-kit/sortable";
import { useCombinedRefs } from "@dnd-kit/utilities";
import { DragHandle, Edit } from "@mui/icons-material";
import { Box, Grid2, IconButton } from "@mui/material";
import { mergeSx } from "@/utils";

type MuiGrid2Props = Omit<Grid2Props, "container" | "ref">;
type GridItemCoreProps = Omit<Grid2Props, "container">;

const GridItemCore = ({
  children,
  ...gridProps
}: PropsWithChildren<GridItemCoreProps>) => {
  return (
    <Grid2 container={false} {...gridProps}>
      {children}
    </Grid2>
  );
};

const GridItemDrag = ({
  children,
  sx,
  ...gridProps
}: PropsWithChildren<MuiGrid2Props>) => {
  const { isHovered, ref } = useHover<HTMLDivElement>();
  const { listeners, setNodeRef } = useSortable({ id: 1 });
  const combinedRef = useCombinedRefs<HTMLDivElement>(ref, setNodeRef);

  return (
    <GridItemCore
      sx={mergeSx({ position: "relative" }, sx)}
      ref={combinedRef}
      {...gridProps}
    >
      {isHovered ? (
        <Box
          sx={{
            backgroundColor: "background.paper",
            inset: "0 0 auto",
            position: "absolute",
            zIndex: 10,
          }}
        >
          {/* TODO: add resize button */}
          <IconButton {...listeners}>
            <DragHandle />
          </IconButton>
        </Box>
      ) : null}

      {children}
    </GridItemCore>
  );
};

const GridItemEdit = ({
  children,
  sx,
  ...gridProps
}: PropsWithChildren<MuiGrid2Props>) => {
  const { isHovered, ref } = useHover<HTMLDivElement>();

  return (
    <GridItemCore
      ref={ref}
      sx={mergeSx({ position: "relative" }, sx)}
      {...gridProps}
    >
      {isHovered ? (
        <Box
          sx={{
            backgroundColor: "background.paper",
            inset: "0 0 auto",
            position: "absolute",
            zIndex: 10,
          }}
        >
          <IconButton>
            <Edit />
          </IconButton>
        </Box>
      ) : null}

      {children}
    </GridItemCore>
  );
};

type DraggableGridItemProps = PropsWithChildren<MuiGrid2Props>;

export { GridItemDrag, GridItemEdit };
export type { DraggableGridItemProps };
