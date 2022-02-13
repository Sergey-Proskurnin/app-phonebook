import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import s from 'components/Navigation/Navigation.module.css';

import { getIsAuthenticated } from 'redux/auth';

const Navigation = ({ t }) => {
  const isAuthenticated = useSelector(state => getIsAuthenticated(state));

  return (
    <nav>
      <ul className={s.listNav}>
        <li className={s.ItemNav}>
          <NavLink
            to="/"
            exact
            className={s.link}
            activeClassName={s.activeLink}
          >
            {t('link')}
          </NavLink>
        </li>
        {isAuthenticated && (
          <li className={s.ItemNav}>
            <NavLink
              to="/contacts"
              exact
              className={s.link}
              activeClassName={s.activeLink}
            >
              {t('link1')}
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;

Navigation.propTypes = {
  t: PropTypes.func.isRequired,
};
