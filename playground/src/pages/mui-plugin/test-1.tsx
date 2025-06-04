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
                ///  defaultValue: "1",
                row: true,
              },
            },
            type: "radio",
          },
          {
            name: "akbar",
            props: {
              ratingProps: {
                defaultValue: 2,
              },
            },
            type: "rating",
          },
          {
            name: "asghar",
            props: {
              sliderProps: {
                defaultValue: 12,
              },
            },
            type: "slider",
          },
          {
            name: "gener",
            props: {
              options: [
                { label: "Male", value: "1" },
                { label: "Female", value: "0" },
              ],
              selectProps: {
                ///  defaultValue: "1",
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
