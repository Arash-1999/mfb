import { FormField } from "./field";
import { GridContainer, GridItem } from "./grid";

const getLayout = () => {
    return {
      "grid-container": GridContainer,
      "grid-item": GridItem,
      field: FormField,
    };
  };

  export { getLayout };