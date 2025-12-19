import { MuiFB } from "@/builder";
import { useAccordionForm } from "./hook";
import { AccordionOptionsForm } from "./type";
import { withSubmit } from "@/builder/components/submit/submit";
import { onSubmitFn } from "@/builder/components/submit/type";
import { useAtom } from "jotai";
import { sidebarFormKeyAtom, sidebarTabKeyAtom } from "@/store/atoms/sidebar";

const AccordionGroup = ({ onSubmit }: { onSubmit: onSubmitFn }) => {
  const { fieldInputs, gridItemInputs, propsInputs } = useAccordionForm();
  const [tabKey, _] = useAtom(sidebarTabKeyAtom);

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
          onSubmit({
            type: "accordion-group",
            variant: tabKey === "normal-group-card" ? "normal" : "list",
            name: "accordion-group",
            header: "header",
            ...data,
          });
        }}
      />
    </>
  );
};
const AccordionGroupForm = withSubmit(AccordionGroup);

export { AccordionGroupForm };
