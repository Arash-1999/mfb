import { CssBaseline } from "@mui/material";

import { MuiFB } from "./builder";
import { useGridContainerOptions } from "./builder/components/grid-container";
import { textFieldOptions } from "./builder/components/text-field";

const Test = () => {
  const gridContainerOptions = useGridContainerOptions();

  return (
    <MuiFB.BasicBuilder
      gridContainerProps={{
        padding: 2,
        spacing: 2,
      }}
      id="form-2"
      inputs={Object.values(gridContainerOptions).flat()}
      onSubmit={console.log}
      options={{
        defaultValues: {
          columns: "",
          is_columns_responsive: false,
          is_spacing_responsive: false,
          spacing: "",
        },
      }}
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
            padding: 2,
            spacing: 2,
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
