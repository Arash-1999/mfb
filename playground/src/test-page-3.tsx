import { Button, Container } from "@mui/material";
import { FB } from "./form-builder";
import { dispatchFieldArray } from "@mfb/core";

const TEST_PAGE_3_FORM_ID = "TEST_PAGE_3_FORM_ID";

type TestPageForm = {
  [key in `input-${1 | 2 | 3 | 4 | 5 | 6}`]: string;
} & {
  country: string;
  state: string;
  tabs: Array<{
    [key in `input-${1 | 2 | 3}`]: string;
  }>;
};

const TestPage3 = () => {
  return (
    <Container>
      <Button
        variant="outlined"
        sx={{ mb: 2 }}
        onClick={() => {
          dispatchFieldArray<TestPageForm>(TEST_PAGE_3_FORM_ID, "tabs", {
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
          dispatchFieldArray<TestPageForm>(TEST_PAGE_3_FORM_ID, "tabs", {
            type: "remove",
            params: [-1],
          });
        }}
      >
        REMOVE FROM AKBAR
      </Button>

      <FB.Builder<TestPageForm>
        gridProps={{
          spacing: 2,
        }}
        id={TEST_PAGE_3_FORM_ID}
        cards={[
          {
            isGroup: true,
            variant: "simple",
            gridProps: {
              size: 12,
            },
            inputs: [
              {
                gridContainerProps: {
                  spacing: 2,
                },
                list: [
                  {
                    type: "text",
                    name: "input-1",
                    gridProps: {
                      size: 3,
                    },
                    dependsOn: {
                      path: "input-2",
                      type: "disable",
                      condition: "not-eq",
                      value: "something",
                      id: "input-2",
                    },
                    props: {
                      textFieldProps: {
                        size: "small",
                        label: "First Input",
                        placeholder: "First Input",
                      },
                    },
                  },
                  {
                    type: "select",
                    name: "country",
                    gridProps: {
                      size: 6,
                    },
                    props: {
                      selectProps: {
                        label: "Country",
                        size: "small",
                      },
                      options: [
                        { label: "Iran", value: "ir" },
                        { label: "United States of America", value: "usa" },
                        { label: "France", value: "fr" },
                        { label: "Germany", value: "de" },
                        { label: "Italy", value: "it" },
                      ],
                    },
                  },
                  {
                    type: "select",
                    name: "state",
                    gridProps: {
                      size: 6,
                    },
                    dependsOn: [
                      {
                        type: "bind-value",
                        path: "country",
                        id: "country",
                      },
                      {
                        type: "bind-value",
                        path: "input-1",
                        id: "input-1",
                      },
                    ],
                    props: {
                      selectProps: {
                        label: "State",
                        size: "small",
                      },
                      options: [],
                    },
                  },
                  {
                    type: "text",
                    name: "input-2",
                    props: {
                      textFieldProps: {
                        size: "small",
                        label: "Second Input",
                        placeholder: "Second Input",
                      },
                    },
                  },
                  {
                    type: "text",
                    name: "input-3",
                    props: {
                      textFieldProps: {
                        size: "small",
                        label: "Third Input",
                        placeholder: "Third Input",
                      },
                    },
                    dependsOn: {
                      type: "visibility",
                      path: "input-1",
                      condition: "eq",
                      value: "something",
                      id: "input-1",
                    },
                  },
                ],
                title: "Group Item 1",
              },
              {
                gridContainerProps: {
                  spacing: 2,
                },
                list: [
                  {
                    type: "text",
                    name: "input-4",
                    props: {
                      textFieldProps: {
                        size: "small",
                        label: "Fourth Input",
                        placeholder: "Fourth Input",
                      },
                    },
                  },
                  {
                    type: "text",
                    name: "input-5",
                    props: {
                      textFieldProps: {
                        size: "small",
                        label: "Fifth Input",
                        placeholder: "Fifth Input",
                      },
                    },
                  },
                  {
                    type: "text",
                    name: "input-6",
                    props: {
                      textFieldProps: {
                        size: "small",
                        label: "Sixth Input",
                        placeholder: "Sixth Input",
                      },
                    },
                  },
                ],
                title: "Group Item 2",
              },
            ],
            type: "accordion-group",
          },
          {
            isGroup: true,
            variant: "list",
            gridProps: {
              size: 12,
            },
            name: "tabs",
            inputs: [
              {
                type: "text",
                name: "input-1",
                props: {
                  textFieldProps: {
                    size: "small",
                    label: "First Input",
                    placeholder: "First Input",
                  },
                },
              },
              {
                type: "text",
                name: "input-2",
                props: {
                  textFieldProps: {
                    size: "small",
                    label: "Second Input",
                    placeholder: "Second Input",
                  },
                },
              },
              {
                type: "text",
                name: "input-3",
                props: {
                  textFieldProps: {
                    size: "small",
                    label: "Third Input",
                    placeholder: "Third Input",
                  },
                },
              },
            ],
            type: "tab-group",
          },
        ]}
      />
    </Container>
  );
};

export default TestPage3;
