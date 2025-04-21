import { FB } from "./form-builder";

interface TestPage4Fields {
  filters: Array<{
    title: string;
  }>;
  appearance: {
    title: string;
    subtitle: string;
  };
}

const Page = () => {
  return (
    <>
      <FB.AdvancedBuilder<TestPage4Fields>
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
                list: [
                  {
                    mode: "input",
                    type: "text",
                    name: "title",
                    gridProps: {
                      size: 12,
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
                    mode: "card",
                    type: "accordion",
                    header: "Accordion 1",
                    gridProps: {
                      size: 12,
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
