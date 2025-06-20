import { CssBaseline } from "@mui/material";

import type { RadioForm } from "./builder/components/input/radio/type";
import type { TestForm } from "./builder/components/input/text-field/type";

import { MuiFB } from "./builder";
import { useRadioForm } from "./builder/components/input/radio";
import { useTextFieldForm } from "./builder/components/input/text-field";
import { Layout } from "./components/layout";

const Test_2 = () => {
  const { fieldInputs, gridItemInputs, propsInputs } = useRadioForm();

  return (
    <MuiFB.Builder<RadioForm>
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
      }}
      options={{
        defaultValues: {
          gridProps: {
            is_offset_responsive: false,
            is_size_responsive: false,
          },
          props: {
            formControlLabelProps: {
              disableTypography: false,
            },
            options: [],
            radioProps: {
              disableRipple: false,
            },
          },
        },
      }}
    />
  );
};
const Test = () => {
  const { fieldInputs, gridItemInputs, propsInputs } = useTextFieldForm();

  return (
    <MuiFB.Builder<TestForm>
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
      }}
      options={{
        defaultValues: {
          gridProps: {
            is_offset_responsive: false,
            is_size_responsive: false,
          },
          props: {
            textFieldProps: {
              fullWidth: true,
              multiline: false,
            },
          },
        },
      }}
    />
  );
};

const App = () => {
  // const [form, setForm] = useAtom(formAtom);

  return (
    <>
      <CssBaseline />
      <Layout title="MFB Editor">
        <p>something special</p>
        {/* <MuiFB.BasicBuilder */}
        {/*   gridContainerProps={{ */}
        {/*     padding: 2, */}
        {/*     spacing: 2, */}
        {/*   }} */}
        {/*   id="form-2" */}
        {/*   inputs={Object.values(textFieldOptions)} */}
        {/*   onSubmit={(data) => { */}
        {/*     setForm((form) => ({ */}
        {/*       list: [ */}
        {/*         ...form.list, */}
        {/*         { */}
        {/*           name: `input-${Math.floor(Math.random() * 100)}`, */}
        {/*           props: { */}
        {/*             textFieldProps: { */}
        {/*               ...data.props, */}
        {/*               // fullWidth: data.fullWidth, */}
        {/*               // helperText: data.helperText, */}
        {/*               // id: data.id, */}
        {/*               // label: data.label, */}
        {/*               // margin: data.margin, */}
        {/*               // maxRows: data.maxRows, */}
        {/*               // minRows: data.minRows, */}
        {/*               // multiline: data.multiline, */}
        {/*               // placeholder: data.placeholder, */}
        {/*               // rows: data.rows, */}
        {/*               // size: data.size, */}
        {/*               // variant: data.variant, */}
        {/*             }, */}
        {/*           }, */}
        {/*           type: "text", */}
        {/*         }, */}
        {/*       ], */}
        {/*       type: form.type, */}
        {/*     })); */}
        {/*   }} */}
        {/* /> */}
        {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
        {/* <MuiFB.BasicBuilder */}
        {/*   gridContainerProps={{ */}
        {/*     padding: 2, */}
        {/*     spacing: 2, */}
        {/*   }} */}
        {/*   id="form-2" */}
        {/*   inputs={form.list} */}
        {/*   onSubmit={console.log} */}
        {/* /> */}
        <Test />
        <Test_2 />
      </Layout>
    </>
  );
};

export default App;
