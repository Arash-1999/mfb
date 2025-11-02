import { MuiFB } from "@/builder";

import type { SwitchOptionsForm } from "./type";
import { useSwitchForm } from "./hook";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { addItemToFormAtom, editorLayoutAtom, formAtom } from "@/store/atoms";
import { useMfbItemContext } from "@mfb/core";
import { withSubmit } from "../../submit/submit";
import { onSubmitFn } from "../../submit/type";

const Switch = ({ onSubmit }: { onSubmit: onSubmitFn }) => {
  const { fieldInputs, gridItemInputs, propsInputs } = useSwitchForm();
  const [formAtomValue, setFormAtom] = useAtom(formAtom);
  const setEditorLayoutAtom = useSetAtom(editorLayoutAtom);
  const context = useMfbItemContext();
  const { currentPath } = useAtomValue(editorLayoutAtom);

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
        onSubmit({
          type: "switch",
          name: "new-field",
          ...data,
        });
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
const SwitchForm = withSubmit(Switch);
export { SwitchForm };
