import { MuiFB } from "@/builder";
import { useAccordionForm } from "./hook";
import { AccordionOptionsForm } from "./type";
import { withSubmit } from "@/builder/components/submit/submit";
import { onSubmitFn } from "@/builder/components/submit/type";

const Accordion = ({ onSubmit }: { onSubmit: onSubmitFn }) => {
  const { fieldInputs, gridItemInputs, propsInputs } = useAccordionForm();

  return (
    <>
      <MuiFB.Builder<AccordionOptionsForm>
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
            type: "accordion",
            name: "new-field",
            header: "First Card (asghar)",
            ...data,
          });
        }}
      />
    </>
  );
};
const AccordionForm = withSubmit(Accordion);

export { AccordionForm };
