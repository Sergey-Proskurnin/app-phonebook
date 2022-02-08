import React, { useContext, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';

import s from './Filter.module.css';

import { changeFilter, getFilter } from 'redux/contacts';
import FavoriteCheckBox from 'components/FavoriteCheckbox';
import contextProps from 'context/context';

const filterInputId = uuidv4();

const Filter = ({ nodeRef }) => {
  const { favorite, setFavorite } = useContext(contextProps);
  const filter = useSelector(state => getFilter(state));

  const dispatch = useDispatch();
  const onChangeFilter = e => dispatch(changeFilter(e.target.value));

  const onFavoriteChange = useCallback(() => {
    setFavorite(prevFavorite => !prevFavorite);
  }, [setFavorite]);

  return (
    <label htmlFor={filterInputId} className={s.filterBlock} ref={nodeRef}>
      <span className={s.span}>Find contacts by name and number</span>
      <div className={s.spanInputGroup}>
        <span className={s.spanCheckBox}>
          <FavoriteCheckBox
            favorite={favorite}
            size="large"
            handleChange={onFavoriteChange}
          />
        </span>
        <input
          className={s.input}
          type="text"
          value={filter}
          onChange={onChangeFilter}
          id={filterInputId}
        />
      </div>
    </label>
  );
};

export default Filter;
