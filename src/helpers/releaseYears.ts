// Types
import { Option } from "../types";

const decades = [
 '1960-1969',
 '1970-1979',
 '1980-1989',
 '1990-1999',
 '2000-2009',
 '2010-2019',
 '2020-2025',
];

export const yearOptions: Option[] = decades.map((decade: string) => {
  return {name: decade, value: decade}
});

export const checkIfInDecade = (albumYear: string, decade: string) => {
  if (decade === 'all') return true;
  const albumYearInt = parseInt(albumYear, 10);
  const decadeMin = parseInt(decade.slice(0, 4), 10);
  const decadeMax = parseInt(decade.slice(-4), 10);
  return ((albumYearInt >= decadeMin) && albumYearInt <= decadeMax);
}