import React from 'react';
import { useSelector } from 'react-redux';

import Navigation from 'components/Navigation';
import UserMenu from 'components/UserMenu';
import AuthNav from 'components/AuthNav';
import s from 'components/AppBar/AppBar.module.css';
import { getIsAuthenticated } from 'redux/auth';
import headerStyles from './headerAppBar.module.css';
import Animation from 'helpers/animation/Animation';

const AppBar = () => {
  const nodeRef = React.useRef(null);
  const isAuthenticated = useSelector(state => getIsAuthenticated(state));
  return (
    <Animation style={headerStyles} time={500} nodeRef={nodeRef}>
      <header ref={nodeRef} className={s.header}>
        <Navigation />

        {isAuthenticated ? <UserMenu /> : <AuthNav />}
      </header>
    </Animation>
  );
};

export default AppBar;
