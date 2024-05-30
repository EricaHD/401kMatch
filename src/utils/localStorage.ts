import React from 'react';

export const useLocalStorageState = <T>(key: string, initialValue: T): [T, (newVal: T) => void] => {
  const [value, setValue] = React.useState<T>(() => getLocalStorage<T>(key) ?? initialValue);
  const setLocalStorage = (newValue: T) => {
    if (key != null) localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };
  return [value, setLocalStorage];
};

const getLocalStorage = <T>(key: string): T | null => {
  const rawValue = localStorage.getItem(key);
  if (rawValue == null) return null;
  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return null;
  }
};
