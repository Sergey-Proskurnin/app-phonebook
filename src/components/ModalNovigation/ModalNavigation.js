import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import useOnClickOutside from 'hooks/useOnClickOutside';
import s from './ModalNavigation.module.css';
import sAl from 'helpers/animation/animationLeft.module.css';
import Animation from 'helpers/animation/Animation';
import { getIsAuthenticated, logOut } from 'redux/auth';

const modalRoot = document.querySelector('#modal-menu-root');

const ModalNavigation = ({ closeModalNavigation, isOpen }) => {
  const { t } = useTranslation();
  const isAuthenticated = useSelector(state => getIsAuthenticated(state));
  const ref = useRef();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logOut());
    closeModalNavigation();
  };

  useOnClickOutside(ref, closeModalNavigation);
  useEffect(() => {
    window.document.body.style.overflowY = 'hidden';
    return () => {
      window.document.body.style.overflowY = 'visible';
    };
  });

  return createPortal(
    <div className={s.modalWrapper}>
      <Animation isOpen={isOpen} style={sAl} time={750} nodeRef={ref}>
        <div ref={ref} className={s.menuNavigation}>
          <span className={s.closeIcon} onClick={closeModalNavigation}>
            &#10006;
          </span>
          <ul className={s.listNavigation}>
            <li className={s.itemNav}>
              <NavLink
                to="/"
                exact
                className={s.link}
                activeClassName={s.activeLink}
                onClick={closeModalNavigation}
              >
                {t('link')}
              </NavLink>
            </li>
            {isAuthenticated && (
              <li className={s.itemNav}>
                <NavLink
                  to="/contacts"
                  exact
                  className={s.link}
                  activeClassName={s.activeLink}
                  onClick={closeModalNavigation}
                >
                  {t('link1')}
                </NavLink>
              </li>
            )}
          </ul>
          {isAuthenticated && (
            <Button
              type="button"
              onClick={onLogout}
              style={{
                paddingTop: '10px',
                marginLeft: '30px',
                marginTop: '8px',
              }}
              variant="contained"
              color="primary"
            >
              {t('userMenu.button')}
            </Button>
          )}
        </div>
      </Animation>
    </div>,
    modalRoot,
  );
};

export default ModalNavigation;

ModalNavigation.propTypes = {
  closeModalNavigation: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
