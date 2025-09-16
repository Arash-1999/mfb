interface Item {
  validation?: null;
}

type ItemArray = Array<Item>;

const parser = (items: ItemArray) => {
  items.forEach(() => {});
};

export { parser };
