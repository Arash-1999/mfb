import TextFieldInput from "./text-field";
import SelectInput from "./select";

const getInput = () => {
  return { 
    select: SelectInput,
    text: TextFieldInput,
   };
};

export { getInput };
