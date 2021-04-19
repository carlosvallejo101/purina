import { useState, useEffect } from 'react';

export const useGetQuote = (value) => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    if (value < 10) {
      setQuote('Apenas empiezas, ¡Ánimo!');
    }
    if (value >= 10 && value < 40) {
      setQuote('Vas por buen camino');
    }
    if (value >= 40 && value < 60) {
      setQuote('¡Ya estás por la mitad!');
    }
    if (value >= 60 && value < 80) {
      setQuote('¡El premio es casi tuyo!');
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
