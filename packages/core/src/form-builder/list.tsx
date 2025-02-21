import type { ArrayPath, FieldValues } from "react-hook-form";

import { useFieldArray } from "react-hook-form";

const List = <TData extends FieldValues>({
  name,
}: {
  name: ArrayPath<TData>;
}) => {
  const { fields } = useFieldArray<TData>({
    name,
  });

  return (
    <div>
      {fields.map((field) => (
        <div key={field.id}></div>
      ))}
    </div>
  );
};

export default List;
