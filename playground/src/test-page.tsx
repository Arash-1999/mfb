import { FB } from "./form-builder";

const TestPage = () => {
  return (
    <>
      <h3>Microkernel From Builder</h3>
      <FB.BasicBuilder
        gridContainerProps={{
          spacing: 2,
        }}
        inputs={[
          {
            type: "text",
            gridProps: {
              size: { xs: 12, md: 4 },
            },
            props: {
              name: "input-1",
              textFieldProps: {
                placeholder: "First Input",
                size: "small",
              },
            },
          },
          {
            type: "text",
            gridProps: {
              size: { xs: 12, md: 4 },
            },
            props: {
              name: "input-2",
              textFieldProps: {
                placeholder: "Second Input",
                size: "small",
              },
            },
          },
          {
            type: "text",
            gridProps: {
              size: { xs: 12, md: 4 },
            },
            props: {
              name: "input-3",
              textFieldProps: {
                placeholder: "Third Input",
                size: "small",
              },
            },
          },
        ]}
      />
    </>
  );
};

export default TestPage;
