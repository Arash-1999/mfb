"use client";
import { EditableMuiFB, MuiFB } from "@/builder";
import { DndProvider } from "@/builder/config/draggable/dnd-context";
import { DndKitProvider } from "@/builder/config/draggable/dnd-provider";
import { editorLayoutAtom, formAtom } from "@/store/atoms";
import { resetSidebarStateAtom } from "@/store/atoms/sidebar";
import { BUILDER_MODE, BuilderMode } from "@/types/builder";
import { useAtom, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Mode = ({ mode }: { mode: "advanced" | "basic" | "normal" }) => {
  const [formAtomValue, setFormAtom] = useAtom(formAtom);
  const [, resetSidebarState] = useAtom(resetSidebarStateAtom);

  const setEditorLayoutAtom = useSetAtom(editorLayoutAtom);
  const router = useRouter();
  const [client, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);
  const getCategoriesByMode = (mode: BuilderMode) => {
    switch (mode) {
      case BUILDER_MODE.ADVANCED: {
        return {
          type: mode,
          list: [],
        };
      }
      case BUILDER_MODE.BASIC: {
        return {
          type: mode,
          inputs: [],
        };
      }
      case BUILDER_MODE.NORMAL: {
        return {
          type: mode,
          cards: [],
        };
      }
    }
  };

  useEffect(() => {
    setFormAtom(() => getCategoriesByMode(mode));
    setEditorLayoutAtom({
      currentPath: null,
      sidebarOpen: true,
    });
  }, [mode]);

  const handleBack = () => {
    router.back();
    setEditorLayoutAtom({
      currentPath: null,
      sidebarOpen: false,
    });
    resetSidebarState();
  };
  const getItemPaths = (items: any[], basePath: string = ""): string[] => {
    const paths: string[] = [];

    const traverse = (node: any, path: string) => {
      // Add current node's path
      if (path) {
        paths.push(path);
      }

      // If node has a list, traverse children
      if (node.list && Array.isArray(node.list)) {
        node.list.forEach((child: any, index: number) => {
          const childPath = path ? `${path}.list.${index}` : `list.${index}`;
          traverse(child, childPath);
        });
      }
    };

    // Start traversal from root items
    items.forEach((item, index) => {
      const itemPath = basePath ? `${basePath}.${index}` : `${index}`;
      traverse(item, itemPath);
    });

    return paths;
  };

  // Get item paths - handle both root level and nested items
  const itemPaths = React.useMemo(() => {
    if (!formAtomValue || !("list" in formAtomValue) || !formAtomValue.list) {
      return [];
    }
    return getItemPaths(formAtomValue.list);
  }, [formAtomValue]);
  console.log("Form Atom:", formAtomValue);
  console.log("Item Paths:", itemPaths); // Add this to debug
  const myAtom = useAtom(formAtom);
  return (
    <DndProvider>
      <DndKitProvider items={itemPaths}>
        {client && <button onClick={handleBack}>back</button>}
        {/* <pre>{JSON.stringify(myAtom, null, 2)}</pre> */}
        {BUILDER_MODE.BASIC === mode &&
          myAtom?.[0] &&
          "inputs" in myAtom[0] && (
            <EditableMuiFB.BasicBuilder<any>
              id="TEST_PAGE_FORM_ID"
              gridContainerProps={{
                spacing: 2,
                mt: 8,
                p: 2,
              }}
              inputs={myAtom?.[0]?.inputs}
              onSubmit={(data) => {
                // console.log(data);
              }}
            />
          )}

        {BUILDER_MODE.NORMAL === mode &&
          myAtom?.[0] &&
          "cards" in myAtom[0] && (
            <EditableMuiFB.Builder<any>
              gridContainerProps={{
                spacing: 2,
                mt: 8,
                p: 2,
              }}
              cards={myAtom[0].cards}
              onSubmit={(data) => {
                console.log(data);
              }}
            />
          )}
        {BUILDER_MODE.ADVANCED === mode &&
          myAtom?.[0] &&
          "list" in myAtom[0] && (
            <EditableMuiFB.AdvancedBuilder<any>
              gridContainerProps={{
                spacing: 2,
                mt: 8,
                p: 2,
              }}
              list={myAtom[0].list}
              onSubmit={(data) => {
                // console.log(data);
              }}
            />
          )}
      </DndKitProvider>
    </DndProvider>
  );
};
export { Mode };
