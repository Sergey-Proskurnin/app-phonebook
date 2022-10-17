import React from 'react';
import { useTranslation } from 'react-i18next';

import { BASE_URL } from 'helpers/constants';
import s from './PrivacyPolicy.module.css';

const url = BASE_URL + '/privacy-policy';

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className={s.title}>
        <a className={s.link} href={url} target="_blanc">
          {t('privacyPolicy')}
        </a>
      </div>
    </>
  );
};

export default PrivacyPolicy;
