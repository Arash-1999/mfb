const mergeName = (...names: Array<number | string>) => {
  let result = "";

  names.forEach((name) => {
    if (name) {
      result = result === "" ? String(name) : `${result}.${name}`;
    }
  });

  return result;
};

export { mergeName };
