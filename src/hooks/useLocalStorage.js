import { useState, useEffect } from 'react';

export const useLocalStorage = (key, defArray) => {
  const [state, setState] = useState(
    () => JSON.parse(localStorage.getItem(key)) ?? defArray
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
};
