import { Button } from "@mui/material";
import { FB } from "./form-builder";
import { dispatchFieldArray } from "@mfb/core";

interface TestPageFields {
  filters: {
    title: string;
    items: Array<{
      "fucking-input-1": string;
    }>;
  };
  appearance: {
    title: string;
    subtitle: string;
  };
}

const Page = () => {
  return (
    <>
      <Button
        variant="outlined"
        sx={{ mb: 2 }}
        onClick={() => {
          dispatchFieldArray<TestPageFields>(
            "ADVANCED_FORM_TEST_ID",
            "filters.items",
            {
              type: "append",
              params: [
                {
                  "fucking-input-1": "value 1",
                },
                { shouldFocus: false },
              ],
            },
          );
        }}
      >
        APPEND TO FILTER ITEMS
      </Button>
      <FB.AdvancedBuilder<TestPageFields>
        id="ADVANCED_FORM_TEST_ID"
        list={[
          {
            mode: "card",
            isGroup: true,
            variant: "normal",
            type: "tab-group",
            gridProps: {
              size: 12,
            },
            list: [
              {
                title: "Filters",
                gridContainerProps: {
                  spacing: 2,
                },
                name: "filters",
                list: [
                  {
                    actionType: "append",
                    gridProps: {
                      size: "auto",
                    },
                    name: "filters.items",
                    mode: "input",
                    type: "field-array-action",
                  },
                  {
                    mode: "input",
                    type: "text",
                    name: "title",
                    gridProps: {
                      size: 11,
                    },
                    props: {
                      textFieldProps: {
                        size: "small",
                        label: "Title",
                        placeholder: "Title",
                      },
                    },
                  },
                  {
                    dependsOn: {
                      type: "disable",
                      path: "filters.title",
                      id: "fitlers-title",
                      condition: "eq",
                      value: "fuck",
                    },
                    mode: "card",
                    type: "accordion",
                    header: "Accordion 1",
                    gridProps: {
                      size: 12,
                    },
                    gridContainerProps: {
                      spacing: 2,
                    },
                    list: [
                      {
                        mode: "input",
                        type: "text",
                        name: "accordion-1-title",
                        props: {
                          textFieldProps: {
                            size: "small",
                            label: "Nested 1",
                            placeholder: "Nested 1",
                          },
                        },
                      },
                      {
                        mode: "input",
                        type: "text",
                        name: "accordion-1-subtitle",
                        props: {
                          textFieldProps: {
                            size: "small",
                            label: "Nested 2",
                            placeholder: "Nested 2",
                          },
                        },
                      },
                      {
                        mode: "input",
                        type: "list",
                        name: "items",
                        gridContainerProps: {
                          spacing: 2,
                        },
                        gridProps: {
                          size: 12,
                        },
                        list: [
                          {
                            mode: "card",
                            header: "List Accordion",
                            type: "accordion",
                            gridProps: {
                              size: 6,
                            },
                            list: [
                              {
                                mode: "input",
                                type: "text",
                                name: "fucking-input-1",
                                gridProps: {
                                  size: 12,
                                },
                                props: {
                                  textFieldProps: {
                                    size: "small",
                                    label: "Input 1",
                                    placeholder: "Input 1",
                                  },
                                },
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                title: "Appearance",
                gridContainerProps: {
                  spacing: 2,
                },
                list: [
                  {
                    mode: "input",
                    type: "text",
                    name: "title",
                    gridProps: {
                      size: 6,
                    },
                    props: {
                      textFieldProps: {
                        size: "small",
                        label: "Title",
                        placeholder: "Title",
                      },
                    },
                  },
                  {
                    mode: "input",
                    type: "text",
                    name: "subtitle",
                    gridProps: {
                      size: 6,
                    },
                    props: {
                      textFieldProps: {
                        size: "small",
                        label: "Subtitle",
                        placeholder: "Subtitle",
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

export default Page;
