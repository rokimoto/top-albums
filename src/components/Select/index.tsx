import {FormEvent} from 'react';
// Types
import {Option} from '../../types';
// Style
import './style.css'

interface Select {
  /**
   * The options for the dropdown
   */
  options: Option[];
  /**
   * The currently selected option
   */
  value: string;
  /**
   * The function that runs when a new option is selected
   */
  handleSelect: (e: FormEvent<HTMLSelectElement>) => void;
}

const Select = ({options, value, handleSelect}: Select) => {
  return (
    <div className='select'>
      <select value={value} onChange={handleSelect}>
        {options.map((option, i) => <option value={option.value} key={`option-${i}`}>{option.name}</option>)}
      </select>
    </div>
  );
};

export default Select;
