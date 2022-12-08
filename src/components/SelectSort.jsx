import React from 'react';

function SelectSort({options, onChange, selectName, optionValue, optionName}) {

  return (
    <div className='select'>
        <select
            defaultValue='selected'
            onChange={onChange}
        >
            <option disabled value='selected'>{selectName}</option>
            {options.map(option =>
                <option key={option.optionValue} value={option.optionValue}>
                    {option.optionName}
                </option>
            )}
        </select>
    </div>
  );
}

export default SelectSort;