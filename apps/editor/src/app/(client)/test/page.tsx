"use client";
import type { RadioForm } from "@/builder/components/input/radio/type";

import { useRadioForm } from "@/builder/components/input/radio";
import { MuiFB } from "@/builder";

const Page = () => {
  const { fieldInputs, gridItemInputs, propsInputs } = useRadioForm();
  return (
    <div>
      <MuiFB.Builder<RadioForm>
        gridContainerProps={{ enabled: false }}
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
        id="form-1025"
        onSubmit={console.log}
      />
    </div>
  );
};

export default Page;
