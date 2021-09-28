import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import s from 'components/Navigation/Navigation.module.css';

import { getIsAuthenticated } from 'redux/auth';

const Navigation = () => {
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
            Home
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
              Contacts
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
