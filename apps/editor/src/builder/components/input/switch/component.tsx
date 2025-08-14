import { MuiFB } from "@/builder";

import type { SwitchOptionsForm } from "./type";
import { useSwitchForm } from "./hook";

const SwitchForm = () => {
  const { fieldInputs, gridItemInputs, propsInputs } = useSwitchForm();

  return (
    <MuiFB.Builder<SwitchOptionsForm>
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
            formControlLabelProps: {
              disableTypography: false,
              labelPlacement: "bottom",
            },
            label: "test",
            switchProps: {
              color: "primary",
              disableRipple: false,
              edge: "start",
              size: "medium",
            },
          },
        },
      }}
    />
  );
};

export { SwitchForm };
