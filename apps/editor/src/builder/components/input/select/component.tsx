import { MuiFB } from "@/builder";
import type { SelectOptionsForm } from "./type";
import { useSelectForm } from "./hook";
import { withSubmit } from "../../submit/submit";
import { onSubmitFn } from "../../submit/type";

const Select = ({ onSubmit }: { onSubmit: onSubmitFn }) => {
  const { fieldInputs, gridItemInputs, propsInputs } = useSelectForm();

  return (
    <MuiFB.Builder<SelectOptionsForm>
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
          type: "select",
          name: "select",
          variant: "input",
          ...data,
        });
      }}
      options={{
        defaultValues: {
          props: {
            formControlProps: {
              color: "primary",
              fullWidth: true,
              hiddenLabel: true,
              margin: "normal",
              size: "medium",
            },
            inputLabelProps: {
              color: "primary",
              disableAnimation: true,
              size: "medium",
              variant: "filled",
            },
            label: "test",
            options: [{ label: "", value: "" }],
            selectProps: {
              autoWidth: true,
              defaultOpen: true,
              multiple: true,
              native: true,
              variant: "filled",
            },
          },
        },
      }}
    />
  );
};
const SelectForm = withSubmit(Select);

export { SelectForm };
