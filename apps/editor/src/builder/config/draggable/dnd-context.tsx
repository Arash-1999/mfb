// contexts/DndContext.tsx
import React, { createContext, useContext, ReactNode } from "react";
import { useAtom } from "jotai";
import { formAtom } from "@/store/atoms";
import { useMfbItemContext } from "@mfb/core";
import get from "@/helper/get";
import { arrayMove } from "@dnd-kit/sortable";
import { set } from "react-hook-form";
import { arePathsSiblings, getLastIndexFromPath } from "@/helper/sibiling-path";
import moveToPath from "@/helper/moveToPath";
export const getParentPath = (path: string) =>
  path.split(".").slice(0, -1).join(".");

interface DndContextType {
  onDragStart: (path: string) => void;
  onDragEnd: (sourcePath: string, targetPath: string) => void;
  onDrop: (sourcePath: string, targetPath: string) => void;
}
const DndContext = createContext<DndContextType | undefined>(undefined);
export default function getArrayFromPath(
  obj: any,
  path: string,
  defaultValue?: any
) {
  return (
    path
      .split(".")
      .reduce(
        (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
        obj
      ) ?? defaultValue
  );
}
export const useDndContext = () => {
  const context = useContext(DndContext);
  if (!context) {
    throw new Error("useDndContext must be used within a DndProvider");
  }
  return context;
};

interface DndProviderProps {
  children: ReactNode;
}

export const DndProvider: React.FC<DndProviderProps> = ({ children }) => {
  const [formAtomValue, setFormAtom] = useAtom(formAtom);
  const context = useMfbItemContext();

  const handleDragStart = (path: string) => {
    console.log(path);
  };

  const handleDragEnd = (sourcePath: string, targetPath: string) => {
    console.log("Drag ended - Source:", sourcePath, "Target:", targetPath);
  };

  const handleDrop = (sourcePath: string, targetPath: string) => {
    console.log("Drop - Source:", sourcePath, "Target:", targetPath);
    const sourceParent = getParentPath(sourcePath);
    const targetParent = getParentPath(`${targetPath}.list.0`);
    const invalidDrop = targetPath.includes("-1");
    const isSiblings = arePathsSiblings(sourceParent, targetParent);

    setFormAtom((prev) => {
      if (!(prev && "list" in prev)) return prev;
      const updatedList = structuredClone(prev.list);
      // if (isSiblings) {
      //   console.log("isSibling", targetPath);
      //   const lastIndexSourcePath = getLastIndexFromPath(sourcePath);
      //   const lastIndexTargetPath = getLastIndexFromPath(targetPath);
      //   const parentArray = get({ ...formAtomValue?.list }, sourceParent);
      //   const sort = arrayMove(
      //     parentArray,
      //     Number(lastIndexSourcePath),
      //     Number(lastIndexTargetPath)
      //   );
      //   set(updatedList, targetParent, sort);
      // } else {
      console.log("notSibling");
      !invalidDrop &&
        targetPath !== sourcePath &&
        moveToPath(updatedList, sourcePath, `${targetPath}.${"list"}.0` || "");
      // }
      return {
        ...prev,
        list: updatedList ?? [],
      };
    });
  };

  return (
    <DndContext.Provider
      value={{
        onDragStart: handleDragStart,
        onDragEnd: handleDragEnd,
        onDrop: handleDrop,
      }}>
      {children}
    </DndContext.Provider>
  );
};
