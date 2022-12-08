import React from 'react';

function InputSearchId({valueId, onChange}) {

  return (
    <input 
        type='text'
        placeholder='Поиск по ID'
        value={valueId}
        onChange={onChange}
    />
  );
}

export default InputSearchId;