import {FormEvent} from 'react';
// Types
import {Option} from '../../types';
// Style
import './style.css'

interface Select {
  options: Option[];
  value: string;
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
