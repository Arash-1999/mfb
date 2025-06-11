import { CssBaseline } from "@mui/material";
import { MuiFB } from "./builder";
import { textFieldOptions } from "./builder/components/text-field";
import { useGridContainerOptions } from "./builder/components/grid-container";

const Test = () => {
  const gridContainerOptions = useGridContainerOptions();

  return (
    <MuiFB.BasicBuilder
      gridContainerProps={{
        spacing: 2,
        padding: 2,
      }}
      id="form-2"
      inputs={Object.values(gridContainerOptions).flat()}
      options={{
        defaultValues: {
          is_columns_responsive: false,
          is_spacing_responsive: false,
          columns: "",
          spacing: "",
        },
      }}
      onSubmit={console.log}
    />
  );
};
const App = () => {
  return (
    <>
      <CssBaseline />
      <main>
        <h1>MFB Editor</h1>

        <MuiFB.BasicBuilder
          gridContainerProps={{
            spacing: 2,
            padding: 2,
          }}
          id="form-2"
          inputs={Object.values(textFieldOptions)}
          onSubmit={console.log}
        />

        <hr />
        <Test />
      </main>
    </>
  );
};

export default App;
