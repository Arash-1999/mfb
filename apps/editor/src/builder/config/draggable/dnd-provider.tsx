import React from "react";
import {
  DndContext,
  rectIntersection,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useDndContext } from "./dnd-context";

interface DndKitProviderProps {
  children: React.ReactNode;
  items: string[];
}

export const DndKitProvider: React.FC<DndKitProviderProps> = ({
  children,
  items,
}) => {
  const { onDragStart, onDragEnd, onDrop } = useDndContext();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const path = active.id as string;
    onDragStart(path);
  };

  const handleDragOver = (event: DragOverEvent) => {};

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      onDragEnd(active.id as string, active.id as string);
      return;
    }
    const sourcePath = active.id as string;
    const targetPath = over.id as string;

    onDrop(sourcePath, targetPath);
    onDragEnd(sourcePath, targetPath);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}>
      <SortableContext
        items={items.map((i) => i.path)}
        strategy={rectSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
};
