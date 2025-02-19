import { FB } from "./form-builder";

const TestPage = () => {
  return (
    <>
      <h3>Microkernel From Builder</h3>
      <FB.BasicBuilder
        inputs={[
          {
            type: "text",
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
