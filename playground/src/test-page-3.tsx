import { Container } from "@mui/material";
import { FB } from "./form-builder";

const TestPage3 = () => {
  return (
    <Container>
      <FB.Builder
        gridProps={{
          spacing: 2,
        }}
        cards={[
          {
            isGroup: true,
            variant: "simple",
            gridProps: {
              size: 12,
            },
            inputs: [
              {
                list: [
                  {
                    type: "text",
                    name: "input-1",
                    props: {
                      textFieldProps: {
                        size: 'small',
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
                        size: 'small',
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
                        size: 'small',
                        label: "Third Input",
                        placeholder: "Third Input",
                      },
                    },
                  },
                ],
                title: "Group Item 1",
              },
              {
                list: [
                  {
                    type: "text",
                    name: "input-4",
                    props: {
                      textFieldProps: {
                        size: 'small',
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
                        size: 'small',
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
                        size: 'small',
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
        ]}
      />
    </Container>
  );
};

export default TestPage3;
