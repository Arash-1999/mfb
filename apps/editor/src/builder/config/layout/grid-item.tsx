import React, { PropsWithChildren } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useHover } from "@/hooks";
import { useCombinedRefs } from "@dnd-kit/utilities";
import { DragHandle, Edit, Delete, Replay } from "@mui/icons-material";
import { Box, Grid2, Grid2Props, IconButton, Collapse } from "@mui/material";
import { mergeSx } from "@/utils";
import { useAtom, useSetAtom } from "jotai";
import { editorLayoutAtom, formAtom } from "@/store/atoms";
import { useMfbItemContext } from "@mfb/core";
import {
  resetSidebarStateAtom,
  sidebarFormKeyAtom,
  sidebarTabKeyAtom,
} from "@/store/atoms/sidebar";
import { formModeAtom } from "@/store/atoms/form";
import { get } from "@/store/atoms/setNestedField";
import removeAtPath from "@/helper/removeAtPath";
import { getParentPath } from "../draggable/dnd-context";

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

const GridItemEdit = ({
  children,
  sx,
  ...gridProps
}: PropsWithChildren<MuiGrid2Props>) => {
  const { isHovered, ref } = useHover<HTMLDivElement>();
  const context = useMfbItemContext();

  const { attributes, listeners, setNodeRef, isDragging, setActivatorNodeRef } =
    useSortable({
      id: context.path || "unknown",
      data: {
        parent: getParentPath(context.path),
      },
    });

  const combinedRef = useCombinedRefs<HTMLDivElement>(ref, setNodeRef);

  const [formAtomValue, setFormAtom] = useAtom(formAtom);
  const setEditorLayoutAtom = useSetAtom(editorLayoutAtom);
  const [, resetSidebarState] = useAtom(resetSidebarStateAtom);
  const [, setMode] = useAtom(formModeAtom);
  const [, setTabKey] = useAtom(sidebarTabKeyAtom);
  const [, setFormKey] = useAtom(sidebarFormKeyAtom);
  const setAtom = useSetAtom(editorLayoutAtom);

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (isHovered || isDragging) setOpen(true);
    else setOpen(false);
  }, [isHovered, isDragging]);

  const handleEdit = () => {
    const updatedList =
      formAtomValue &&
      "list" in formAtomValue &&
      structuredClone(formAtomValue?.list);

    type EditPart = { variant?: string; type?: string };
    const editPart = get(updatedList || {}, context.path || "", {});

    setFormKey(editPart?.type);
    setEditorLayoutAtom(() => ({
      currentPath: null,
      sidebarOpen: true,
    }));

    setAtom((atom) => ({
      ...atom,
      sidebarOpen: true,
      currentPath: context,
    }));
  };

  const handleReplace = () => {
    resetSidebarState();
    setMode("edit");
    setFormAtom((prev) => prev);
    setEditorLayoutAtom(() => ({
      currentPath: null,
      sidebarOpen: true,
    }));

    setAtom((atom) => ({
      ...atom,
      sidebarOpen: true,
      currentPath: context,
    }));
  };

  const handleDelete = () => {
    setFormAtom((prev) => {
      if (!(prev && "list" in prev)) return prev;
      const updatedList = structuredClone(prev.list);
      removeAtPath(updatedList, context.path || "");
      return {
        ...prev,
        list: updatedList ?? [],
      };
    });
  };

  return (
    <GridItemCore
      ref={combinedRef}
      sx={mergeSx(
        {
          position: "relative",
          cursor: isDragging ? "grabbing" : "grab",
          minHeight: "50px",
        },
        sx
      )}
      {...attributes}
      {...gridProps}>
      <Collapse
        in={open}
        timeout={200}
        unmountOnExit
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 20,
          width: "auto",
        }}>
        <Box
          sx={{
            backgroundColor: "background.paper",
            boxShadow: 3,
            borderRadius: 1,
            p: 0.5,
            display: "flex",
            flexDirection: "column",
          }}>
          <IconButton onClick={handleEdit}>
            <Edit />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <Delete />
          </IconButton>
          <IconButton onClick={handleReplace}>
            <Replay />
          </IconButton>
          <IconButton
            {...listeners}
            {...attributes}
            ref={setActivatorNodeRef}
            sx={{ cursor: isDragging ? "grabbing" : "grab" }}>
            <DragHandle />
          </IconButton>
        </Box>
      </Collapse>

      {children}
    </GridItemCore>
  );
};

export { GridItemEdit };

type DraggableGridItemProps = PropsWithChildren<MuiGrid2Props>;
export type { DraggableGridItemProps };
