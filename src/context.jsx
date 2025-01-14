import { createContext, useState } from "react";

// Calculate default year in XX-XX format
let defaultYear = "";
const getTime = new Date();
const month = getTime.getMonth();
const year = getTime.getFullYear();
const shortYear = year.toString().slice(-2); // Get last 2 digits of year

if (month > 9) {
  defaultYear = `${shortYear}-${Number(shortYear) + 1}`;
} else {
  defaultYear = `${Number(shortYear) - 1}-${shortYear}`;
}

// Create a single context for year management
export const CurrentYearContext = createContext();

export function CurrentYearProvider({ children }) {
  // Try to get saved year from localStorage, otherwise use default
  const savedYear = localStorage.getItem('selectedYear');
  const [currentYear, setCurrentYear] = useState(savedYear || defaultYear);

  const updateYear = (newYear) => {
    setCurrentYear(newYear);
    localStorage.setItem('selectedYear', newYear);
  };

  return (
    <CurrentYearContext.Provider value={{ year: currentYear, updateYear }}>
      {children}
    </CurrentYearContext.Provider>
  );
}