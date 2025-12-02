import { MuiFB } from "@/builder";

import type { RatingOptionsForm } from "./type";
import { useRatingOptionsForm } from "./hook";

const RatingForm = () => {
  const { fieldInputs, gridItemInputs, propsInputs } = useRatingOptionsForm();

  return (
    <MuiFB.Builder<RatingOptionsForm>
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
          gridProps: {
            is_offset_responsive: false,
            is_size_responsive: false,
          },
          props: {
            ratingProps: {
              highlightSelectedOnly: false,
              max: 1,
              precision: 1,
              readOnly: false,
              size: "medium",
            },
          },
        },
      }}
    />
  );
};

export { RatingForm };
