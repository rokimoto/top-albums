import { FormEvent } from 'react';
// Components
import Select from '../Select';
// Types
import {Option, SortOptions} from '../../types';
// Style
import './style.css'

interface FiltersProps {
  /**
   * The options for the genre dropdown
   */
  genreOptions: Option[];
  /**
   * The function run when selecting a new genre
   */
  handleGenreSelect: (e: FormEvent<HTMLSelectElement>) => void;
  /**
   * The currently selected genre
   */
  selectedGenre: string;
  /**
   * The options for the year dropdown
   */
  yearOptions: Option[];
  /**
   * The function run when selecting a new decade
   */
  handleYearSelect: (e: FormEvent<HTMLSelectElement>) => void;
  /**
   * The currently selected decade
   */
  selectedYear: string;
  /**
   * The currently selected sorting style
   */
  selectedSort: SortOptions;
  /**
   * The function run when selecting a new sorting style
   */
  handleSortSelect: (e: FormEvent<HTMLSelectElement>) => void;
}

const Filters = ({ genreOptions, handleGenreSelect, selectedGenre, yearOptions, handleYearSelect, selectedYear, selectedSort, handleSortSelect }: FiltersProps) => {

  const selectSortOptions: Option[] = [];
  Object.entries(SortOptions).forEach(([, value]) => {
    selectSortOptions.push({name: value, value: value});
  })

  return (
    <div className="filter-sorting">
      <div className="filter-filters">
        <Select options={[{value: 'all', name: 'All genres'}, ...genreOptions]} handleSelect={handleGenreSelect} value={selectedGenre} />
        <Select options={[{value: 'all', name: 'All years'}, ...yearOptions]} handleSelect={handleYearSelect} value={selectedYear} />
      </div>
      <div className="filter-sort">
        <div className="filter-selectionItem">
          <div className="filter-sortLabel">Sort by</div>
          <Select options={selectSortOptions} value={selectedSort} handleSelect={handleSortSelect} />
        </div>
      </div>
    </div>
  );
};

export default Filters;
