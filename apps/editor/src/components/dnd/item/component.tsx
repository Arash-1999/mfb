import type { UniqueIdentifier } from "@dnd-kit/core";
import type { PropsWithChildren } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';

interface ItemProps {
  id: UniqueIdentifier;
  name: string;
}

const Item = ({ children, id, name, }: PropsWithChildren<ItemProps>) => {
  const { attributes, isDragging, listeners, setNodeRef, transform, transition, } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      className={`border border-amber-600 ${isDragging ? 'border-amber-900 bg-amber-100' : ''}`}
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <div className='flex justify-between p-2 border-b border-amber-600'>
        <p>{name}</p>
        <button {...listeners} className='cursor-pointer'>
          ...
        </button>
      </div>

      <div className='p-2'>
        {children}
      </div>
    </div>
  );
};

export { Item }
