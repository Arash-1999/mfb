import { FB } from "./form-builder";

interface TestPageFields {
  is_multiple: boolean;
  value: string | string[];
}

const Page = () => {
  return (
    <>
      <FB.BasicBuilder<TestPageFields>
        id="TEST_PAGE_FORM_ID"
        gridContainerProps={{
          spacing: 2,
          mt: 8,
          p: 2,
        }}
        inputs={(api) => [
          {
            type: "text",
            name: "is_multiple",
            props: {
              textFieldProps: {
                size: "small",
                label: "Is Multiple",
                placeholder: "Is Multiple",
              },
            },
          },
          api.define<{ is_multiple: string }>((props) => ({
            type: "text",
            name: "value",
            dependsOn: [
              {
                type: "def-props",
                path: "is_multiple",
                id: "is_multiple",
              },
            ],
            props: {
              textFieldProps: {
                size: "small",
                label:
                  props?.deps.is_multiple?.toLowerCase() === "yes"
                    ? "Multiple Value"
                    : "Single Value",
              },
            },
          })),
        ]}
        onSubmit={(data) => {
          console.log(data);
        }}
      />
    </>
  );
};

export default Page;
