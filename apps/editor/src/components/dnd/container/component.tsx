import type { UniqueIdentifier } from "@dnd-kit/core";
import type { PropsWithChildren } from "react";

import { SortableContext } from '@dnd-kit/sortable';

interface ContainerProps {
  items: Array<UniqueIdentifier>;
}

const Container = ({ children, items }: PropsWithChildren<ContainerProps>) => {
  return (
    <SortableContext items={items}>
      <div style={{
        display: 'grid',
        gap: '8px',
        gridTemplateColumns: "1fr 1fr",
      }}>
        {children}
      </div>
    </SortableContext>
  );
};

export { Container }
