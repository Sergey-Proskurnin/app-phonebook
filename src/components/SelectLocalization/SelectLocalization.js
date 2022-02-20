import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';

import { options } from 'helpers/constants';
import customSelectStyles from './customSelectStyles';
import customSelectStylesTablet from './customSelectStylesTablet';
import useWindowDimensions from 'hooks/useWindowDimensions';
// import s from './SelectLocalization.module.css'

const SelectLocalization = () => {
  const [nameOptionSelect, setNameOptionSelect] = useState('en');
  const viewPort = useWindowDimensions();
  const { i18n } = useTranslation();
  const changeLanguage = (language = 'en') => {
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    changeLanguage(nameOptionSelect);
    // eslint-disable-next-line
  }, [nameOptionSelect]);

  const onValueChange = e => {
    setNameOptionSelect(e.value);
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
          placeholder="EN"
        />
      )}
      {viewPort.width < 768 && <></>}
    </>
  );
};

export default SelectLocalization;
