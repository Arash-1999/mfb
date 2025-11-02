import { MuiFB } from "@/builder";
import { usePaperForm } from "./hook";
import { PaperOptionsForm } from "./type";
import { withSubmit } from "@/builder/components/submit/submit";
import { onSubmitFn } from "@/builder/components/submit/type";

const Paper = ({ onSubmit }: { onSubmit: onSubmitFn }) => {
  const { fieldInputs, gridItemInputs, propsInputs } = usePaperForm();

  return (
    <>
      <MuiFB.Builder<PaperOptionsForm>
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
            type: "paper",
            name: "",
            header: "",
            ...data,
          });
        }}
      />
    </>
  );
};

const PaperForm = withSubmit(Paper);
export { PaperForm };
