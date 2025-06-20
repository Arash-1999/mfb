import type { MuiConfig } from "@/builder";
import type { GetInputs } from "@mfb/core";

import { FieldOptionsForm } from "./type";

const useFieldOptions = <TForm extends FieldOptionsForm>(): GetInputs<
  MuiConfig,
  TForm
>[] => {
  return [
    {
      gridProps: { size: 12 },
      name: "color",
      props: {
        textFieldProps: {
          fullWidth: true,
          label: "Color",
          placeholder: "Color",
          size: "small",
        },
      },
      type: "text",
    },
    {
      gridProps: { size: 12 },
      name: "fullWidth",
      props: {
        defaultValue: true,
        label: "Full width",
      },
      type: "checkbox",
    },
    {
      gridProps: { size: 12 },
      name: "hiddenLabel",
      props: {
        label: "Hidden Label",
      },
      type: "checkbox",
    },
    {
      gridProps: { size: 12 },
      name: "margin",
      props: {
        defaultValue: "none",
        options: ["dense", "none", " normal"],
      },
      type: "radio",
    },
    {
      gridProps: { size: 12 },
      name: "size",
      props: {
        defaultValue: "small",
        options: ["medium", "small"],
      },
      type: "radio",
    },
    {
      gridProps: { size: 12 },
      name: "variant",
      props: {
        defaultValue: "standard",
        options: ["filled", "outlined", "standard"],
      },
      type: "radio",
    },
  ];
};

export { useFieldOptions };
