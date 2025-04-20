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
            isGroup: true,
            variant: "normal",
            type: "tab-group",
            list: [
              {
                title: "Filters",
                list: [
                  {
                    type: "text",
                    name: "title",
                    props: {
                      textFieldProps: {
                        label: "Title",
                        placeholder: "Title",
                      },
                    },
                  },
                ],
              },
              {
                title: "Appearance",
                list: [
                  {
                    type: "text",
                    name: "title",
                    props: {
                      textFieldProps: {
                        label: "Title",
                        placeholder: "Title",
                      },
                    },
                  },
                  {
                    type: "text",
                    name: "subtitle",
                    props: {
                      textFieldProps: {
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
