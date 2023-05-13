import { useState, useEffect } from "react";

function getInputValue(initialVal, name) {
  const data = JSON.parse(localStorage.getItem(name));
  if (data) return data;
  return initialVal;
}

export default function useLocalStorage(initialVal, name) {
  const [value, setValue] = useState(() => {
    return getInputValue(initialVal, name);
  });

  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(value));
  }, [name, value]);

  return [value, setValue];
}
