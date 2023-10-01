import config from 'config';
import { useState, useCallback } from 'react';

export const useLocalStorage = (name, initialValue, time) => {
  const key = `${config.appPrefix}_${name}`;

  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const now = new Date();
      const item = window.localStorage.getItem(key);

      if (now.getTime() > JSON.parse(item)?.expiry) {
        if (time === -1) return JSON.parse(item)?.value;

        localStorage.removeItem(key);

        return initialValue;
      }

      return item ? JSON.parse(item)?.value : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const now = new Date();

        if (value !== '') {
          setStoredValue(value);

          if (typeof window !== 'undefined') {
            const item = {
              value: value,
              expiry: time || now.getTime() + 500000
            };

            window.localStorage.setItem(key, JSON.stringify(item));
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    [key, time]
  );

  return [storedValue, setValue];
};
