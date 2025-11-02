import { MuiFB } from "@/builder";
import type { RadioFormValue } from "./type";
import { useRadioForm } from "./hook";
import { withSubmit } from "../../submit/submit";
import { onSubmitFn } from "../../submit/type";

const Radio = ({ onSubmit }: { onSubmit: onSubmitFn }) => {
  const { fieldInputs, gridItemInputs, propsInputs } = useRadioForm();

  return (
    <MuiFB.Builder<RadioFormValue>
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

        onSubmit({
          type: "radio",
          name: "new-field",
          ...data,
        });
      }}
      options={{
        defaultValues: {
          gridProps: {
            is_offset_responsive: false,
            is_size_responsive: false,
          },
          props: {
            formControlLabelProps: {
              disableTypography: false,
            },
            options: [],
            radioProps: {
              disableRipple: false,
            },
          },
        },
      }}
    />
  );
};
const RadioForm = withSubmit(Radio);

export { RadioForm };
