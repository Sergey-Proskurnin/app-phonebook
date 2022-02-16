import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import { getUserName, logOut, getUserAvatar } from 'redux/auth';
import defaultAvatar from 'images/guardsman.png';
import UserModal from 'components/UserModal';

import s from './UserMenu.module.css';

const UserMenu = ({ t }) => {
  const name = useSelector(state => getUserName(state));
  const avatar = useSelector(state => getUserAvatar(state));
  const avatarUser = avatar ? avatar : defaultAvatar;

  const dispatch = useDispatch();
  const onLogout = () => dispatch(logOut());
  const userName =
    name.split(' ')[0].slice(0, 1).toUpperCase() + name.split(' ')[0].slice(1);
  console.log(userName);

  const [showModalUser, setStateShowModalUser] = useState(false);

  const toggleModalUser = useCallback(() => {
    setStateShowModalUser(prevShowModalUser => !prevShowModalUser);
  }, []);

  return (
    <>
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
        <span className={s.name} onClick={toggleModalUser}>
          {t('userMenu.span')} {userName}
        </span>
        <Button
          type="button"
          className={s.button}
          onClick={onLogout}
          style={{ marginTop: '05px', paddingTop: '10px' }}
          variant="contained"
          color="primary"
        >
          {t('userMenu.button')}
        </Button>
      </div>
    </>
  );
};

export default UserMenu;

UserMenu.propTypes = {
  t: PropTypes.func.isRequired,
};
