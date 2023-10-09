export const isEmpty = (object: Object) => {
  return Object.keys(object).length == 0;
};

export const filterNotNullValues = (object: Object) => {
  return Object.fromEntries(Object.entries(object).filter(([k, v]) => v));
};
