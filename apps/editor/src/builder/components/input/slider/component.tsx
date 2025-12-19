import { MuiFB } from "@/builder";
import type { SliderOptionsForm } from "./type";
import { useSliderForm } from "./hook";
import { withSubmit } from "../../submit/submit";
import { onSubmitFn } from "../../submit/type";

const Slider = ({ onSubmit }: { onSubmit: onSubmitFn }) => {
  const { fieldInputs, gridItemInputs, propsInputs } = useSliderForm();

  return (
    <MuiFB.Builder<SliderOptionsForm>
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
          type: "slider",
          name: "slider",
          variant: "input",
          ...data,
        });
      }}
      options={{
        defaultValues: {
          props: {
            sliderProps: {
              color: "primary",
              disableSwap: false,
              max: 2,
              min: 1,
              orientation: "horizontal",
              shiftStep: 1,
              size: "medium",
              step: 1,
              track: "inverted",
              valueLabelDisplay: "auto",
              valueLabelFormat: "test",
            },
          },
        },
      }}
    />
  );
};
const SliderForm = withSubmit(Slider);
export { SliderForm };
