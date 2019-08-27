import { useState } from 'react';

export function useLocalStorage<A>(key: string, defaultValue: A): [A, (a: A) => void] {
  const defaultStr = localStorage.getItem(key);

  let defaultVal: A;
  try {
    defaultVal = defaultStr ? JSON.parse(defaultStr) : defaultValue;
  } catch (error) {
    console.error(error);
    defaultVal = defaultValue;
  }

  const [storedValue, setStoredValue] = useState<A>(defaultVal);

  return [
    storedValue,
    (a: A) => {
      setStoredValue(a);
      localStorage.setItem(key, JSON.stringify(a));
    },
  ];
}
