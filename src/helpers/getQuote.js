export const getQuote = (value) => {
  let quote = 'a';
  console.log(value);
  if (value === 0) {
    return (quote = 'Estaremos pendientes de tu progreso');
  }
  if (value >= 1 && value < 10) {
    return (quote = 'Apenas empiezas, ¡Ánimo!');
  }
  if (value >= 10 && value < 40) {
    return (quote = 'Vas por buen camino');
  }
  if (value >= 40 && value < 60) {
    return (quote = '¡Ya estás por la mitad!');
  }
  if (value >= 60 && value < 80) {
    return (quote = '¡Nada te detiene!');
  }
  if (value >= 80 && value < 90) {
    return (quote = '¡El premio es casi tuyo!');
  }
  if (value >= 90 && value < 99) {
    return (quote = '¡La meta está cerca!');
  }
  if (value === 100) {
    // eslint-disable-next-line
    return (quote = '¡Lo lograste!');
  }
};
