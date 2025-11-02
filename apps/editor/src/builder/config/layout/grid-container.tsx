import type { Grid2Props } from "@mui/material";
import type { PropsWithChildren } from "react";

import { useHover } from "@/hooks";
import { editorLayoutAtom, formAtom } from "@/store/atoms";
import { SortableContext } from "@dnd-kit/sortable";
import { Add, DragHandle } from "@mui/icons-material";
import { Box, Button, Grid2, IconButton } from "@mui/material";
import { useAtom, useSetAtom } from "jotai";
import { ChildrenPathResult, useMfbItemContext } from "@mfb/core";
import { CurrentPathValue } from "@/store/atoms/layout";
import { resetSidebarStateAtom } from "@/store/atoms/sidebar";

interface GridProps extends Grid2Props {
  enabled?: boolean;
}
type MuiGrid2Props = Omit<GridProps, "container" | "ref">;

const DraggableGridContainer = ({
  children,
  enabled = true,
  ...gridProps
}: PropsWithChildren<MuiGrid2Props>) => {
  const { isHovered, ref } = useHover<HTMLDivElement>({ enabled });
  const setAtom = useSetAtom(editorLayoutAtom);
  const context = useMfbItemContext();
  const [, resetSidebarState] = useAtom(resetSidebarStateAtom);
  const [formAtomValue, setFormAtom] = useAtom(formAtom);

  const setEditorLayoutAtom = useSetAtom(editorLayoutAtom);
  const addItem = () => {
    console.log(context);
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
      ref={ref}
      sx={{ position: "relative", p: 3 }}
      {...gridProps}>
      <SortableContext items={[]}>
        {children}
        <Grid2 size={12}>
          <IconButton onClick={addItem}>+</IconButton>
        </Grid2>
      </SortableContext>
    </Grid2>
  );
};

type DraggableGridContainerProps = PropsWithChildren<MuiGrid2Props>;

export { DraggableGridContainer };
export type { DraggableGridContainerProps };
