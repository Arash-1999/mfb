import { MuiFB } from "../../mui-plugin";

const MuiPage1 = () => {
  return (
    <>
      <MuiFB.BasicBuilder
        id="form-2"
        inputs={[
          {
            name: "gender",
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
        ]}
        onSubmit={console.log}
      />
    </>
  );
};

export { MuiPage1 };
