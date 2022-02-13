import React from 'react';
import { useSelector } from 'react-redux';

import Navigation from 'components/Navigation';
import UserMenu from 'components/UserMenu';
import AuthNav from 'components/AuthNav';
import s from 'components/AppBar/AppBar.module.css';
import { getIsAuthenticated } from 'redux/auth';
import headerStyles from './headerAppBar.module.css';
import Animation from 'helpers/animation/Animation';
import SelectLocalization from 'components/SelectLocalization';
import { useTranslation } from 'react-i18next';

const AppBar = () => {
  const { t } = useTranslation();
  const nodeRef = React.useRef(null);
  const isAuthenticated = useSelector(state => getIsAuthenticated(state));
  return (
    <Animation style={headerStyles} time={500} nodeRef={nodeRef}>
      <header ref={nodeRef} className={s.header}>
        <Navigation t={t} />
        <div className={s.navigation}>
          {isAuthenticated ? <UserMenu t={t} /> : <AuthNav t={t} />}
          <SelectLocalization />
        </div>
      </header>
    </Animation>
  );
};

export default AppBar;
