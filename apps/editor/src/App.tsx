import { CssBaseline } from "@mui/material";
import { useAtom } from "jotai";

import { MuiFB } from "./builder";
import {
  type FieldOptionsForm,
  type GridItemOptionsForm,
  textFieldOptions,
  type TextFieldOptionsForm,
  useFieldOptions,
  useGridItemOptions,
} from "./builder/components";
import { Layout } from "./components/layout";
import { formAtom } from "./store";

interface TestForm
  extends FieldOptionsForm,
    GridItemOptionsForm,
    TextFieldOptionsForm {}

const Test = () => {
  const gridItemOptions = useGridItemOptions();
  const fieldOptions = useFieldOptions();

  return (
    <MuiFB.Builder<TestForm>
      cards={[
        {
          inputs: [
            {
              gridContainerProps: {
                spacing: 1,
              },
              list: Object.values(textFieldOptions),
              name: "props",
              title: "Input",
            },
            {
              gridContainerProps: {
                spacing: 1,
              },
              list: Object.values(gridItemOptions).flat(),
              name: "girdProps",
              title: "Grid Item",
            },
            {
              gridContainerProps: {
                spacing: 1,
              },
              list: Object.values(fieldOptions).flat(),
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
      onSubmit={console.log}
      options={{
        defaultValues: {
          gridProps: {
            is_offset_responsive: false,
            is_size_responsive: false,
            offset: "",
            size: "",
          },
        },
      }}
    />
  );
};

const App = () => {
  const [form, setForm] = useAtom(formAtom);

  return (
    <>
      <CssBaseline />
      <Layout title="MFB Editor">
        <p>something special</p>
        <MuiFB.BasicBuilder
          gridContainerProps={{
            padding: 2,
            spacing: 2,
          }}
          id="form-2"
          inputs={Object.values(textFieldOptions)}
          onSubmit={(data) => {
            setForm((form) => ({
              list: [
                ...form.list,
                {
                  name: `input-${Math.floor(Math.random() * 100)}`,
                  props: {
                    textFieldProps: {
                      ...data.props,
                      // fullWidth: data.fullWidth,
                      // helperText: data.helperText,
                      // id: data.id,
                      // label: data.label,
                      // margin: data.margin,
                      // maxRows: data.maxRows,
                      // minRows: data.minRows,
                      // multiline: data.multiline,
                      // placeholder: data.placeholder,
                      // rows: data.rows,
                      // size: data.size,
                      // variant: data.variant,
                    },
                  },
                  type: "text",
                },
              ],
              type: form.type,
            }));
          }}
        />
        {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
        <MuiFB.BasicBuilder
          gridContainerProps={{
            padding: 2,
            spacing: 2,
          }}
          id="form-2"
          inputs={form.list}
          onSubmit={console.log}
        />
        <Test />
      </Layout>
    </>
  );
};

export default App;
