import type { DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';

import { DndContext, DragOverlay } from '@dnd-kit/core';
import { useState } from 'react';

import { Container } from './container';
import { Item } from './item';

const Dnd = () => {
  const [active, setActive] = useState<null | UniqueIdentifier>(null);

  const handleDragStart = (event: DragStartEvent) => {
    console.log(event);
    setActive(event.active.id);
  };
  const handleDragEnd = () => {
    setActive(null);
  };

  const [items] = useState<Array<UniqueIdentifier>>([1, 2, 3]);

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <Container items={items}>
        {items.map((item) => (
          <Item id={item} key={`item-${item}`} name={`item-${item}`}>
            Item number {item}
          </Item>
        ))}
      </Container>

      <DragOverlay>
        {active ? (
          <div>
            <p>{active}</p>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export { Dnd };
