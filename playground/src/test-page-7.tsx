// test dependency should reset
import { FB } from "./form-builder";

interface TestPageFields {
  is_multiple: boolean;
  value: string | { xs: string; md: string };
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
          {
            dependsOn: {
              path: "is_multiple",
              condition: "eq",
              id: "is_multiple",
              type: "visibility",
              value: "yes",
            },
            shouldReset: true,
            type: "text",
            name: "value",
            props: {
              textFieldProps: {
                size: "small",
                label: "value",
                placeholder: "value",
              },
            },
          },
          {
            dependsOn: {
              path: "is_multiple",
              condition: "not-eq",
              id: "is_multiple",
              type: "visibility",
              value: "yes",
            },
            type: "text",
            name: "value.xs",
            props: {
              textFieldProps: {
                size: "small",
                label: "value xs",
                placeholder: "value xs",
              },
            },
          },

          {
            dependsOn: {
              path: "is_multiple",
              condition: "not-eq",
              id: "is_multiple",
              type: "visibility",
              value: "yes",
            },
            type: "text",
            name: "value.md",
            props: {
              textFieldProps: {
                size: "small",
                label: "value md",
                placeholder: "value md",
              },
            },
          },
          //   api.define<{ is_multiple: string }>((props) => ({
          //     type: "text",
          //     name: "value",
          //     dependsOn: [
          //       {
          //         type: "def-props",
          //         path: "is_multiple",
          //         id: "is_multiple",
          //       },
          //     ],
          //     props: {
          //       textFieldProps: {
          //         size: "small",
          //         label:
          //           props?.deps.is_multiple?.toLowerCase() === "yes"
          //             ? "Multiple Value"
          //             : "Single Value",
          //       },
          //     },
          //   })),
        ]}
        onSubmit={(data) => {
          console.log(data);
        }}
      />
    </>
  );
};

export default Page;
