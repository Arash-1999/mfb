import { MuiFB } from "@/builder";

import type { CheckboxOptionsForm } from "./type";

import { useCheckboxForm } from "./hook";

const CheckboxForm = () => {
  const { fieldInputs, gridItemInputs, propsInputs } = useCheckboxForm();

  return (
    <MuiFB.Builder<CheckboxOptionsForm>
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
      id="form-2"
      onSubmit={(data) => {
        console.log(data);
      }}
      options={{
        defaultValues: {
          props: {
            color: "primary",
            disableRipple: false,
            size: "medium",
          },
        },
      }}
    />
  );
};

export { CheckboxForm };
