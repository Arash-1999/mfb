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
        inputs={[
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
          (api?: { deps?: { is_multiple?: string } }) => {
            console.log(api?.deps);
            return {
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
                    api?.deps?.is_multiple?.toLowerCase() === "yes"
                      ? "Multiple Value"
                      : "Single Value",
                },
              },
            };
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
