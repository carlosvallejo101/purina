export const formatNumber = (value, min, max, digits = 0) => {
  let formattedNumber = 0;
  formattedNumber = value < min ? min : value;

  if (max) {
    formattedNumber = value > max ? max : value;
  }
  return parseFloat(formattedNumber).toFixed(digits);
};
