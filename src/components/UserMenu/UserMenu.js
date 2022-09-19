import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import {
  getUserName,
  logOut,
  getUserAvatar,
  getUserSubscription,
} from 'redux/auth';
import defaultAvatar from 'images/guardsman.png';
import UserModal from 'components/UserModal';
import SubscriptionModal from 'components/SubscriptionModal';
import useWindowDimensions from 'hooks/useWindowDimensions';

import s from './UserMenu.module.css';

const useStyles = makeStyles(theme => ({
  customHoverFocus: {
    color: '#3f51b5',
    cursor: 'pointer',
    '&:hover, &.Mui-focusVisible': {
      color: '#e84a5f',
      backgroundColor: 'transparent',
    },
    '&:focus': { backgroundColor: 'transparent' },
  },
  customSubscribeBtn: {
    backgroundColor: '#e84a5f',
    '&:hover': {
      backgroundColor: '#a92c3c',
    },
  },
}));

const UserMenu = ({ t }) => {
  const classes = useStyles();
  const viewPort = useWindowDimensions();

  const name = useSelector(state => getUserName(state));
  const avatar = useSelector(state => getUserAvatar(state));
  const subscription = useSelector(state => getUserSubscription(state));
  const avatarUser = avatar ? avatar : defaultAvatar;

  const dispatch = useDispatch();
  const onLogout = () => dispatch(logOut());
  const userName =
    name.split(' ')[0].slice(0, 1).toUpperCase() + name.split(' ')[0].slice(1);

  const [showModalUser, setStateShowModalUser] = useState(false);
  const [showSubscriptionModal, setStateShowSubscriptionModal] =
    useState(false);

  const toggleModalUser = useCallback(() => {
    setStateShowModalUser(prevShowModalUser => !prevShowModalUser);
  }, []);
  const toggleSubscriptionModal = useCallback(() => {
    setStateShowSubscriptionModal(
      prevShowSubscriptionModal => !prevShowSubscriptionModal,
    );
  }, []);

  return (
    <>
      {showSubscriptionModal && (
        <SubscriptionModal
          closeSubscriptionModal={toggleSubscriptionModal}
          isOpen={showSubscriptionModal}
        />
      )}
      {showModalUser && (
        <UserModal closeAvatarModal={toggleModalUser} isOpen={showModalUser} />
      )}
      <div className={s.container}>
        <div>
          <img
            src={avatarUser}
            alt="Avatar"
            className={s.avatar}
            onClick={toggleModalUser}
          />
        </div>
        {viewPort.width >= 1200 && (
          <span className={s.name} onClick={toggleModalUser}>
            {t('userMenu.span')} {userName}
          </span>
        )}
        {viewPort.width < 1200 && (
          <span className={s.name} onClick={toggleModalUser}>
            {userName}
          </span>
        )}
        <button
          onClick={toggleModalUser}
          className={s.buttonTuneOutlinedIcon}
          type="button"
        >
          <TuneOutlinedIcon
            fontSize="large"
            className={classes.customHoverFocus}
          />
        </button>

        {viewPort.width >= 768 && (
          <>
            <Button
              type="button"
              className={classes.customSubscribeBtn}
              onClick={toggleSubscriptionModal}
              style={{ paddingTop: '10px', marginLeft: '12px' }}
              variant="contained"
              color="primary"
            >
              {subscription}
            </Button>
            <Button
              type="button"
              className={s.button}
              onClick={onLogout}
              style={{ paddingTop: '10px', marginLeft: '12px' }}
              variant="contained"
              color="primary"
            >
              {t('userMenu.button')}
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default UserMenu;

UserMenu.propTypes = {
  t: PropTypes.func.isRequired,
};
