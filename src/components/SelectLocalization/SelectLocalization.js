import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';

import { options } from 'helpers/constants';
import customSelectStyles from './customSelectStyles';
import customSelectStylesTablet from './customSelectStylesTablet';
import useWindowDimensions from 'hooks/useWindowDimensions';
import { changeLocalizationSuccess, getСurrentLocalization } from 'redux/auth';
// import s from './SelectLocalization.module.css'

const SelectLocalization = () => {
  const currentLocalization = useSelector(getСurrentLocalization);

  const dispatch = useDispatch();

  const viewPort = useWindowDimensions();
  const { i18n } = useTranslation();
  const changeLanguage = (language = 'en') => {
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    changeLanguage(currentLocalization);
    // eslint-disable-next-line
  }, [currentLocalization]);

  const onValueChange = e => {
    dispatch(changeLocalizationSuccess(e.value));
  };

  return (
    <>
      {viewPort.width >= 768 && (
        <Select
          styles={
            viewPort.width >= 1200
              ? customSelectStyles
              : customSelectStylesTablet
          }
          options={options}
          onChange={onValueChange}
          defaultValue="en"
          name="select"
          placeholder={currentLocalization.toUpperCase()}
        />
      )}
      {viewPort.width < 768 && <></>}
    </>
  );
};

export default SelectLocalization;
