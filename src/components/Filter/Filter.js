import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';

import s from './Filter.module.css';

import { changeFilter, getFilter } from 'redux/contacts';

const filterInputId = uuidv4();

const Filter = () => {
  const filter = useSelector(state => getFilter(state));

  const dispatch = useDispatch();
  const onChangeFilter = e => dispatch(changeFilter(e.target.value));

  return (
    <label htmlFor={filterInputId}>
      <span className={s.span}>Find contacts by name and number</span>
      <input
        className={s.input}
        type="text"
        value={filter}
        onChange={onChangeFilter}
        id={filterInputId}
      />
    </label>
  );
};

export default Filter;
