"use client";
import type { RadioForm } from "@/builder/components/input/radio/type";

import { MuiFB } from "@/builder";
import { useRadioForm } from "@/builder/components/input/radio";
import { DndContext } from "@dnd-kit/core";

const Page = () => {
  const { fieldInputs, gridItemInputs, propsInputs } = useRadioForm();
  return (
    <div>
      <DndContext onDragEnd={console.log}>
      <MuiFB.Builder<RadioForm>
        cards={[
          {
            inputs: [
              {
                gridContainerProps: {
                  spacing: 1,
                },
                list: propsInputs,
                name: "props",
                title: "Input",
              },
              {
                gridContainerProps: {
                  spacing: 1,
                },
                list: gridItemInputs,
                name: "gridProps",
                title: "Grid Item",
              },
              {
                gridContainerProps: {
                  spacing: 1,
                },
                list: fieldInputs,
                name: "field",
                title: "Field",
              },
            ],
            isGroup: true,
            type: "sidebar-stepper",
            variant: "normal",
          },
        ]}
        gridContainerProps={{ enabled: false }}
        id="form-1025"
        onSubmit={console.log}
      />
      </DndContext>
    </div>
  );
};

export default Page;
