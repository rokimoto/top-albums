import { FormEvent } from 'react';
// Components
import Select from '../Select';
// Types
import {Option, SortOptions} from '../../types';
// Style
import './style.css'

interface FiltersProps {
  genreOptions: Option[];
  handleGenreSelect: (e: FormEvent<HTMLSelectElement>) => void;
  selectedGenre: string;
  yearOptions: Option[];
  handleYearSelect: (e: FormEvent<HTMLSelectElement>) => void;
  selectedYear: string;
  selectedSort: SortOptions;
  handleSortSelect: (e: FormEvent<HTMLSelectElement>) => void;
}

const Filters = ({ genreOptions, handleGenreSelect, selectedGenre, yearOptions, handleYearSelect, selectedYear, selectedSort, handleSortSelect }: FiltersProps) => {

  const selectSortOptions: Option[] = [];
  Object.entries(SortOptions).forEach(([, value]) => {
    selectSortOptions.push({name: value, value: value});
  })

  return (
    <div className="list-sorting">
      <div className="list-filters">
        <Select options={[{value: 'all', name: 'All genres'}, ...genreOptions]} handleSelect={handleGenreSelect} value={selectedGenre} />
        <Select options={[{value: 'all', name: 'All years'}, ...yearOptions]} handleSelect={handleYearSelect} value={selectedYear} />
      </div>
      <div className="list-sort">
        <div className="list-selectionItem">
          <div className="list-sortLabel">Sort by</div>
          <Select options={selectSortOptions} value={selectedSort} handleSelect={handleSortSelect} />
        </div>
      </div>
    </div>
  );
};

export default Filters;
