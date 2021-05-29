export const getRemaining = (objective, result) => {
  return objective - result <= 0 ? 0 : objective - result;
};
