import React from 'react';

function SelectSortId({options, value, onChange}) {

  return (
    <div className='select'>
        <select
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            <option disabled value="">Сортировка по ID</option>
            {options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
        </select>
    </div>
  );
}

export default SelectSortId;