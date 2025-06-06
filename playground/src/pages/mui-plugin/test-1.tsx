import { MuiFB } from "../../mui-plugin";

const MuiPage1 = () => {
  return (
    <>
      <MuiFB.BasicBuilder
        id="form-2"
        gridContainerProps={{
          spacing: 2,
          p: 2,
        }}
        inputs={[
          {
            name: "gender",
            gridProps: {
              size: 6,
            },
            props: {
              options: [
                { label: "Male", value: "1" },
                { label: "Female", value: "0" },
              ],
              radioGroupProps: {
                defaultValue: "1",
                row: true,
              },
            },
            type: "radio",
          },
          {
            name: "asghar",
            gridProps: {
              size: 6,
            },
            props: {
              options: [
                { label: "Male", value: "1" },
                { label: "Female", value: "0" },
              ],
              label: "Gender",
              formControlProps: {
                fullWidth: true,
              },
            },
            type: "select",
          },
        ]}
        onSubmit={console.log}
      />
    </>
  );
};

export { MuiPage1 };
