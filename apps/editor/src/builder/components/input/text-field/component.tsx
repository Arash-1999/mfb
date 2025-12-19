import { MuiFB } from "@/builder";

import type { TextFieldForm } from "./type";
import { useTextFieldForm } from "./hook";
import { withSubmit } from "../../submit/submit";
import { onSubmitFn } from "../../submit/type";

const TextFields = ({ onSubmit }: { onSubmit: onSubmitFn }) => {
  const { fieldInputs, gridItemInputs, propsInputs } = useTextFieldForm();

  return (
    <MuiFB.Builder<TextFieldForm>
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
          type: "text",
          name: "text",
          variant: "input",
          ...data,
        });
      }}
      options={{
        defaultValues: {
          props: {
            textFieldProps: {
              color: "primary",
              fullWidth: true,
              helperText: "",
              id: "",
              label: "test",
              margin: "normal",
              maxRows: 4,
              minRows: 1,
              multiline: false,
              placeholder: "",
              rows: 1,
              size: "medium",
              variant: "filled",
            },
          },
        },
      }}
    />
  );
};
const TextFieldsForm = withSubmit(TextFields);

export { TextFieldsForm };
