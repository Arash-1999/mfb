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
            gridProps: {
              size: 12,
            },
            gridContainerProps: {
              spacing: 1,
            },
            type: "list",
            name: "akbar",
            inputs: [
              {
                type: "text",
                gridProps: {
                  size: { xs: 12, sm: 4 },
                },
                name: "input-1",
                props: {
                  textFieldProps: {
                    placeholder: "First Input",
                    size: "small",
                  },
                },
              },
              {
                type: "text",
                gridProps: {
                  size: { xs: 12, sm: 4 },
                },
                name: "input-2",
                props: {
                  textFieldProps: {
                    placeholder: "Second Input",
                    size: "small",
                  },
                },
              },
              {
                type: "text",
                gridProps: {
                  size: { xs: 12, sm: 4 },
                },
                name: "input-3",
                props: {
                  textFieldProps: {
                    placeholder: "Third Input",
                    size: "small",
                  },
                },
              },
            ],
          },
        ]}
      />
    </>
  );
};

export default TestPage;
