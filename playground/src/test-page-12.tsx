import { CustomElementProps } from "@mfb/core";
import { FB } from "./form-builder";
import { MfbFieldArray } from "./form-builder/field-array";
import { FieldValues, Path } from "react-hook-form";

interface ListItem {
  title: string;
  key: string;
}

interface Schema {
  custom: string;
  overrideList: Array<ListItem>;
  list: Array<ListItem>;
  test: string;
}

const TestCustomElement = <TFields extends FieldValues>({
  disabled,
  formMethods,
  name,
}: CustomElementProps<TFields>) => {
  return (
    <div>
      <h6>Test Custom Element</h6>

      <input
        disabled={disabled}
        type="text"
        {...formMethods.register(name as Path<TFields>)}
      />
    </div>
  );
};

const Page = () => {
  return (
    <>
      <FB.BasicBuilder<Schema>
        gridContainerProps={{ spacing: 2 }}
        id="TEST_PAGE_FORM_ID"
        inputs={[
          {
            type: "custom-element",
            element: TestCustomElement,
            name: "custom",
            dependsOn: [
              {
                type: "disable",
                condition: "eq",
                id: "test-dep",
                path: "test",
                value: "fuck",
              },
            ],
          },
          {
            gridProps: { size: 6 },
            name: "test",
            props: {
              textFieldProps: {
                fullWidth: true,
                size: "small",
                label: "Test",
                placeholder: "Test",
              },
            },
            type: "text",
          },
          {
            element: MfbFieldArray,
            gridContainerProps: { spacing: 2 },
            gridProps: { size: 12 },
            name: "overrideList",
            inputs: [
              {
                gridProps: { size: 6 },
                name: "title",
                props: {
                  textFieldProps: {
                    fullWidth: true,
                    size: "small",
                    label: "Title",
                    placeholder: "Title",
                  },
                },
                type: "text",
              },
              {
                gridProps: { size: 6 },
                name: "key",
                props: {
                  textFieldProps: {
                    fullWidth: true,
                    size: "small",
                    label: "Key",
                    placeholder: "Key",
                  },
                },
                type: "text",
              },
            ],
            type: "list",
          },
          // {
          //   type: "field-array-action",
          //   actionType: "append",
          //   name: "overrideList",
          //   gridProps: { size: "auto" },
          //   props: { icon: "append" },
          // },
          {
            gridContainerProps: { spacing: 2 },
            gridProps: { size: 11 },
            name: "list",
            inputs: [
              {
                gridProps: { size: 5 },
                name: "title",
                props: {
                  textFieldProps: {
                    fullWidth: true,
                    size: "small",
                    label: "Title",
                    placeholder: "Title",
                  },
                },
                type: "text",
              },
              {
                gridProps: { size: 5 },
                name: "key",
                props: {
                  textFieldProps: {
                    fullWidth: true,
                    size: "small",
                    label: "Key",
                    placeholder: "Key",
                  },
                },
                type: "text",
              },
            ],
            type: "list",
          },
          {
            type: "field-array-action",
            actionType: "append",
            name: "list",
            gridProps: { size: "auto" },
            props: { icon: "append" },
          },
        ]}
        onSubmit={console.log}
      />

      <FB.Builder
        id="TEST_PAGE_2_FORM_ID"
        cards={[
          {
            type: "custom-element",
            element: TestCustomElement,
            name: "custom",
            dependsOn: [
              {
                type: "disable",
                condition: "eq",
                id: "test-dep",
                path: "test",
                value: "fuck",
              },
            ],
          },
        ]}
        onSubmit={console.log}
      />

      <FB.AdvancedBuilder
        id="TEST_PAGE_2_FORM_ID"
        list={[
          {
            type: "custom-element",
            element: TestCustomElement,
            name: "custom",
            dependsOn: [
              {
                type: "disable",
                condition: "eq",
                id: "test-dep",
                path: "test",
                value: "fuck",
              },
            ],
          },
        ]}
        onSubmit={console.log}
      />
    </>
  );
};

export default Page;
