import type { FieldOptionsForm, GridItemOptionsForm } from "../../../layout";

interface AccordionOptions {
  defaultExpanded: boolean;
  disableGutters: boolean;
  square: boolean;
}

interface AccordionOptionsForm extends FieldOptionsForm, GridItemOptionsForm {
  props: AccordionOptions;
}
export type { AccordionOptions, AccordionOptionsForm };
