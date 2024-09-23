import { createContext } from "react";
let defaultYear = "";
const getTime = new Date();
const month = getTime.getMonth();
const year = getTime.getFullYear();
console.log(typeof month, typeof year);
if (month > 9) {
  defaultYear = `${year} - ${year + 1}`;
  console.log(defaultYear);
} else {
  defaultYear = `${(year % 100) - 1}-${year % 100}`;
  console.log(defaultYear);
}
export const currentYear = createContext(defaultYear);
