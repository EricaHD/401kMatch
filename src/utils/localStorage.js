import React from 'react';

export const useLocalStorageState = (key, initialValue) => {
  const [value, setValue] = React.useState(() => getLocalStorage(key) ?? initialValue);
  const setLocalStorage = (newValue) => {
    if (key != null) localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };
  return [value, setLocalStorage];
}

const getLocalStorage = (key) => {
  const rawValue = localStorage.getItem(key);
  if (rawValue == null) return null;
  try {
    return JSON.parse(rawValue);
  } catch {
    return null;
  }
}
