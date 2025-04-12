import { Button } from "@mui/material";
import { FB } from "./form-builder";
// import { dispatchArrayAction } from "@mfb/core";
import { dispatchFieldArray } from "@mfb/core";

const TEST_PAGE_FORM_ID = "TEST_PAGE_FORM_ID";

type TestPageForm = {
  akbar: Array<Record<`input-${1 | 2 | 3}`, string>>;
};

const TestPage = () => {
  return (
    <>
      <h3>Microkernel From Builder</h3>

      <Button
        variant="outlined"
        sx={{ mb: 2 }}
        onClick={() => {
          dispatchFieldArray<TestPageForm>(TEST_PAGE_FORM_ID, "akbar", {
            type: "append",
            params: [
              {
                "input-1": "value 1",
                "input-2": "value 2",
                "input-3": "value 3",
              },
              { shouldFocus: false },
            ],
          });
        }}
      >
        APPEND TO AKBAR
      </Button>
      <Button
        variant="outlined"
        sx={{ mb: 2 }}
        onClick={() => {
          dispatchFieldArray<TestPageForm>(TEST_PAGE_FORM_ID, "akbar", {
            type: "remove",
            params: [-1],
          });
        }}
      >
        REMOVE FROM AKBAR
      </Button>
      <FB.BasicBuilder
        gridContainerProps={{
          spacing: 2,
        }}
        onSubmit={(data) => {
          console.log(data);
        }}
        id={TEST_PAGE_FORM_ID}
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
