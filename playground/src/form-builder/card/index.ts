import { AccordionGroup, TabsGroup } from './group';

export { getSimpleCard } from './get-simple-card';

const getGroupCard = () => {
    return {
        'accordion-group': AccordionGroup,
        'tab-group': TabsGroup,
    }
}

export { getGroupCard };