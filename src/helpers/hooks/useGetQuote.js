import { useState, useEffect } from 'react';

export const useGetQuote = (value) => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // switch (value) {
    //   case value === 0:
    //     return setQuote('Estaremos pendientes de tu progreso');
    //     break;
    //   case value >= 1 && value < 10:
    //     setQuote('Apenas empiezas, ¡Ánimo!');
    //     break;
    //   case value >= 10 && value < 40:
    //     setQuote('');
    //     break;
    //   case value >= 40 && value < 60:
    //     setQuote('¡Ya estás por la mitad!');
    //     break;
    //   case value >= 60 && value < 80:
    //     setQuote('¡El premio es casi tuyo!');
    //     break;
    //   case value >= 80 && value < 90:
    //     setQuote('¡El premio es casi tuyo!');
    //     break;
    //   case value >= 90 && value < 99:
    //     setQuote('¡La meta está cerca!');
    //     break;
    //   case value === 100:
    //     setQuote('¡Lo lograste!');
    //     break;
    //   default:
    //     setQuote('a');
    //     break;
    // }
    if (value === 0) {
      setQuote('Estaremos pendientes de tu progreso');
    }
    if (value >= 1 && value < 10) {
      setQuote('Apenas empiezas, ¡Ánimo!');
    }
    if (value >= 10 && value < 40) {
      setQuote('Vas por buen camino');
    }
    if (value >= 40 && value < 60) {
      setQuote('¡Ya estás por la mitad!');
    }
    if (value >= 60 && value < 80) {
      setQuote('¡!');
    }
    if (value >= 80 && value < 90) {
      setQuote('¡El premio es casi tuyo!');
    }
    if (value >= 90 && value < 99) {
      setQuote('¡La meta está cerca!');
    }
    if (value === 100) {
      setQuote('¡Lo lograste!');
    }
  }, [value]);

  return quote;
};
