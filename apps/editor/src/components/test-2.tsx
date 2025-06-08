import { GetInputsImpl } from "@mfb/core";
import { MuiConfig, MuiFB } from ".";

interface TextFieldOptions {
  color: string;
  fullWidth: boolean;
  helperText: string;
  id: string;
  label: string;
  margin: "dense" | "none" | "normal";
  maxRows: number | string;
  minRows: number | string;
  multiline: boolean;
  placeholder: string;
  rows: number | string;
  size: string; // 'medium' | 'small'
  variant: "filled" | "outlined" | "standard";
}

const options: Record<
  keyof TextFieldOptions,
  GetInputsImpl<MuiConfig, TextFieldOptions>
> = {
  color: {
    gridProps: { size: 6 },
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
  fullWidth: {
    gridProps: { size: 6 },
    name: "fullWidth",
    props: {
      defaultValue: true,
      label: "Full width",
    },
    type: "checkbox",
  },
  helperText: {
    gridProps: { size: 6 },
    name: "helperText",
    props: {
      textFieldProps: {
        fullWidth: true,
        label: "Helper text",
        placeholder: "Helper text",
        size: "small",
      },
    },
    type: "text",
  },
  id: {
    gridProps: { size: 6 },
    name: "id",
    props: {
      textFieldProps: {
        fullWidth: true,
        label: "Id",
        placeholder: "Id",
        size: "small",
      },
    },
    type: "text",
  },
  label: {
    gridProps: { size: 6 },
    name: "label",
    props: {
      textFieldProps: {
        fullWidth: true,
        label: "Label",
        placeholder: "Label",
        size: "small",
      },
    },
    type: "text",
  },
  margin: {
    gridProps: { size: 6 },
    name: "margin",
    props: {
      textFieldProps: {
        fullWidth: true,
        label: "Margin",
        placeholder: "Margin",
        size: "small",
      },
    },
    type: "text",
  },
  maxRows: {
    gridProps: { size: 6 },
    name: "maxRows",
    props: {
      textFieldProps: {
        fullWidth: true,
        label: "Max rows",
        placeholder: "Max rows",
        size: "small",
      },
    },
    type: "text",
  },
  minRows: {
    gridProps: { size: 6 },
    name: "minRows",
    props: {
      textFieldProps: {
        fullWidth: true,
        label: "Min rows",
        placeholder: "Min rows",
        size: "small",
      },
    },
    type: "text",
  },
  multiline: {
    gridProps: { size: 6 },
    name: "multiline",
    props: {
      textFieldProps: {
        fullWidth: true,
        label: "Multi-line",
        placeholder: "Multi-line",
        size: "small",
      },
    },
    type: "text",
  },
  placeholder: {
    gridProps: { size: 6 },
    name: "placeholder",
    props: {
      textFieldProps: {
        fullWidth: true,
        label: "Placeholder",
        placeholder: "Placeholder",
        size: "small",
      },
    },
    type: "text",
  },
  rows: {
    gridProps: { size: 6 },
    name: "rows",
    props: {
      textFieldProps: {
        fullWidth: true,
        label: "Rows",
        placeholder: "Rows",
        size: "small",
      },
    },
    type: "text",
  },
  size: {
    gridProps: { size: 6 },
    name: "size",
    props: {
      defaultValue: "small",
      textFieldProps: {
        fullWidth: true,
        label: "Size",
        placeholder: "Size",
        size: "small",
      },
    },
    type: "text",
  },
  variant: {
    gridProps: { size: 12 },
    name: "variant",
    props: {
      defaultValue: "standard",
      options: ["filled", "outlined", "standard"],
      radioGroupProps: {
        row: true,
      },
    },
    type: "radio",
  },
};

const Test = () => {
  return (
    <div>
      <MuiFB.BasicBuilder
        gridContainerProps={{
          spacing: 2,
          padding: 2,
        }}
        id="form-2"
        inputs={Object.values(options)}
        onSubmit={console.log}
      />
    </div>
  );
};

export { Test as MuiPage2 };
