import numbro from "numbro";

export const parseNumberString = (str: string) => {
  str = str.toLowerCase();
  let multiplier = 1;

  if (str.includes("million")) {
    multiplier = 1e6;
    str = str.replace("million", "");
  } else if (str.includes("billion")) {
    multiplier = 1e9;
    str = str.replace("billion", "");
  } else if (str.includes("thousand")) {
    multiplier = 1e3;
    str = str.replace("thousand", "");
  }

  str = str.replace(/,/g, "").trim();
  const number = numbro(str).value();
  return number * multiplier;
};

export const generateRealisticPlaceholder = (metricTitle: string) => {
  const placeholders = {
    "Net Revenue": Math.floor(Math.random() * 50000) + 10000,
    "Net Interest Income": Math.floor(Math.random() * 10000) + 5000,
    "Net Income": Math.floor(Math.random() * 20000) + 10000,
    "Earnings Before Interest, Taxes, Depreciation, and Amortization (EBITDA)":
      Math.floor(Math.random() * 30000) + 10000,
  };
  return placeholders[metricTitle] || Math.floor(Math.random() * 20000) + 5000;
};

export const saveToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key: string, defaultValue: any) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};
