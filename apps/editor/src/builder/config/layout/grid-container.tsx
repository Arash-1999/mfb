import React, { PropsWithChildren } from "react";
import { useHover } from "@/hooks";
import { editorLayoutAtom, formAtom } from "@/store/atoms";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { Add } from "@mui/icons-material";
import { Grid2, Grid2Props, IconButton } from "@mui/material";
import { useAtom, useSetAtom } from "jotai";
import { useMfbItemContext } from "@mfb/core";
import { resetSidebarStateAtom } from "@/store/atoms/sidebar";
import { useDroppable } from "@dnd-kit/core";
import { useCombinedRefs } from "@dnd-kit/utilities";

interface GridProps extends Grid2Props {
  enabled?: boolean;
  items?: string[];
}
type MuiGrid2Props = Omit<GridProps, "container" | "ref">;

const DraggableGridContainer = ({
  children,
  enabled = true,
  items = [],
  ...gridProps
}: PropsWithChildren<MuiGrid2Props>) => {
  const { ref } = useHover<HTMLDivElement>({ enabled });
  const setAtom = useSetAtom(editorLayoutAtom);
  const context = useMfbItemContext();
  const [, resetSidebarState] = useAtom(resetSidebarStateAtom);
  const [, setFormAtom] = useAtom(formAtom);
  const setEditorLayoutAtom = useSetAtom(editorLayoutAtom);
  const path =
    (context &&
      typeof context === "object" &&
      `${context.path}.${(context.childrenPath && "path" in context.childrenPath && context.childrenPath.path) || ""}`) ||
    null;
  const { node, isOver, setNodeRef } = useDroppable({
    id:
      context.path ??
      context.childrenPath?.path ??
      `droppable-${Math.random()}`,
  });
  console.log("traget", context.path);
  const combinedRef = useCombinedRefs<HTMLDivElement>(ref, setNodeRef);

  const addItem = () => {
    resetSidebarState();
    setFormAtom((perv) => {
      return perv;
    });
    setEditorLayoutAtom((prev) => {
      return {
        currentPath: null,
        sidebarOpen: true,
      };
    });
    setAtom((atom) => ({
      ...atom,
      sidebarOpen: true,
      currentPath: context,
    }));
  };

  return (
    <Grid2
      container
      ref={combinedRef}
      sx={{
        position: "relative",
        p: 3,
        border: isOver ? "2px dashed blue" : "2px solid transparent",
        backgroundColor: isOver ? "action.hover" : "transparent",
        transition: "all 0.2s ease",
      }}
      {...gridProps}>
      <SortableContext
        items={items.map((i) => i.path)}
        strategy={rectSortingStrategy}>
        {children}
        <Grid2 size={12}>
          <IconButton onClick={addItem}>
            <Add />
          </IconButton>
        </Grid2>
      </SortableContext>
    </Grid2>
  );
};

export { DraggableGridContainer };

type DraggableGridContainerProps = PropsWithChildren<MuiGrid2Props>;

export type { DraggableGridContainerProps };
