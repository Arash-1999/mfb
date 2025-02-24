import { FB } from "./form-builder";
import { dispatchArrayAction } from "@mfb/core";

type TestPageForm = {
  akbar: Array<Record<`input-${1 | 2 | 3}`, string>>;
};

const TestPage = () => {
  return (
    <>
      <h3>Microkernel From Builder</h3>

      <button
        onClick={() => {
          dispatchArrayAction<TestPageForm>(
            {
              type: "append",
              params: [
                {
                  "input-1": "value 1",
                  "input-2": "value 2",
                  "input-3": "value 3",
                },
                {shouldFocus: false,}
              ],
            },
            "akbar"
          );
        }}
      >
        APPEND TO AKBAR
      </button>
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
