import { Button } from "@mui/material";
import { FB } from "./form-builder";
// import { dispatchArrayAction } from "@mfb/core";
import { dispatchFieldArray } from "@mfb/core";

const TEST_PAGE_2_FORM_ID = "TEST_PAGE_2_FORM_ID";

type TestPageForm = {
  "card-1": {
    "list-dep": string;
    akbar: Array<Record<`input-${1 | 2 | 3}`, string>>;
  };
  "card-2": {
    akbar: Array<Record<`input-${1 | 2 | 3}`, string>>;
  };
};

const TestPage2 = () => {
  return (
    <>
      <h3>Microkernel From Builder</h3>

      <Button
        variant="outlined"
        sx={{ mb: 2 }}
        onClick={() => {
          dispatchFieldArray<TestPageForm>(
            TEST_PAGE_2_FORM_ID,
            Math.floor(Math.random() * 2) + 1 > 1
              ? "card-2.akbar"
              : "card-1.akbar",
            {
              type: "append",
              params: [
                {
                  "input-1": "value 1",
                  "input-2": "value 2",
                  "input-3": "value 3",
                },
                { shouldFocus: false },
              ],
            },
          );
        }}
      >
        APPEND TO AKBAR
      </Button>
      <Button
        variant="outlined"
        sx={{ mb: 2 }}
        onClick={() => {
          dispatchFieldArray<TestPageForm>(
            TEST_PAGE_2_FORM_ID,
            Math.floor(Math.random() * 2) + 1 > 1
              ? "card-2.akbar"
              : "card-1.akbar",
            {
              type: "remove",
              params: [-1],
            },
          );
        }}
      >
        REMOVE FROM AKBAR
      </Button>
      <FB.Builder<TestPageForm>
        gridContainerProps={{
          spacing: 2,
        }}
        id={TEST_PAGE_2_FORM_ID}
        cards={[
          {
            gridProps: { size: 12 },
            header: "First Card (akbar)",
            name: "card-1",
            type: "paper",
            inputs: [
              {
                actionType: "append",
                name: "card-1.akbar",
                type: "field-array-action",
              },
              {
                type: "text",
                name: "list-dep",
                props: {
                  textFieldProps: {
                    label: "List Deps",
                    placeholder: "List Deps",
                    size: "small",
                  },
                },
              },
              {
                gridProps: {
                  size: 12,
                },
                gridContainerProps: {
                  spacing: 1,
                },
                type: "list",
                name: "akbar",
                dependsOn: {
                  type: "disable",
                  condition: "eq",
                  path: "card-1.list-dep",
                  value: "show",
                  id: "list-dep",
                },
                inputs: [
                  {
                    actionType: "remove",
                    name: "card-1.akbar",
                    type: "field-array-action",
                  },
                  {
                    type: "text",
                    gridProps: {
                      size: 12,
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
                      size: 12,
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
                      size: 12,
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
            ],
          },
          {
            dependsOn: {
              type: "disable",
              id: "list-dep",
              path: "card-1.list-dep",
              condition: "eq",
              value: "show",
            },
            gridProps: { size: 12 },
            header: "First Card (asghar)",
            name: "card-2",
            type: "accordion",
            inputs: [
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
            ],
          },
        ]}
        onSubmit={(data) => {
          console.log(data);
        }}
      />
    </>
  );
};

export default TestPage2;
