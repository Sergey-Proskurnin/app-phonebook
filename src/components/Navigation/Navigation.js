import React, { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import s from 'components/Navigation/Navigation.module.css';
import useWindowDimensions from 'hooks/useWindowDimensions';
import { getIsAuthenticated } from 'redux/auth';
import ModalNovigation from 'components/ModalNovigation';

const useStyles = makeStyles(theme => ({
  customHoverFocus: {
    color: '#3f51b5',
    padding: 0,
    '&:hover, &.Mui-focusVisible': {
      color: '#e84a5f',
      backgroundColor: 'transparent',
    },
    '&:focus': { backgroundColor: 'transparent' },
  },
}));

const Navigation = ({ t }) => {
  const classes = useStyles();
  const isAuthenticated = useSelector(state => getIsAuthenticated(state));
  const viewPort = useWindowDimensions();

  const [showModalNavigation, setStateShowModalNavigation] = useState(false);

  const toggleModalNavigation = useCallback(() => {
    setStateShowModalNavigation(
      prevShowModalNavigation => !prevShowModalNavigation,
    );
  }, []);

  return (
    <>
      {showModalNavigation && (
        <nav>
          <ModalNovigation
            closeModalNavigation={toggleModalNavigation}
            isOpen={showModalNavigation}
          />
        </nav>
      )}
      <nav>
        {viewPort.width >= 768 && (
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
        )}
        {viewPort.width < 768 && !showModalNavigation && (
          <IconButton
            aria-label="upload picture"
            component="span"
            onClick={toggleModalNavigation}
            style={{
              padding: 0,
              paddingLeft: 10,
              marginRight: 10,
            }}
          >
            <MenuIcon className={classes.customHoverFocus} fontSize="large" />
          </IconButton>
        )}
      </nav>
    </>
  );
};

export default Navigation;

Navigation.propTypes = {
  t: PropTypes.func.isRequired,
};
